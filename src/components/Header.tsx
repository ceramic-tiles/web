import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react'
import React from 'react'
import ColorModeSwitcher from './ColorModeSwitcher'
import DocInputForm from './DocInputForm'
import LensSection from './LensSection'
import Logo from './Logo'
import SampleDocuments from './SampleDocuments'

export interface HeaderProps {
  schema: string
  setLens: any
  docId?: string
}

const Header: React.FC<HeaderProps> = ({ schema, setLens, docId }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      p={{ base: 0, lg: 2 }}
    >
      <Box>
        <ChakraLink
          href="/"
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
        >
          <Logo />
        </ChakraLink>
      </Box>
      <Flex alignItems="center">
        <DocInputForm docId={docId} />
        <Center h="100%">
          <Divider orientation="vertical" mx={{ base: 0, lg: 3 }} />
        </Center>
        <Badge colorScheme="orange" display={{base: 'none', lg: 'inherit'}}>Mainnet</Badge>
        {/* <Box mx="left">
          <LensSection schema={schema} setLens={setLens} />
        </Box> */}
      </Flex>
      <Flex display={{ base: 'none', lg: 'inherit' }}>
        <Box mr={3}>
          <SampleDocuments />
        </Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Flex>
  )
}

export default Header
