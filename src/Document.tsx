import {
  Box,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  Select,
  Text,
} from '@chakra-ui/react'
import { Link, RouteComponentProps } from '@reach/router'
import React, { useState } from 'react'
import DefaultLens from './components/DefaultLens'
import LensAdvanced from './components/LensAdvanced'
import LensBasic from './components/LensBasic'
import useDoc from './hooks/useDoc'

interface DocProps extends RouteComponentProps {
  docId?: string
}

const Document = (props: DocProps) => {
  const { docId } = props
  const [lens, setLens] = useState<number>(0)

  const [docContent, setDocContent] = React.useState<Object>();

  const { isLoading, error, data: doc } = useDoc(docId)

  React.useEffect(() => {
    const updateContent = doc?.state?.content || doc?.state?.next?.content || undefined;
    setDocContent(updateContent)
  }, [doc]);


  return (
    <Box px={6} py={6}>
      {console.log(docId)}
      <>
        <Flex mb={6} alignItems="center" justifyContent="space-between">
          <Heading mr={6} size="md">ceramic://{docId}</Heading>
          <Flex alignItems="center">
            <Text fontWeight="bold" mr={3}>Pick Lens</Text>
            <Select onChange={(e) => setLens(Number(e.target.value))} w={200} mr={3}>
              <option value={0}>Basic</option>
              <option value={1}>Super Advanced</option>
              <option value={2}>System</option>
            </Select>
            <ChakraLink as={Link} to={`/lens-market/${doc?.state?.metadata?.schema?.substring(10)}`} textDecoration="underline">Lens Market</ChakraLink>
          </Flex>
        </Flex>
        <Divider my={6} />
        {lens === 0 && <LensBasic docId={docId} />}
        {lens === 1 && <LensAdvanced docId={docId} />}
        {lens === 2 && <DefaultLens docId={docId} />}
      </>
    </Box>
  )
}

export default Document
