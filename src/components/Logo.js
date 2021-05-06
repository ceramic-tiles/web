import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const Logo = (props) => {
  const { size } = props

  return (
    <Box>
      <Flex alignItems="center">
        <Box mr={size === 'lg' ? 2 : 1}>
          <svg
            width={size === 'lg' ? 40 : 30}
            height={size === 'lg' ? 40 : 30}
            viewBox="0 0 297 297"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 121.814L34.3393 148.83L0 175.847L148.5 292.66L297 175.847L262.661 148.83L297 121.814L148.5 5L0 121.814ZM66.9824 151.017L148.5 215.135L230.017 151.017L148.5 86.8803L66.9824 151.017Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="-2.79247e-06"
                y1="149"
                x2="297"
                y2="149"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#ED8936" />
                <stop offset="1" stop-color="#ED8936" />
              </linearGradient>
            </defs>
          </svg>
        </Box>
        <Heading
          as="h1"
          size={size === 'lg' ? 'xl' : 'lg'}
          letterSpacing="-0.5px"
          color="orange.400"
          display={{ base: 'none', lg: 'inherit' }}
        >
          Tiles
        </Heading>
      </Flex>
    </Box>
  )
}

export default Logo
