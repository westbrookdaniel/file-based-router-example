import * as React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { pathToRoute, RoutePath } from './routing'
import { FileRouterProps, notEmpty, RouteData, RouteWrapper } from './types'

/**
 * The list of modules to include in the file router.
 *
 * Edit this glob to change what files are included (this also ignores test files).
 */
const modules = import.meta.globEager('/src/pages/**/*[!.test].(jsx|tsx|ts)')

/**
 * The list of routes (based on files) in the app.
 */
export const routes = Object.keys(modules)
  .map((path) => {
    const module = modules[path]
    const routeData = module.data as RouteData | undefined
    return {
      Component: module.default,
      name: routeData?.name,
      path: pathToRoute(path as RoutePath),
      handlesOwnRouting: routeData?.handlesOwnRouting,
    }
  })
  .filter(notEmpty)

type RoutesItem = typeof routes[number] & { Wrapper?: RouteWrapper }

/**
 * Callback function to handle rendering routes.
 */
function renderRoutes({ Wrapper, ...props }: RoutesItem) {
  const { Component, path, handlesOwnRouting } = props
  if (!Wrapper) {
    return (
      <Route
        key={path}
        component={Component}
        exact={!handlesOwnRouting}
        path={path}
      />
    )
  }
  return (
    <Wrapper {...props}>
      <Route
        key={path}
        component={Component}
        exact={!handlesOwnRouting}
        path={path}
      />
    </Wrapper>
  )
}

/**
 * The file-based router.
 */
const isDynamic = (path: string) =>
  path.substr(path.lastIndexOf('/')).indexOf(':') === -1

const FileRouter = ({ Wrapper, PageNotFound }: FileRouterProps) => {
  return (
    <Router>
      <Switch>
        {/* Static routes (e.g. /foo) */}
        {/* These come first so they take precendence over dynamic routes. */}
        {routes.filter(({ path }) => path && isDynamic(path)).map(renderRoutes)}

        {/* Dynamic routes (e.g. /:dynamic) */}
        {routes.filter(({ path }) => path && isDynamic(path)).map(renderRoutes)}

        {/* Root index page (home) */}
        {routes.filter(({ path }) => path === '').map(renderRoutes)}

        {/* Handling unmatched routes (404 page) */}
        <Route component={() => <PageNotFound />} />
      </Switch>
    </Router>
  )
}

export default FileRouter
