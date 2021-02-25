import { extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"

const theme = extendTheme({ 
    initialColorMode: 'dark',
    useSystemColorMode: false,
    fonts: {
      heading: 'Open Sans',
      body: 'Lato',
    },
    styles: {
      global: (props) => ({
        body: {
          bg: mode('white', 'rgb(10, 10, 9)')(props)
        },
      }),
    },
 })

export default theme
