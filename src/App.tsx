import CeramicClient from '@ceramicnetwork/http-client'
import { Grid, GridItem } from "@chakra-ui/react"
import {
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Heading,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { Redirect, Router } from '@reach/router'

import { navigate, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Document from './Document'
import DocumentList from './DocumentList'



const API_URL = 'https://gateway-clay.ceramic.network'
export const ceramic = new CeramicClient(API_URL)

interface AppProps extends RouteComponentProps {
  docId?: string
}

export const App = (props: AppProps) => {
  const { docId } = props
  const { colorMode } = useColorMode()

  return (
    <>
      <Header />
      <Router>
        <DocumentList default />
        <Document path="/document/:docId" />
      </Router>
      <Footer />
    </>
  )
}
