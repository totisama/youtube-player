export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const formatViews = (views: string) => {
  const viewsNumber = parseInt(views)
  if (viewsNumber < 1000) return views
  if (viewsNumber < 1000000) return `${(viewsNumber / 1000).toFixed(1)}k`
  return `${(viewsNumber / 1000000).toFixed(1)}M`
}
