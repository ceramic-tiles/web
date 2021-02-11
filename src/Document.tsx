import {
  Box,
  Code,
  Divider,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import useDoc from './hooks/useDoc'

interface DocProps extends RouteComponentProps {
  docId?: string
}

const Document = (props: DocProps) => {
  const { docId } = props
  const { isLoading, error, data: doc } = useDoc(docId)
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

  return (
    <Box px={6} py={6}>
      {error ? (
        <Text mb={6}>🚨 Something's wrong – try another document</Text>
      ) : (
        <>
          <Box mb={6}>
            <Heading size="sm" mb={3}>
              Viewing Document ID
            </Heading>
            <Heading size="md">{docId}</Heading>
          </Box>
          <Divider my={6} />
          <Grid templateColumns="repeat(6, 1fr)" gap={6}>
            <GridItem colSpan={4}>
              <Box mb={6}>
                <Heading size="md" mb={3}>
                  Content
                </Heading>
                {doc?.state?.content ? (
                  Object.entries(doc?.state?.content).map((entry: any[]) => (
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
                  ))
                ) : (
                  <>
                    {isLoading ? (
                      <Skeleton height="20px" width={400} />
                    ) : (
                      <Text>Get a document to see its content</Text>
                    )}
                  </>
                )}
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Box>
                <Heading mb={3} size="md">
                  Anchoring
                </Heading>
                <Box mb={3}>
                  <Text fontWeight="bold" mb={3}>
                    Status
                  </Text>
                  <Text>
                    {doc?.state?.anchorStatus &&
                      formatAnchorStatus(doc?.state?.anchorStatus)}
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
            </GridItem>
          </Grid>
        </>
      )}
      {/* {doc && (
          <Flex mb={6} alignItems="center">
            <Text mr={3}>Version</Text>
            <Select
              onChange={(e: any) => {
                navigate(`/document/${e.target.value}`)
              }}
              width={200}
            >
              {doc?.allCommitIds?.map((commitId: any, i: number) => (
                <option key={i} value={commitId}>
                  Version {i + 1}
                </option>
              ))}
            </Select>
          </Flex>
        )} */}
    </Box>
  )
}

export default Document
