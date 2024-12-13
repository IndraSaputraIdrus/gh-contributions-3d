import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('indrasaputraidrus/2023')
  const contributions = await res.json()
  return {
    contributions
  }
}
