import {
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import ColorModeSwitcher from './ColorModeSwitcher'
import { GiAllSeeingEye } from 'react-icons/gi'

const Header = () => {
  return (
    <Flex
  justifyContent="space-between"
  alignItems="center"
  px={6}
  py={6}
  borderBottomWidth={1}
>
  <Link href="/" _hover={{ textDecoration:'none' }} >
    <Flex justifyContent="space-between" alignItems="center">
      <HStack>
        <GiAllSeeingEye size="72" />
        <Stack>
          <Heading as="h1">
            Seeramic
          </Heading>
          <Heading size="sm">
            A document browser for Ceramic
          </Heading>
        </Stack>
      </HStack>
    </Flex>
  </Link>
  <ColorModeSwitcher justifySelf="flex-end" />
</Flex>
  )
}

export default Header
