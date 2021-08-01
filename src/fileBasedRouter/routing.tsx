export interface ModuleObject {
  [key: string]: any
}

const prefix = '/src/pages/'
export type RoutePath = `${typeof prefix}${string}.${string}`

export const pathToRoute = (path: RoutePath) => {
  const abs = path.substring(prefix.length, path.length)
  const i = abs.indexOf('.')
  const indexFilePath = '/index'
  let route = abs.substring(0, i)
  if (route.endsWith('index')) {
    route = route.substring(0, route.length - indexFilePath.length)
  }
  switch (route) {
    case '':
      return '/'
    case '/404':
      return undefined
    default:
      return route
  }
}
