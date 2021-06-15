import {
  Box,
  Code,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link as ChakraLink,
  Skeleton,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { Link, RouteComponentProps } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import Header from './components/Header'
import { formatAnchorStatus, truncate } from './helpers'
import useCommit from './hooks/useCommit'
import useDoc from './hooks/useDoc'
import { RemoteComponent } from './RemoteComponent'

interface DocProps extends RouteComponentProps {
  docId?: string
  commitId?: string
}

const Document = (props: DocProps) => {
  const { docId } = props
  const [commitId, setCommitId] = useState<string>()
  const [docContent, setDocContent] = useState<Object>()

  const [lens, setLens] = useState<any>()

  const {
    isLoading: initialDocIsLoading,
    error: intialDocerror,
    data: doc,
  } = useDoc(docId!)

  const {
    isLoading: commitIsLoading,
    error: commitError,
    data: commitDoc,
  } = useCommit(docId!, commitId!)

  const isLoading = initialDocIsLoading || commitIsLoading || false
  const error = intialDocerror || commitError

  useEffect(() => {
    // TODO: Clean this up, currently we're loading the initial document twice and this shouldn't be necessary
    // on the initial render/load
    let updateContent
    if (commitId && commitDoc && doc !== commitDoc) {
      if (!isLoading) {
        updateContent =
          commitDoc?.state?.next?.content ||
          commitDoc?.state?.content ||
          undefined
        setDocContent(updateContent)
      }
    } else {
      if (!isLoading) {
        updateContent =
          doc?.state?.next?.content || doc?.state?.content || undefined
        setDocContent(updateContent)
      }
    }
  }, [doc, commitId, commitDoc, isLoading])

  const { colorMode } = useColorMode()

  const handleChangeCommit = (newCommitId: string) => {
    if (commitId !== newCommitId) {
      setDocContent(undefined)
      setCommitId(newCommitId)
    }
  }

  const getSchemaFromDoc = (
    doc: any,
    initialDocIsLoading: any,
    intialDocerror: any
  ) => {
    if (
      (initialDocIsLoading || intialDocerror) &&
      doc?.state?.metadata?.schema
    ) {
      return
    }
    return doc?.state?.metadata?.schema?.substring(10) // substring removes `ceramic://` from beginning
  }

  const schema = getSchemaFromDoc(doc, initialDocIsLoading, intialDocerror)

  return (
    <>
      <Header schema={schema} setLens={setLens} docId={docId} />
      <>
        {error ? (
          <Text mb={6}>
            <BiErrorCircle /> Something's wrong – try another stream
          </Text>
        ) : (
          <>
            {lens ? (
              isLoading ? (
                <Skeleton h={10} />
              ) : (
                <Box maxW={'100%'} overflowX="auto">
                  <RemoteComponent
                    url={lens?.state?.content?.content}
                    docContent={docContent}
                  />
                </Box>
              )
            ) : (
              <Grid
                templateColumns={{
                  base: 'repeat(1)',
                  lg: 'repeat(12)',
                }}
                gap={3}
                p={{ base: 3, lg: 6 }}
              >
                <GridItem
                  colStart={{ base: 1, lg: 1 }}
                  colEnd={{ base: 1, lg: 9 }}
                  position="relative"
                >
                  <Box>
                    <Heading size="md" mb={3}>
                      Content
                    </Heading>
                    {isLoading ? (
                      <Skeleton height="20px" width={400} />
                    ) : docContent !== undefined ? (
                      (doc?.state.doctype === 'tile' &&
                        Object.entries(docContent!).map((entry: any[], i) => (
                          <Box key={i} mb={3}>
                            <Text mb={1} fontWeight="bold">
                              {entry[0] && entry[0].toString()}
                            </Text>
                            {typeof entry[1] === 'string' ? (
                              <Text>{entry[1]}</Text>
                            ) : (
                              <Box
                                backgroundColor={
                                  colorMode === 'dark' ? 'gray.900' : 'gray.50'
                                }
                                p={3}
                                borderRadius={5}
                                maxW={600}
                              >
                                <Code
                                  fontSize="sm"
                                  background="transparent"
                                  overflowX="auto"
                                  whiteSpace="pre"
                                  display="block"
                                >
                                  {JSON.stringify(entry[1], undefined, 2)}
                                </Code>
                              </Box>
                            )}
                          </Box>
                        ))) ||
                      (doc?.state.doctype === 'caip10-link' && (
                        <Text>{docContent.toString()}</Text>
                      ))
                    ) : (
                      <Text color="gray.300">No content</Text>
                    )}
                  </Box>
                  <Divider my={5} display={{ base: 'inherit', lg: 'none' }} />
                </GridItem>
                <GridItem
                  colStart={{ base: 1, lg: 10 }}
                  colEnd={{ base: 1, lg: 12 }}
                >
                  <Box>
                    <Heading size="md" mb={3}>
                      ID
                    </Heading>
                    <Text>
                      {docId && truncate(docId, 45)}
                    </Text>
                    <Divider my={5} />
                  </Box>
                  <Box>
                    <Heading mb={3} size="md">
                      Metadata
                    </Heading>
                    {doc?.state?.metadata ? (
                      Object.entries(doc?.state?.metadata).map(
                        (entry: any[], i) => (
                          <Box key={i} mb={3}>
                            <Text fontWeight="bold" mb={1}>
                              {entry[0] && entry[0].toString()}
                            </Text>
                            {entry[0].toString() === 'schema' ? (
                              <Link
                                to={`/document/${entry[1]?.replace(
                                  /^ceramic:\/\//,
                                  ''
                                )}`}
                              >
                                <Text
                                  bgGradient="linear(to-r, orange.600, orange.400)"
                                  fontWeight="bold"
                                  bgClip="text"
                                  wordBreak="break-all"
                                >
                                  {entry[1] && truncate(entry[1].toString(), 45)}
                                </Text>
                              </Link>
                            ) : (
                              <Text
                                wordBreak="break-all"
                              >
                                {entry[1] && truncate(entry[1].toString(), 45)}
                              </Text>
                            )}
                          </Box>
                        )
                      )
                    ) : (
                      <>
                        {isLoading ? (
                          <Skeleton height="20px" width="100%" />
                        ) : (
                          <Text>Get a document to see its metadata</Text>
                        )}
                      </>
                    )}
                  </Box>
                  <Divider my={5} />
                  <Box>
                    <Heading mb={3} size="md">
                      Anchoring
                    </Heading>
                    {doc?.state?.anchorStatus !== undefined && (
                      <Box mb={3}>
                        <Text fontWeight="bold" mb={1}>
                          Status
                        </Text>
                        <Text>
                          {doc?.state &&
                            formatAnchorStatus(doc!.state.anchorStatus)}
                        </Text>
                      </Box>
                    )}
                    {doc?.state?.anchorProof?.blockNumber && (
                      <Box mb={3}>
                        <Text mb={1} fontWeight="bold">
                          Block Number
                        </Text>
                        <Text>{doc?.state?.anchorProof?.blockNumber}</Text>
                      </Box>
                    )}
                    {doc?.state?.anchorProof?.blockTimestamp && (
                      <Box mb={3}>
                        <Text mb={1} fontWeight="bold">
                          Block Timestamp
                        </Text>
                        <Text>{doc?.state?.anchorProof?.blockTimestamp}</Text>
                      </Box>
                    )}
                    {doc?.state?.anchorProof?.chainId && (
                      <Box mb={3}>
                        <Text mb={1} fontWeight="bold">
                          Chain Id
                        </Text>
                        <Text>{doc?.state?.anchorProof?.chainId}</Text>
                      </Box>
                    )}
                  </Box>
                  <Divider my={5} />
                  <Box>
                    <Heading mb={3} size="md">
                      History
                    </Heading>
                    <Box maxH="250px" overflowY="scroll">
                      {doc?.state?.log ? (
                        (doc?.state?.log).reverse().map((commit, i) => (
                          <Box key={i} mb={3}>
                            <ChakraLink
                              onClick={() =>
                                handleChangeCommit(commit.cid.toString())
                              }
                              mb={1}
                            >
                              <Flex alignItems="center">
                                {(commit.cid.toString() === commitId ||
                                  (!commitId && i === 0)) &&
                                  '[X]'}{' '}
                                <Text>
                                  {commit?.cid && truncate(commit?.cid?.toString(), 45)}
                                </Text>{' '}
                                {i === 0 && '(latest)'}
                              </Flex>
                            </ChakraLink>
                          </Box>
                        ))
                      ) : (
                        <>
                          {isLoading ? (
                            <Skeleton height="20px" width="100%" />
                          ) : (
                            <Text>Get a stream to see its log</Text>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                  <Divider my={5} />
                  <Box>
                    <Heading mb={3} size="md">
                      Type
                    </Heading>
                    <Text>{doc?.state?.doctype}</Text>
                  </Box>
                </GridItem>
              </Grid>
            )}
          </>
        )}
      </>
    </>
  )
}

export default Document
