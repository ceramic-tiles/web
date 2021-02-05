import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Redirect, Router } from '@reach/router'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Redirect
          from="/"
          to="/document/k3y52l7qbv1frxjdr9qpn9ldvbxb0jg4eig7wtjkdu6gk84vyazw9j4txf4o6d2io"
          noThrow
        />
        <Redirect
          from="/document"
          to="/document/k3y52l7qbv1frxjdr9qpn9ldvbxb0jg4eig7wtjkdu6gk84vyazw9j4txf4o6d2io"
          noThrow
        />
        <App path="/document/:docId" />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
