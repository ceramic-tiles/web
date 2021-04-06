import { useEffect, useState } from 'react'
import useDoc from './useDoc'
import { useWhatChanged } from '@simbathesailor/use-what-changed'
import { ceramic } from '../App'

export default function useLenses(schema) {
  const [firstLensMarket, setFirstLensMarket] = useState({})

  const {
    isLoading: lensMarketIndexDocIsLoading,
    error: lensMarketIndexDocError,
    data: lensMarketIndexDoc,
  } = useDoc('kjzl6cwe1jw14bij9u6f0824auprf1hjq2s834uk3pbbj0k9zg71rnowqxli2r7')

  const deps = [
    lensMarketIndexDocIsLoading,
    lensMarketIndexDocError,
    lensMarketIndexDoc,
    schema,
    // firstLensMarket,
    // setFirstLensMarket,
  ]

  useWhatChanged(deps)

  useEffect(() => {
    const getFirstLensMarketOnIndex = (lensMarketIndexDoc) => {
      console.log('lensMarketIndexDoc', lensMarketIndexDoc)
      const lensMarkets = lensMarketIndexDoc?.content?.lensMarkets?.filter(
        (lensMarket) => lensMarket?.targetSchemas?.includes(schema)
      )
      const firstLensMarket = lensMarkets && lensMarkets[0]
      return firstLensMarket
    }

    const getLensIdsFromLensMarket = async (lensMarket) => {
      if (!lensMarket) {
        return
      }

      const lensMarketDoc = await ceramic.loadDocument(lensMarket)

      return lensMarketDoc?.content?.lensIds
    }

    const setupLensIds = async (firstLensMarket) => {
      return await getLensIdsFromLensMarket(firstLensMarket?.lensMarketId)
    }

    const setupFirstLensMarket = async () => {
      const firstLensMarketTemp = await getFirstLensMarketOnIndex(
        lensMarketIndexDoc
      )
      setFirstLensMarket(firstLensMarketTemp)
    }

    const setupLenses = async () => {
      await setupFirstLensMarket()
      console.log('firstLensMarket', firstLensMarket)

      const lensIdsTemp = await setupLensIds(firstLensMarket)
      console.log('lensIdsTemps', lensIdsTemp)
    }

    setupLenses()
  }, deps)
}
