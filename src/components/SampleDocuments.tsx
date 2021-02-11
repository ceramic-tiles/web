import {
  useDisclosure,
  Box,
  Text,
  Flex,
  Heading,
  Divider,
  Button,
  Stack,
} from '@chakra-ui/react'
import { navigate } from '@reach/router'
import * as React from 'react'

const SampleDocuments = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false })

  return isOpen ? (
    <Box borderRadius={5} borderWidth={1} p={6} mb={6}>
      <Flex alignItems="center" wrap="wrap" mb={6}>
        <Heading size="md">Example Docs</Heading>
        <Divider orientation="vertical" mx={3} />
        <Button onClick={onToggle} size="xs">
          Hide
        </Button>
      </Flex>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing="3">
        <Box
          p={3}
          borderRadius={5}
          onClick={() =>
            navigate(
              `/document/k3y52l7qbv1frxjdr9qpn9ldvbxb0jg4eig7wtjkdu6gk84vyazw9j4txf4o6d2io`
            )
          }
          borderWidth={3}
        >
          <Text fontWeight="bold" mb={3} fontSize="lg">
            Basic Profile Schema
          </Text>
          <Text isTruncated={true} mb={3}>
            k3y52l7qbv1frxjdr9…azw9j4txf4o6d2io
          </Text>
          <Button size="sm">View</Button>
        </Box>
        <Box
          p={3}
          borderRadius={5}
          onClick={() =>
            navigate(
              `/document/kjzl6cwe1jw14bek5i7rcr1q9byw61w4rswrhmvja0kfos89ty0notx0vh7kx3b`
            )
          }
          borderWidth={3}
        >
          <Text fontWeight="bold" mb={3} fontSize="lg">
            Crypto Accounts Definition
          </Text>
          <Text isTruncated={true} mb={3}>
            kjzl6cwe1jw14bek5i…fos89ty0notx0vh7kx3b
          </Text>
          <Button size="sm">View</Button>
        </Box>
        <Box
          p={3}
          borderRadius={5}
          onClick={() =>
            navigate(
              `/document/kjzl6cwe1jw14anzfvjyint54cf2m7lb04xnsmsdem9emhvgn816hzecvzqa65g`
            )
          }
          borderWidth={3}
        >
          <Text fontWeight="bold" mb={3} fontSize="lg">
            3ID
          </Text>
          <Text isTruncated={true} mb={3}>
            kjzl6cwe1jw14anzf…hvgn816hzecvzqa65g
          </Text>
          <Button size="sm">View</Button>
        </Box>
      </Stack>
    </Box>
  ) : (
    <Button onClick={onToggle} size="sm" mb={6}>
      Show Sample Documents
    </Button>
  )
}

export default SampleDocuments
