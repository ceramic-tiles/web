/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ceramic } from '../App'
import { VscQuestion } from 'react-icons/vsc'
export interface LensSectionProps {
  schema?: string
  setLens: any
}

const getLensMarketIndexDoc = async () => {
  return await ceramic.loadDocument(
    'kjzl6cwe1jw149v7r31yn43g4q85aeynaigzx0ocxlf1u3j5ptts17p4qxceww8'
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

  return firstLensMarket
}

const getLensIdsFromLensMarket = async (lensMarket: string) => {
  if (!lensMarket) {
    return
  }
  const lensMarketDoc = await ceramic.loadDocument(lensMarket)

  return lensMarketDoc?.content?.lensIds
}

const LensSection: React.SFC<LensSectionProps> = (props) => {
  const { schema, setLens } = props
  const [lenses, setLenses] = useState<any>({})
  const [lensIds, setLensIds] = useState<any>([])

  const setupFirstLensMarket = async () => {
    return await getFirstLensMarketOnIndex(schema)
  }
  const setupLensIds = async (firstLensMarket: any) => {
    return await getLensIdsFromLensMarket(firstLensMarket?.lensMarketId)
  }

  const setupLenses = async () => {
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
    <FormControl id="lens" alignItems="center">
      <Flex alignItems="center">
        <FormLabel mb={0}>Lens</FormLabel>
        <Select
          onChange={(e: any) => setLens(lenses[e.target.value])}
          w={{ base: '100%', lg: 130 }}
          disabled={lensIds.length > 0}
        >
          <option value="default">Default</option>
          {lensIds &&
            lensIds?.map((lensId: string) => {
              const lens = lenses[lensId]
              return (
                <option value={lensId}>{lens?.state?.content?.title}</option>
              )
            })}
        </Select>
        <Popover>
          <Box m={0} ml={2}>
            <PopoverTrigger>
              <Flex alignItems="center" color="gray.500" fontSize="sm">
                {/* <Box mr={1}>
              <VscQuestion size="20px" />
            </Box>{' '} */}
                What are Lenses?
              </Flex>
            </PopoverTrigger>
          </Box>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Flex alignItems="center">
                <Box mr={1}>
                  <VscQuestion />
                </Box> What are Lenses?
              </Flex>
            </PopoverHeader>
            <PopoverBody>
              Lenses let you view Ceramic streams through different user
              interfaces. 1 stream, infinite UIs. For now, streams always load with the Default Lens.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </FormControl>
  )
}

export default LensSection
