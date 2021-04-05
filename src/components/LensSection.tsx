/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ceramic } from '../App'
import useDoc from '../hooks/useDoc'

export interface LenSectionProps {
  schema?: string
  setLens: any
}

const getFirstLensMarketOnIndex = async (
  schema?: string,
  lensMarketIndexDoc?: any
) => {
  // const lensMarketIndexDoc = await ceramic.loadDocument(
  //   'kjzl6cwe1jw14bij9u6f0824auprf1hjq2s834uk3pbbj0k9zg71rnowqxli2r7'
  //   )

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

  const {
    isLoading: lensMarketIndexDocIsLoading,
    error: lensMarketIndexDocError,
    data: lensMarketIndexDoc,
  } = useDoc('kjzl6cwe1jw14bij9u6f0824auprf1hjq2s834uk3pbbj0k9zg71rnowqxli2r7')

  const [firstLensMarket, setFirstLensMarket] = useState<any>({})
  const [lenses, setLenses] = useState<any>({})
  const [lensIds, setLensIds] = useState<any>([])

  const setupFirstLensMarket = async () => {
    const firstLensMarketTemp = await getFirstLensMarketOnIndex(
      schema,
      lensMarketIndexDoc
    )

    setFirstLensMarket(firstLensMarketTemp)
  }
  const setupLensIds = async (firstLensMarket: any) => {
    return await getLensIdsFromLensMarket(firstLensMarket?.lensMarketId)
  }

  const setupLenses = async () => {
    if (
      lensMarketIndexDocIsLoading ||
      lensMarketIndexDocError ||
      !firstLensMarket
    ) {
      return
    }

    try {
      await setupFirstLensMarket()
      console.log('firstLensMarket', firstLensMarket)

      const lensIdsTemp = await setupLensIds(firstLensMarket)
      console.log('lensIdsTemp', lensIdsTemp)

      const lensQueries =
        lensIdsTemp &&
        (await lensIdsTemp?.map((lensId: string) => ({
          docId: lensId,
        })))
      console.log('lensQueries', lensQueries)

      const lensesTemp = await ceramic.multiQuery(lensQueries)
      console.log('lensesTemp', lensesTemp)

      setLenses(lensesTemp)
      setLensIds(lensIdsTemp)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    console.table([
      ['lensMarketIndexDocIsLoading', lensMarketIndexDocIsLoading],
      ['lensMarketIndexDocError', lensMarketIndexDocError],
      ['lensMarketIndexDoc', lensMarketIndexDoc],
    ])
    console.log(lensMarketIndexDoc  )
    setupLenses()
  }, [setLenses, setLensIds, setFirstLensMarket, lensMarketIndexDocIsLoading, lensMarketIndexDocError])

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
