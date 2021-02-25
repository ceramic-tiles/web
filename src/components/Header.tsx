import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  SlideFade,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { ReactComponent as TilesLogo } from '../assets/tilesLogoAnim.svg'
import ColorModeSwitcher from './ColorModeSwitcher'
import DocInputForm from './DocInputForm'
import SampleDocuments from './SampleDocuments'

const Header = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode } = useColorMode()

  const gradFadeCol = colorMode === 'dark' ? 'rgba(10,10,9,1)' : 'rgba(255,255,255,1)'

  return (
    <Box>
      <Box
        position="absolute"
        left="0"
        top="-40vh"
        width="100%"
        height="80vh"
        zIndex="-1"
        backgroundRepeat="no-repeat"
        // backgroundImage="url('./tilesBg.svg')"
        // bgGradient="radial(ellipse at center, #F45E12, #FF8700, transparent)"
        sx={{
          // background: `
          // radial-gradient(ellipse closest-side at 50% 50%, #FBAB7E 5%, #F7CE68 50%, transparent);
          // `,
          // backgroundColor: '#FBAB7E;',
          // linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
          background: `
          linear-gradient(0deg, ${gradFadeCol}, rgba(255,255,255,0) 50%),
          linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
          `,
        }}
      >
        
      </Box>
      <Flex justifyContent="space-between" alignItems="center" px={6} my={6}>
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <Box>
            <TilesLogo width="100px" style={{ display: 'inline', paddingRight: '2em' }} />
            <Heading display="inline" color="white" as="h1" size="3xl" fontStyle="italic" fontFamily="Playfair Display" verticalAlign="middle">
              Tiles
            </Heading>
          </Box>
        </Link>
        <Flex>
          <Box display={isOpen ? 'none' : 'inherit'} mr={3}>
            <Button
              leftIcon={<FaSearch />}
              onClick={onToggle}
              bg="#FF8700"
              boxShadow="md"
              _hover={{bg: '#F45E12',}}
              _active={{bg: '#F45E12',}}
              color="white"
            >
              Look Up Doc
            </Button>
          </Box>
          <SampleDocuments />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Flex>
      <SlideFade in={isOpen}>
        <Box m={12} display={isOpen ? 'visible' : 'none'}>
          <DocInputForm onToggle={onToggle} />
        </Box>
      </SlideFade>
    </Box>
  )
}

export default Header
