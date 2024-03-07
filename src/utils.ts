// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
  fetch(...args).then((res: Response) => res.json())

export const formatViews = (views: string) => {
  const viewsNumber = parseInt(views)
  if (viewsNumber < 1000) return views
  if (viewsNumber < 1000000) return `${(viewsNumber / 1000).toFixed(1)}k`
  return `${(viewsNumber / 1000000).toFixed(1)}M`
}
