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
  Spinner,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { RouteComponentProps } from '@reach/router'
import React, { useEffect, useState } from 'react'
import LensSection from './components/LensSection'
import { formatAnchorStatus } from './helpers'
import useCommit from './hooks/useCommit'
import useDoc from './hooks/useDoc'
import { RemoteComponent } from './RemoteComponent'

interface DocProps extends RouteComponentProps {
  docId?: string
  commitId?: string
}

const Document = (props: DocProps) => {
  const { docId } = props
  const [commitId, setCommitId] = useState(props.commitId)
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
    const updateContent =
      doc?.state?.next?.content || doc?.state?.content || undefined
    if (commitId && commitDoc && doc !== commitDoc) {
      setDocContent(commitDoc.state.content)
    } else {
      setDocContent(updateContent)
    }
  }, [doc, commitId, commitDoc])

  const { colorMode } = useColorMode()

  const handleChangeCommit = (commitID: string) => {
    if (commitId !== commitID) setCommitId(commitID)
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
    <Box px={6} py={6}>
      {error ? (
        <Text mb={6}>🚨 Something's wrong – try another document</Text>
      ) : (
        <>
          <Flex mb={6} alignItems="center" justifyContent="space-between">
            <Heading mr={6} size="md">
              ceramic://{docId}
            </Heading>
            {schema ? (
              <LensSection schema={schema} setLens={setLens} />
            ) : (
              <Text color="gray.400">No Lens available</Text>
            )}
          </Flex>
          <Divider my={6} />
          {lens ? (
            !isLoading && (
              <Box maxW={'100%'} overflowX="auto">
                <RemoteComponent
                  url={lens?.state?.content?.content}
                  docContent={docContent}
                />
              </Box>
            )
          ) : (
            <Grid
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(1, 1fr)',
                'repeat(6, 1fr)',
              ]}
              gap={6}
            >
              <GridItem colSpan={4} position="relative">
                {isLoading && (
                  <Box
                    position="absolute"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={
                      colorMode === 'dark' ? 'gray.800' : 'gray.200'
                    }
                    opacity="0.5"
                    height="100%"
                    width="100%"
                  >
                    <Spinner size="xl" />
                  </Box>
                )}
                <Box mb={6}>
                  <Heading size="md" mb={3}>
                    Content
                  </Heading>
                  {docContent !== undefined ? (
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
                                colorMode === 'dark' ? 'gray.900' : 'gray.100'
                              }
                              p={3}
                              borderRadius={5}
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
                    <Box>
                      {isLoading ? (
                        <Skeleton height="20px" width={400} />
                      ) : (
                        <Text>Get a document to see its content</Text>
                      )}
                    </Box>
                  )}
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Box>
                  <Heading mb={3} size="md">
                    Doc Type
                  </Heading>
                  <Text mb={3}>{doc?.state?.doctype}</Text>
                </Box>
                <Divider my={5} />
                <Box>
                  <Heading mb={3} size="md">
                    Anchoring
                  </Heading>
                  <Box mb={3}>
                    <Text fontWeight="bold" mb={3}>
                      Status
                    </Text>
                    <Text>
                      {doc?.state &&
                        formatAnchorStatus(doc!.state.anchorStatus)}
                    </Text>
                  </Box>
                  <Box mb={3}>
                    <Text fontWeight="bold">Block Number</Text>
                    <Text>{doc?.state?.anchorProof?.blockNumber}</Text>
                  </Box>
                  <Box mb={3}>
                    <Text fontWeight="bold">Block Timestamp</Text>
                    <Text>{doc?.state?.anchorProof?.blockTimestamp}</Text>
                  </Box>
                  <Box mb={3}>
                    <Text fontWeight="bold">Chain Id</Text>
                    <Text>{doc?.state?.anchorProof?.chainId}</Text>
                  </Box>
                </Box>
                <Divider my={5} />
                <Box>
                  <Heading mb={3} size="md">
                    Metadata
                  </Heading>
                  {doc?.state?.metadata ? (
                    Object.entries(doc?.state?.metadata).map(
                      (entry: any[], i) => (
                        <Box key={i} mb={3}>
                          <Text fontWeight="bold" mb={3}>
                            {entry[0] && entry[0].toString()}
                          </Text>
                          <Text wordBreak="break-all">
                            {entry[1] && entry[1].toString()}
                          </Text>
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
                    Document History
                  </Heading>
                  <Box height="250px" overflowY="scroll">
                    {doc?.state?.log ? (
                      (doc?.state?.log).reverse().map((commit, i) => (
                        <Box key={i} mb={3} fontSize="sm">
                          <ChakraLink
                            onClick={() =>
                              handleChangeCommit(commit.cid.toString())
                            }
                            mb={3}
                          >
                            {(commit.cid.toString() === commitId ||
                              (!commitId && i === 0)) &&
                              '[X]'}{' '}
                            {commit.cid.toString()} {i === 0 && '(latest)'}
                          </ChakraLink>
                        </Box>
                      ))
                    ) : (
                      <>
                        {isLoading ? (
                          <Skeleton height="20px" width="100%" />
                        ) : (
                          <Text>Get a document to see its log</Text>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          )}
        </>
      )}
    </Box>
  )
}

export default Document
