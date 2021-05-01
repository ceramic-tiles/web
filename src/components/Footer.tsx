import { Flex, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'

const Footer = () => {
  return (
    <Flex
      borderTopWidth={1}
      px={2}
      py={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text mr={6} fontSize="sm">
        Made by{' '}
        <Link
          textDecoration="underline"
          href="https://twitter.com/tannedoaksprout"
        >
          oaksprout
        </Link>{' '}
        &{' '}
        <Link textDecoration="underline" href="https://github.com/isidorosp">
          isidorosp
        </Link>{' '}
        in support of{' '}
        <Link
          href="https://ceramic.network"
          textDecoration="underline"
          bgGradient="linear(to-r, orange.600, orange.400)"
          bgClip="text"
          fontWeight="bold"
        >
          Ceramic
        </Link>
      </Text>
      <Flex alignItems="center">
        <Link href="https://github.com/oaksprout/tiles">
          <AiFillGithub size="24" />
        </Link>
      </Flex>
    </Flex>
  )
}

export default Footer
