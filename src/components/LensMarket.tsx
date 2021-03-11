import { Box, Heading, Text } from '@chakra-ui/layout';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';

export interface LensMarketProps extends RouteComponentProps {
  schemaId?: string
}

const LensMarket: React.SFC<LensMarketProps> = (props) => {
  const { schemaId } = props

  return (<Box p={6}>
    <Heading size="md" mb={6}>Lens Market for Schema {schemaId}</Heading>
    <ol>
      <li>Basic<br /><Text display="inline-block" textDecoration='underline'>⬆️ Upvote</Text> <Text display="inline-block" textDecoration="underline">⬇️ Downvote</Text> – 5 points</li>
      <li>Super Advanced<br /><Text display="inline-block" textDecoration='underline'>⬆️ Upvote</Text> <Text display="inline-block" textDecoration="underline">⬇️ Downvote</Text> – 1 point</li>
    </ol>
  </Box>);
}

export default LensMarket;