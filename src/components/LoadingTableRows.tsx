import { Tr, Td, Skeleton } from '@chakra-ui/react'
import * as React from 'react'

const LoadingTableRows = () => {
  return (
    <>
      <Tr>
        <Td width="75%">
          <Skeleton height={5} />
        </Td>
        <Td width="25%">
          <Skeleton height={5} />
        </Td>
      </Tr>
      <Tr>
        <Td width="75%">
          <Skeleton height={5} />
        </Td>
        <Td width="25%">
          <Skeleton height={5} />
        </Td>
      </Tr>
      <Tr>
        <Td width="75%">
          <Skeleton height={5} />
        </Td>
        <Td width="25%">
          <Skeleton height={5} />
        </Td>
      </Tr>
    </>
  )
}

export default LoadingTableRows
