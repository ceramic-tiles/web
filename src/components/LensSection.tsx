/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ceramic } from '../App'
import useDoc from '../hooks/useDoc'

export interface LenSectionProps {
  schema?: string
  setLens: any
}

const getFirstLensMarketOnIndex = async (schema?: string, lensMarketIndexDoc?: any) => {
  const lensMarkets = await lensMarketIndexDoc?.state?.content?.lensMarkets?.filter((lensMarket: any) => {
        return lensMarket?.targetSchemas?.includes(schema)
      }) // todo: create LensMarket interface

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

  const [lenses, setLenses] = useState<any>({})
  const [lensIds, setLensIds] = useState<any>([])

  const {
    isLoading: lensMarketIndexDocIsLoading,
    error: lensMarketIndexDocError,
    data: lensMarketIndexDoc,
  } = useDoc('kjzl6cwe1jw1491bthc9uqawl3styv7jqwcuciakl8z19s5o1kr7odnd5iisr7y')

  const setupFirstLensMarket = async () => {
    return await getFirstLensMarketOnIndex(schema, lensMarketIndexDoc)
  }
  const setupLensIds = async (firstLensMarket: any) => {
    return await getLensIdsFromLensMarket(firstLensMarket?.lensMarketId)
  }

  const setupLenses = async () => {
    if (
      lensMarketIndexDocIsLoading ||
      lensMarketIndexDocError ||
      !lensMarketIndexDoc
    ) {
      return
    }

    try {
      const firstLensMarket = await setupFirstLensMarket()

      const lensIdsTemp = await setupLensIds(firstLensMarket)

      const lensQueries =
        lensIdsTemp &&
        (await lensIdsTemp?.map((lensId: string) => ({
          docId: lensId,
        })))

      const lensesTemp = await ceramic.multiQuery(lensQueries)

      setLenses(lensesTemp)
      setLensIds(lensIdsTemp)
      console.table([
        ['lenses', lenses],
        ['lensIds', lensIds],
      ])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setupLenses()
  }, [])

  return (
    <Flex alignItems="center">
      <Text fontWeight="bold" mr={3}>
        Pick Lens
      </Text>
      <Select onChange={(e) => setLens(lenses[e.target.value])} w={200} mr={3}>
        <option value="default">Default</option>
        {lensIds &&
          lensIds?.map((lensId: string) => {
            const lens = lenses[lensId]
            return <option value={lensId}>{lens?.state?.content?.title}</option>
          })}
      </Select>
    </Flex>
  )
}

export default LenSection
