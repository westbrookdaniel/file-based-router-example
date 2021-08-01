import React, { useState } from 'react'
import FileRouter from './file–based-router/FileRouter'

const PageNotFound = () => {
  return <h1>Page Not Found</h1>
}

function App() {
  return <FileRouter PageNotFound={PageNotFound} />
}

export default App
