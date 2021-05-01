import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  SlideFade,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { GiAllSeeingEye } from 'react-icons/gi'
import ColorModeSwitcher from './ColorModeSwitcher'
import DocInputForm from './DocInputForm'
import SampleDocuments from './SampleDocuments'
import logo from '../images/logo.svg'
import logoOrange from '../images/logo-orange.svg'

const Header = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box borderBottomWidth={1}>
      <Flex justifyContent="space-between" alignItems="center" px={6} my={6}>
        <Box>
          <Flex alignItems="center">
            <Link href="/" _hover={{ textDecoration: 'none' }} mr={6}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                p={2}
                borderRadius={10}
                color="white"
                bgGradient="linear(to-r, orange.500, orange.300)"
              >
              <Image display={{base: 'none', lg: 'inherit'}} src={logo} mr={{base: 0, lg: 1}} h={25} />
              <Image display={{base: 'inherit', lg: 'none'}} src={logoOrange} mr={{base: 0, lg: 1}} h={25} />
                  Tiles
                </Heading>
              </Flex>
            </Link>
          </Flex>
        </Box>
        <Flex>
          <Box display={isOpen ? 'none' : 'inherit'} mr={3}>
            <Button
              leftIcon={<FaSearch />}
              onClick={onToggle}
              bgGradient="linear(to-r, gray.600, gray.500)"
              _hover={{
                bgGradient: 'linear(to-r, gray.500, gray.400)',
              }}
              _active={{
                bgGradient: 'linear(to-r, gray.400, gray.300)',
              }}
              color="white"
            >
              Look Up Doc
            </Button>
          </Box>
          <SampleDocuments />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Flex>
      <SlideFade in={isOpen}>
        <Box m={12} display={isOpen ? 'visible' : 'none'}>
          <DocInputForm onToggle={onToggle} />
        </Box>
      </SlideFade>
    </Box>
  )
}

export default Header
