import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('indrasaputraidrus/2024')
  const contributions = await res.json()
  return {
    contributions
  }
}
