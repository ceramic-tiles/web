import React from 'react'
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Button,
  Stack,
  Icon,
  Center,
} from '@chakra-ui/react'
import DocInputForm from './DocInputForm'
import Logo from './Logo'

const Hero = () => {
  const Feature = props => (
    <Flex alignItems="center" color={useColorModeValue(null, 'white')}>
      <Icon
        boxSize={4}
        mr={1}
        color="green.600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </Icon>
      {props.children}
    </Flex>
  )
  return (
    <Box pb={4} py={2} py={32} mx="auto">
      <Center mb="6">
        <Logo size="lg" />
      </Center>
      <Box
        w={{ base: 'full', md: 11 / 12, xl: 8 / 12 }}
        textAlign="center"
        mx="auto"
      >
        <chakra.h1
          mb={3}
          fontSize={{ base: '4xl', md: '5xl' }}
          fontWeight={{ base: 'bold', md: 'extrabold' }}
          color={useColorModeValue('gray.900', 'gray.100')}
          lineHeight="shorter"
        >
          The Portal to a New Web
        </chakra.h1>
        <chakra.p
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color="gray.500"
          lineHeight="base"
        >
          Browse the Ceramic network and{' '}
          <br/>
          experience the emergence of a new interaction paradigm.
        </chakra.p>
        <Center>
          <DocInputForm baseBorder={1} />
        </Center>
      </Box>
    </Box>
  )
}

export default Hero
