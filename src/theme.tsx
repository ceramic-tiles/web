import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme({ config })

export default theme
