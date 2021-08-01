/**
 * Type Predicate
 * @link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 * @example
 * // returns [3, 2]
 * [3, 2, null, undefined].filter(notEmpty)
 */
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined
}

export interface RouteData {
  /**
   * The name of the route.
   */
  name?: string
  /**
   * Whether the component rendered by the routes has its own internal routing.
   *
   * Determines whether this route should be flagged exact or not.
   */
  handlesOwnRouting?: boolean
}

export interface FileRouterProps {
  /**
   * Component that wraps all routes
   */
  Wrapper?: RouteWrapper
  /**
   * Component is displayed when no route is matched
   */
  PageNotFound: React.ComponentType<any>
}

export type RouteWrapper = React.ComponentType<any>
