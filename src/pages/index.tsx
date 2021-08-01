import * as React from 'react'
import { RouteData } from '../fileBasedRouter/types'

export default function Home() {
  return <h1>Hello World</h1>
}

export const data: RouteData = {
  name: 'Home',
}
