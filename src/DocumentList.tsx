import {
  Box,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import React, { useState, useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import LoadingTableRows from './components/LoadingTableRows'
import db from './firebase'
import moment from 'moment'

interface DocListProps extends RouteComponentProps {}

const DocumentList = (props: DocListProps) => {
  const paginateLimit = 15
  const [paginatePage, setpaginatePage] = useState(0)

  const [firstDoc, setFirstDoc] = useState<any | null>(null)
  const [lastDoc, setLastDoc] = useState<any | null>(null)

  const initQuery = db.collection('documents')
    .orderBy('timestamp', 'desc')
    .limit(paginateLimit)

  const [firebaseQuery, setFirebaseQuery] = useState(initQuery)

  const [value, loading, error] = useCollection(
    firebaseQuery
  )

  useEffect(() => {
  //   // Update the document title using the browser API
    if (value && value.docs) {
      console.log('updating firstdoc & lastdoc')
      setFirstDoc(value.docs[0])
      setLastDoc(value.docs[paginateLimit-1])
      if (firstDoc !== null) {
        console.log(firstDoc.data())
        console.log(lastDoc.data())
      }
    }
  }, [value]); // if we add what the warning suggests we get stuck in a recursive loop

  const handlePrev = () => {
    if (firstDoc != null) {
      console.log(firstDoc.data())
      const prevQuery = db.collection('documents').orderBy('timestamp', 'desc').endBefore(firstDoc.data().timestamp).limitToLast(paginateLimit)
      setFirebaseQuery(prevQuery)
      setpaginatePage(paginatePage-1)
    }
  }

  const handleNext = () => {
    if (lastDoc != null) {
      console.log(lastDoc.data())
      const nextQuery = db.collection('documents').orderBy('timestamp', 'desc').startAfter(lastDoc.data().timestamp).limit(paginateLimit)
      setFirebaseQuery(nextQuery)
      setpaginatePage(paginatePage+1)
    }
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
      <HStack fontSize="sm" divider={<StackDivider />}>
        <Text onClick={handlePrev}>
          <Link href="#">Prev</Link>
        </Text>
        <Text mx={4}>Page {paginatePage + 1}</Text>
        <Text onClick={handleNext}>
          <Link href="#">Next</Link>
        </Text>
      </HStack>
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
                    <Link as={ReachLink} to={`/document/${id}`} isTruncated color='orange.300'>
                      {id}
                    </Link>
                  </Td>
                  <Td>
                    {moment(timestamp).format('h:mm:ssA, MMMM Do YYYY') || '—'}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default DocumentList
