import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Redirect, Router } from '@reach/router'
import theme from './theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <Redirect
            from="/*"
            to="/document/k3y52l7qbv1frxjdr9qpn9ldvbxb0jg4eig7wtjkdu6gk84vyazw9j4txf4o6d2io"
            noThrow
          />
          <App path="/document/:docId" />
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
