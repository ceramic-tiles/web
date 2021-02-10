import {
  Flex,
  Text,
  Link,
} from '@chakra-ui/react'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'

const Footer = () => {
  return (
    <Flex
    my={6}
    borderTopWidth={1}
    px={6}
    py={6}
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
      </Link> &{' '}
      <Link
        textDecoration="underline"
        href="https://twitter.com/isidorosp"
      >
        isidorosp
      </Link>{' '}
      in support of{' '}
      <Link href="https://ceramic.network" textDecoration="underline">
        Ceramic
      </Link>
    </Text>
    <a href="https://mechanaut.xyz">
      <Flex alignItems="center">
        <Link href="https://github.com/oaksprout/ceramic-document-viewer">
          <AiFillGithub size="24"/>
        </Link>
      </Flex>
    </a>
  </Flex>
  )
}

export default Footer
