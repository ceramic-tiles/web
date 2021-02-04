import CeramicClient from '@ceramicnetwork/http-client'
import {
  Box,
  Button,
  ChakraProvider,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  theme,
} from '@chakra-ui/react'
import * as React from 'react'

const API_URL = 'https://gateway-clay.ceramic.network'
const ceramic = new CeramicClient(API_URL)

// const docId = 'kjzl6cwe1jw147c4oeqx7mp9ov3zzp3t7qewn7gjximydwwxearw4lyxg8ig382'

export const App = () => {
  const [docIdInput, setDocIdInput] = React.useState<any>()
  const [doc, setDoc] = React.useState<any>({})

  const handleDocIdInput = (docId: string) => setDocIdInput(docId)

  const getDoc = async (docIdInput: any) =>
    await ceramic.loadDocument(docIdInput).then((res) => {
      setDoc(res)
    })

  return (
    <ChakraProvider theme={theme}>
      <Box m={6}>
        <Heading mb={6} size="lg">
          Ceramic Document Viewer
        </Heading>
        <Flex mb={6} alignItems="center" wrap="wrap">
          <Input
            onChange={(e: any) => handleDocIdInput(e.target.value)}
            width={600}
            mr={3}
            placeholder="e.g. kjzl6cwe1jw147c4oeqx7mp9ov3zzp3t7qewn7gjximydwwxearw4lyxg8ig382"
          />
          <Button onClick={() => getDoc(docIdInput)}>Get Document</Button>
        </Flex>
        <Box mb={6}>
          <Heading size="md" mb={3}>
            Content
          </Heading>
          {doc?._state?.content
            ? Object.entries(doc?._state?.content).map((entry: any[]) => (
                <Box mb={3}>
                  <Text fontWeight="bold">{entry[0]}</Text>
                  <Text>{entry[1]}</Text>
                </Box>
              ))
            : 'Get a document to see its content'}
        </Box>
        <Box mb={6}>
          <Heading mb={3} size="md">
            Metadata
          </Heading>
          {doc?._state?.metadata
            ? Object.entries(doc?._state?.metadata).map((entry: any[]) => (
                <Box mb={3}>
                  <Text fontWeight="bold">{entry[0]}</Text>
                  <Text>{entry[1]}</Text>
                </Box>
              ))
            : 'Get a document to see its metadata'}
        </Box>
        <Divider />
        <Text py={6}>
          By <a href="https://twitter.com/tannedoaksprout">oaksprout</a> from{' '}
          <a href="https://mechanaut.xyz">Mechanaut</a>
        </Text>
      </Box>
    </ChakraProvider>
  )
}
