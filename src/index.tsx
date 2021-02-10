import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from './theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
