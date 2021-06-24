import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  StackDivider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { usePagination } from 'use-pagination-firestore'
import LoadingTableRows from './components/LoadingTableRows'
import db from './firebase'
import dayjs from 'dayjs'
import Hero from './components/Hero'

interface DocListProps extends RouteComponentProps {}

const DocumentList = (props: DocListProps) => {
  const {
    items,
    isLoading: loading,
    isStart,
    isEnd,
    getPrev,
    getNext,
  } = usePagination(db.collection('streams').orderBy('timestamp', 'desc'), {
    limit: 20,
  })

  // if (error) return <strong>Error: {JSON.stringify(error)}</strong>

  return (
    <Box p={6}>
      <Hero />
      <Flex alignItems="center" justifyContent="space-between" m={6}>
        <Heading size="md">Browse All Streams</Heading>
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
              <Th>Stream ID</Th>
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
                    <Td>
                      {dayjs(timestamp).format("h:mm:ssA, MMM D 'YY") || '—'}
                    </Td>
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
