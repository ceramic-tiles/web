import {
  Box,
  Flex,
  HStack,
  Link,
  StackDivider,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  Skeleton,
  Button,
  Heading,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Link as ReachLink } from '@reach/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import db from './firebase'
import LoadingTableRows from './components/LoadingTableRows'
import { usePagination } from 'use-pagination-firestore'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface DocList {
  docs: [{ docId: string }]
}

interface DocListProps extends RouteComponentProps {}

const DocumentList = (props: DocListProps) => {
  const {
    items,
    isLoading: loading,
    isStart,
    isEnd,
    getPrev,
    getNext,
  } = usePagination(db.collection('documents').orderBy('timestamp'), {
    limit: 20,
  })

  // if (error) return <strong>Error: {JSON.stringify(error)}</strong>

  return (
    <Box p={6}>
      <Flex alignItems="center" justifyContent="space-between" m={6}>
        <Heading size="md">All Documents</Heading>
        <HStack fontSize="sm" divider={<StackDivider />}>
          <Button
            onClick={getPrev}
            disabled={isStart}
            leftIcon={<FaChevronLeft />}
          >
            Prev
          </Button>
          <Button
            onClick={getNext}
            disabled={isEnd}
            rightIcon={<FaChevronRight />}
          >
            Next
          </Button>
        </HStack>
      </Flex>
      <Box width="100%">
        <Table>
          <Thead>
            <Tr>
              <Th>Document ID</Th>
              <Th>Date Published</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <LoadingTableRows />
            ) : (
              items?.map((item: any) => {
                const { id, timestamp } = item
                return (
                  <Tr key={id}>
                    <Td>
                      <Link as={ReachLink} to={`/document/${id}`}>
                        {id}
                      </Link>
                    </Td>
                    <Td>{timestamp || '—'}</Td>
                  </Tr>
                )
              })
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default DocumentList
