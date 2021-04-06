/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ceramic } from '../App'

export interface LenSectionProps {
  schema?: string
  setLens: any
}

const getLensMarketIndexDoc = async () => {
  return await ceramic.loadDocument(
    'kjzl6cwe1jw1491bthc9uqawl3styv7jqwcuciakl8z19s5o1kr7odnd5iisr7y'
  )
}

const getFirstLensMarketOnIndex = async (schema?: string) => {
  const lensMarkets = await getLensMarketIndexDoc().then(
    (res) =>
      res?.state?.content?.lensMarkets?.filter((lensMarket: any) => {
        return lensMarket?.targetSchemas?.includes(schema)
      }) // todo: create LensMarket interface
  )

  const firstLensMarket = lensMarkets[0]
  console.log('firstLensMarket', firstLensMarket)

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

  // const {
  //   isLoading: lensMarketIndexDocIsLoading,
  //   error: lensMarketIndexDocError,
  //   data: lensMarketIndexDoc,
  // } = useDoc('kjzl6cwe1jw14bij9u6f0824auprf1hjq2s834uk3pbbj0k9zg71rnowqxli2r7')

  // const [firstLensMarket, setFirstLensMarket] = useState<any>({})
  const [lenses, setLenses] = useState<any>({})
  const [lensIds, setLensIds] = useState<any>([])

  const setupFirstLensMarket = async () => {
    return await getFirstLensMarketOnIndex(schema)
  }
  const setupLensIds = async (firstLensMarket: any) => {
    return await getLensIdsFromLensMarket(firstLensMarket?.lensMarketId)
  }

  const setupLenses = async () => {
    // if (
    //   lensMarketIndexDocIsLoading ||
    //   lensMarketIndexDocError ||
    //   !firstLensMarket
    // ) {
    //   return
    // }

    try {
      const firstLensMarket = await setupFirstLensMarket()
      console.log('firstLensMarket', firstLensMarket)

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
