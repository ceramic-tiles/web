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
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import React, {useState} from 'react'
import { RouteComponentProps } from '@reach/router'
import { Link as ReachLink } from "@reach/router"

const docData: DocList = require('./data/dummyDocs.json')

interface DocList {
  docs: [{docId: string}]
}

interface DocListProps extends RouteComponentProps {
}

const DocumentList = (props: DocListProps) => {
  const [paginateLimit, setpaginateLimit] = useState(15);
  const [paginatePage, setpaginatePage] = useState(0);

  const dataTop = docData.docs.slice(paginateLimit * paginatePage, (paginateLimit * paginatePage) + paginateLimit)

  const handlePrev = () => {
    if (paginatePage > 0)
      setpaginatePage(paginatePage - 1);
  }

  const handleNext = () => {
    setpaginatePage(paginatePage + 1);
  }

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
        <Text mx={4} >
          Page {paginatePage+1}
        </Text>
        <Text onClick={handleNext}>
          <Link href="#">Next</Link>
        </Text>
      </HStack>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Document ID</Th>
              <Th>Date Published</Th>
            </Tr>
          </Thead>
          <Tbody>
            { dataTop.map (doc => {
              return (
              <Tr>
                <Td>
                  <Link as={ReachLink} to={`/document/${doc.docId}`}>
                    {doc.docId}
                  </Link>
                </Td>
                <Td>-</Td>
              </Tr>
            )})}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  )
}

export default DocumentList
