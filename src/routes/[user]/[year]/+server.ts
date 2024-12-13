import { parseHTML } from "linkedom";
import type { RequestHandler, RouteParams } from "./$types";
import { json } from "@sveltejs/kit";
import type { Contribution } from '$lib/types'

const getContributions = async ({ user, year }: RouteParams) => {
  let api = `https://github.com/users/${user}/contributions?from=${year}-12-01&to=${year}-12-31`

  const isCurrentYear = new Date().getFullYear().toString() === year

  if (isCurrentYear) {
    const date = new Date().toLocaleDateString("en-CA")
    const month = date.split("-")[1]
    api = `https://github.com/users/${user}/contributions?from=${year}-${month}-01&to=${date}`
  }

  const res = await fetch(api)

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`)
  }

  return await res.text()
}

const parseContributions = (html: string) => {
  const { document } = parseHTML(html)
  const days = document.querySelectorAll<Element>('tool-tip')

  const contributions: Contribution[][] = [
    [], // Minggu
    [], // Senin
    [], // Selasa
    [], // Rabu
    [], // Kamis
    [], // Jumat
    [], // Sabtu
  ]

  for (const [_, value] of days.entries()) {
    const data = value.innerHTML.split(" ")
    const forDayRaw = value.getAttribute('for')
    if (!forDayRaw) continue

    const forDay = forDayRaw.replace("contribution-day-component-", "")
    const [weekday, week] = forDay.split("-").map(Number)

    if (data.length > 1) {
      const td = document.getElementById(forDayRaw)
      if (!td) continue

      const level = td.dataset.level || '0'
      const contribution: Contribution = {
        count: data[0] === "No" ? 0 : +data[0],
        month: data[3],
        day: +data[4].replace(/(st|nd|rd|th)/, ''),
        level: +level
      }
      contributions[weekday][week] = contribution
    }
  }

  return contributions

}

export const GET: RequestHandler = async ({ params, setHeaders }) => {
  const year = 60 * 60 * 24 * 356

  setHeaders({
    'Cache-Control': `public, s-maxage=${year}`,
    'CDN-Cache-Control': `public, s-maxage=${year}`,
    'Vercel-CDN-Cache-Control': `public, s-maxage=${year}`,
  })

  const html = await getContributions(params)
  const result = parseContributions(html)

  return json(result)
}
