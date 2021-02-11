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

const Header = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box borderBottomWidth={1}>
      <Flex justifyContent="space-between" alignItems="center" px={6} my={6}>
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            p={2}
            borderRadius={10}
            color="white"
            bgGradient="linear(to-r, orange.500, orange.300)"
          >
            <Box mr={2}>
              <GiAllSeeingEye color="orange.500" size="40" />
            </Box>
            <Heading as="h1" size="lg" letterSpacing="-1px">
              Tiles
            </Heading>
          </Flex>
        </Link>
        <Flex>
          <Box display={isOpen ? 'none' : 'inherit'} mr={3}>
            <Button
              leftIcon={<FaSearch />}
              onClick={onToggle}
              bgGradient="linear(to-r, gray.600, gray.500)"
              _hover={{
                // color: 'black',
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
