import { Box, Heading, Text } from '@chakra-ui/layout';
import { Link, RouteComponentProps } from '@reach/router';
import * as React from 'react';

export interface LensesProps extends RouteComponentProps {

}

const Lenses: React.SFC<LensesProps> = () => {
  return (
    <Box p={6}><Heading mb={3}>Lens Markets</Heading>
      <ul>
        <li><Link style={{ textDecoration: 'underline' }} to="/lens-market/k3y52l7qbv1fry2ffidtwpbs28puuvibgjnjaxehbtacvvfa72nj2eac2a1ihdds0">k3y52l7qbv1fry2ffidtwpbs28puuvibgjnjaxehbtacvvfa72nj2eac2a1ihdds0</Link></li>
      </ul>
    </Box>);
}

export default Lenses;