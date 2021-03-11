import { Grid, GridItem, Box, Heading, Code, Skeleton, Divider, Text, useColorMode } from '@chakra-ui/react';
import * as React from 'react';
import useDoc from '../hooks/useDoc';

export interface DefaultLensProps {
  docId?: string;
}

const DefaultLens: React.SFC<DefaultLensProps> = (docId) => {
  const [docContent, setDocContent] = React.useState<Object>();

  const { isLoading, error, data: doc } = useDoc(docId.docId)

  React.useEffect(() => {
    const updateContent = doc?.state?.content || doc?.state?.next?.content || undefined;
    setDocContent(updateContent)
  }, [doc]);

  const { colorMode } = useColorMode()

  const formatAnchorStatus = (anchorStatus: number) => {
    switch (anchorStatus) {
      case 0:
        return 'NOT_REQUESTED (0)'
      case 1:
        return 'PENDING (1)'
      case 2:
        return 'PROCESSING (2)'
      case 3:
        return 'ANCHORED (3)'
      case 4:
        return 'FAILED (4)'
      default:
        break
    }
  }

  if (error) return <Text mb={6}>🚨 Something's wrong – try another document</Text>

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6}>
      <GridItem colSpan={4}>
        <Box mb={6}>
          <Heading size="md" mb={3}>
            Content
                    </Heading>
          {(docContent !== undefined) ? (
            (doc?.state.doctype === 'tile' &&
              Object.entries(docContent!).map((entry: any[]) => (
                <Box mb={3}>
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
              )))
            || (doc?.state.doctype === 'caip10-link' &&
              <Text>{docContent.toString()}</Text>)
          ) : (
            <Text>
              {isLoading ? (
                <Skeleton height="20px" width={400} />
              ) : (
                <Text>Get a document to see its content</Text>
              )}
            </Text>
          )}
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box>
          <Heading mb={3} size="md">
            Doc Type
        </Heading>
          <Text mb={3}>
            {doc?.state?.doctype}
          </Text>
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
            Object.entries(doc?.state?.metadata).map((entry: any[]) => (
              <Box mb={3}>
                <Text fontWeight="bold" mb={3}>
                  {entry[0] && entry[0].toString()}
                </Text>
                <Text wordBreak="break-all">
                  {entry[1] && entry[1].toString()}
                </Text>
              </Box>
            ))
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
          {doc?.state?.log ? (
            (doc?.state?.log).reverse().map((commit, i) => (
              <Box mb={3} fontSize="sm">
                <Text mb={3}>
                  {commit.cid.toString()} {(i === 0) && '(latest)'}
                </Text>
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
      </GridItem>
    </Grid>);
}

export default DefaultLens;