import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  Flex,
  Heading,
  Divider,
} from '@chakra-ui/react'
import { navigate } from '@reach/router'
import * as React from 'react'

const SampleDocuments = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })

  return (
    <>
      <Button onClick={onOpen} variant="outline">
        Example Docs
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Example Docs</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={3}>
            <Stack spacing="3">
              <Box
                p={3}
                borderRadius={5}
                onClick={() => {
                  navigate(
                    `/document/k3y52l7qbv1frxjdr9qpn9ldvbxb0jg4eig7wtjkdu6gk84vyazw9j4txf4o6d2io`
                  )
                  onClose()
                }}
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
                onClick={() => {
                  navigate(
                    `/document/kjzl6cwe1jw14bek5i7rcr1q9byw61w4rswrhmvja0kfos89ty0notx0vh7kx3b`
                  )
                  onClose()
                }}
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
                onClick={() => {
                  navigate(
                    `/document/kjzl6cwe1jw14anzfvjyint54cf2m7lb04xnsmsdem9emhvgn816hzecvzqa65g`
                  )
                  onClose()
                }}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SampleDocuments
