import {
  Box,
  Center,
  Image,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react'
import React from 'react'
import ColorModeSwitcher from './ColorModeSwitcher'
import SampleDocuments from './SampleDocuments'
import DocInputForm from './DocInputForm'
import LensSection from './LensSection'
import logo from '../images/logo.svg'
import logoOrange from '../images/logo-orange.svg'

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
        <ChakraLink href="/" _hover={{ textDecoration: 'none' }}>
          <Box
            color="white"
            bgGradient={{base: 'inherit', lg: "linear(to-r, orange.500, orange.300)"}}
            p={{base: 1, lg: 2}}
            borderRadius={{base: 0, lg: 4}}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Image display={{base: 'none', lg: 'inherit'}} src={logo} mr={{base: 0, lg: 1}} h={25} />
              <Image display={{base: 'inherit', lg: 'none'}} src={logoOrange} mr={{base: 0, lg: 1}} h={25} />
              <Heading as="h1" size="md" letterSpacing="-0.5px"  display={{ base: 'none', lg: 'inherit' }}>
                Tiles
              </Heading>
            </Flex>
          </Box>
        </ChakraLink>
      </Box>
      <Flex alignItems="center">
        <DocInputForm docId={docId} />
        <Center h="100%">
          <Divider orientation="vertical" mx={{ base: 0, lg: 3 }} />
        </Center>
        <Box mx="left">
          <LensSection schema={schema} setLens={setLens} />
        </Box>
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
