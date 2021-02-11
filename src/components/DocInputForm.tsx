import { Box, Button, Center, Flex, Input } from '@chakra-ui/react'
import { navigate } from '@reach/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'

interface DocInputFormProps {
  mb?: number
  isLoading?: boolean
  onToggle: any
}

const DocInputForm: React.SFC<DocInputFormProps> = ({
  mb = 0,
  isLoading,
  onToggle,
}) => {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = (values: any) => navigate(`/document/${values.docId}`)

  return (
    <Box>
      <Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="docId"
            type="text"
            ref={register()}
            size="lg"
            width="66ch"
            mb={3}
            placeholder="eg k3y52l7qbv1frxjdr9qpn9ldvbxb0jg4eig7wtjkdu6gk84vyazw9j4txf4o6d2io"
          />
          {errors.docId && errors.docId.message}
          <Center>
            <Flex alignItems="center" mb={mb} wrap="wrap">
              <Button
                type="submit"
                disabled={isLoading}
                color="white"
                size="lg"
                leftIcon={<FaSearch />}
                bgGradient="linear(to-r, orange.500, orange.300)"
                _hover={{
                  bgColor: 'rgb(255, 153, 103)',
                }}
                mr={3}
              >
                {isLoading ? 'Loading…' : <>Look Up</>}
              </Button>
              <Button size="lg" onClick={onToggle} variant="outline">
                Cancel
              </Button>
            </Flex>
          </Center>
        </form>
      </Center>
    </Box>
  )
}

export default DocInputForm
