import {
  Box,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import LoadingTableRows from './components/LoadingTableRows'
import db from './firebase'

interface DocList {
  docs: [{ docId: string }]
}

interface DocListProps extends RouteComponentProps {}

const DocumentList = (props: DocListProps) => {
  // const [paginateLimit, setpaginateLimit] = useState(15);
  const paginateLimit = 15
  const [paginatePage, setpaginatePage] = useState(0)

  const [value, loading, error] = useCollection(
    db.collection('documents').orderBy('timestamp')
  )

  // const dataTop = docData.docs.slice(
  //   paginateLimit * paginatePage,
  //   paginateLimit * paginatePage + paginateLimit
  // )

  const handlePrev = () => {
    if (paginatePage > 0) setpaginatePage(paginatePage - 1)
  }

  const handleNext = () => {
    setpaginatePage(paginatePage + 1)
  }

  if (error) return <strong>Error: {JSON.stringify(error)}</strong>

  return (
    <Flex
      justifyContent="space-between"
      flexDir="column"
      alignItems="center"
      px={6}
      py={6}
    >
      {/* <HStack fontSize="sm" divider={<StackDivider />}>
        <Text onClick={handlePrev}>
          <Link href="#">Prev</Link>
        </Text>
        <Text mx={4}>Page {paginatePage + 1}</Text>
        <Text onClick={handleNext}>
          <Link href="#">Next</Link>
        </Text>
      </HStack> */}
      <Box width="100%">
        <Table>
          <Thead>
            <Tr>
              <Th>Document ID</Th>
              <Th>Date Published</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading && <LoadingTableRows />}
            {value?.docs.map((doc: any) => {
              const { id, timestamp } = doc.data()
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
            })}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  )
}

export default DocumentList
