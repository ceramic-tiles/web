/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ceramic } from '../App'

export interface LenSectionProps {
  schema?: string
  setLens: any
}

const getFirstLensMarketOnIndex = async (schema?: string) => {
  const lensMarketIndexDoc = await ceramic.loadDocument(
    'kjzl6cwe1jw14bij9u6f0824auprf1hjq2s834uk3pbbj0k9zg71rnowqxli2r7'
  )
  const lensMarkets = lensMarketIndexDoc?.content?.lensMarkets?.filter(
    (lensMarket: any) => lensMarket?.targetSchemas?.includes(schema)
  ) // todo: create LensMarket interface

  const firstLensMarket = lensMarkets[0]

  return firstLensMarket
}

const getLensIdsFromLensMarket = async (lensMarket: string) => {
  if (!lensMarket) {
    return
  }
  const lensMarketDoc = await ceramic.loadDocument(lensMarket)

  return lensMarketDoc?.content?.lensIds
}

const LenSection: React.SFC<LenSectionProps> = (props) => {
  const { schema, setLens } = props

  const setupFirstLensMarket = async () =>
    await getFirstLensMarketOnIndex(schema)
  const setupLensIds = async (firstLensMarket: any) =>
    await getLensIdsFromLensMarket(firstLensMarket?.lensMarketId)

  const [lenses, setLenses] = useState<any>({})
  const [lensIds, setLensIds] = useState<any>([])

  const setupLenses = async () => {
    const firstLensMarket = await setupFirstLensMarket()
    const lensIdsTemp = await setupLensIds(firstLensMarket)

    const lensQueries = await lensIdsTemp?.map((lensId: string) => ({
      docId: lensId,
    }))

    try {
      const lensesTemp = await ceramic.multiQuery(lensQueries)
      setLenses(lensesTemp)
      setLensIds(lensIdsTemp)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setupLenses()
  }, [setLenses, setLensIds])

  return (
    <Flex alignItems="center">
      <Text fontWeight="bold" mr={3}>
        Pick Lens
      </Text>
      <Select onChange={(e) => setLens(lenses[e.target.value])} w={200} mr={3}>
        <option value="default">Default</option>
        {lensIds.map((lensId: string) => {
          const lens = lenses[lensId]
          return <option value={lensId}>{lens?.state?.content?.title}</option>
        })}
      </Select>
      {/* <ChakraLink
        as={Link}
        to={`/lens-market/${schema.substring(10)}`}
        textDecoration="underline"
      >
        Lens Market
      </ChakraLink> */}
    </Flex>
  )
}

export default LenSection
