import { Button, Flex, Input } from '@chakra-ui/react'
import { navigate } from '@reach/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'

interface DocInputFormProps {
  mb?: number
  isLoading?: boolean
}

const DocInputForm: React.SFC<DocInputFormProps> = ({ mb = 0, isLoading }) => {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = (values: any) => navigate(`/document/${values.docId}`)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex alignItems="center" mb={mb} wrap="wrap">
        <Input
          name="docId"
          type="text"
          ref={register()}
          width={500}
          mr={3}
          placeholder="Doc ID eg k3y52l7qbv1frxjdr9qpn9ldvbxb0jg4eig7wtjkdu6gk84vyazw9j4txf4o6d2io"
        />
        {errors.docId && errors.docId.message}
        <Button
          type="submit"
          disabled={isLoading}
          color="white"
          bgGradient="linear(to-r, gray.600, gray.500)"
          _hover={{
            bgColor: 'rgb(255, 153, 103)',
          }}
        >
          {isLoading ? 'Loading…' : <FaSearch />}
        </Button>
      </Flex>
    </form>
  )
}

export default DocInputForm
