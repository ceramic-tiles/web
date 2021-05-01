import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react'
import { navigate } from '@reach/router'
import React from 'react'
import { useForm } from 'react-hook-form'

interface DocInputFormProps {
  mb?: number
  isLoading?: boolean
  docId?: string
}

const DocInputForm: React.SFC<DocInputFormProps> = ({ isLoading, docId }) => {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = (values: any) => navigate(`/document/${values.docId}`)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box width={{ base: '325px', md: '775px' }} mr={1}>
        <InputGroup>
          <InputLeftAddon
            pointerEvents="none"
            bgColor="gray.100"
            color="gray.500"
            children="ceramic://"
            w={100}
            display={{ base: 'none', md: 'inherit' }}
          />
          <Input
            name="docId"
            type="text"
            defaultValue={docId}
            ref={register()}
            placeholder="e.g. k3y52l7qbv1frxjdr9qpn9ldvbxb0jg4eig7wtjkdu6gk84vyazw9j4txf4o6d2io"
            borderWidth={{base: 0, md: 1}}
            borderLeftWidth={1}
          />
          <InputRightElement
            w={{ base: 25, md: 75 }}
            children={
              <Button
              type="submit"
              w="100%"
              disabled={isLoading}
              color="white"
              borderRightRadius={{ base: 0, md: 'md' }}
                borderLeftRadius={0}
                mx="right"
                bgColor="gray.400"
                _hover={{
                  bgColor: 'rgb(255, 153, 103)',
                }}
              >
                {isLoading ? 'Loading…' : <>Go</>}
              </Button>
            }
          />
        </InputGroup>
      </Box>
      {errors.docId && errors.docId.message}
    </form>
  )
}

export default DocInputForm
