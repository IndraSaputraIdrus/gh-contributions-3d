import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('mattcroat/2022')
  const contributions = await res.json()
  return {
    contributions
  }
}
