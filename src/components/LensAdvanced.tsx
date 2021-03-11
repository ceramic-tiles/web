import { Grid, GridItem, Box, Heading, Code, Skeleton, Divider, Text, useColorMode } from '@chakra-ui/react';
import * as React from 'react';
import useDoc from '../hooks/useDoc';
import MarkdownViewer from './MarkdownViewer';

export interface LensBasicProps {
  docId?: string;
}

const LensBasic: React.SFC<LensBasicProps> = (docId) => {
  const [docContent, setDocContent] = React.useState<any>();

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
    <>
      <Text><b>Updated at:</b> {doc?.content?.updated}</Text>
      <MarkdownViewer doc={doc} />
    </>);
}

export default LensBasic;