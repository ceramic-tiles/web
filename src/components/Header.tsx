import { Box, Flex, Heading, HStack, Link, Stack } from '@chakra-ui/react'
import React from 'react'
import ColorModeSwitcher from './ColorModeSwitcher'
import { GiAllSeeingEye } from 'react-icons/gi'
import DocInputForm from './DocInputForm'
import SampleDocuments from './SampleDocuments'

const Header = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      px={6}
      py={6}
      borderBottomWidth={1}
    >
      <Link href="/" _hover={{ textDecoration: 'none' }}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box mr={3}>
            <GiAllSeeingEye size="40" />
          </Box>
          <Heading as="h1" size="lg">
            Seeramic
          </Heading>
        </Flex>
      </Link>
      <DocInputForm />
      <SampleDocuments />
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  )
}

export default Header
