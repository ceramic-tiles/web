// import * as React from 'react';

// const DocInputForm = () => {
//   return (
//     <Flex mb={6} alignItems="center" wrap="wrap">
//       <Input
//         onChange={(e: any) => handleDocIdInput(e.target.value)}
//         width={600}
//         mr={3}
//         placeholder="e.g. kjzl6cwe1jw147c4oeqx7mp9ov3zzp3t7qewn7gjximydwwxearw4lyxg8ig382"
//         value={docIdInput}
//       />
//       <Button onClick={() => getDoc(docIdInput)}>Get Document</Button>
//     </Flex>
//   )
// }

// export default DocInputForm;

import { Button, Flex, Input } from '@chakra-ui/react'
import { navigate } from '@reach/router'
import React from 'react'
import { useForm } from 'react-hook-form'

const DocInputForm = (props: any) => {
  const { isLoading } = props
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = (values: any) => navigate(`/document/${values.docId}`)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex alignItems="center" mb={6} wrap="wrap">
        <Input
          size="lg"
          name="docId"
          ref={register()}
          width={630}
          mr={3}
          mb={3}
        />
        {errors.docId && errors.docId.message}
        <Button
          type="submit"
          disabled={isLoading}
          mb={3}
          size="lg"
          color="white"
          bgGradient="linear(to-r, gray.600, gray.500)"
          _hover={{
            bgColor: 'rgb(255, 153, 103)',
          }}
        >
          {isLoading ? 'Loading…' : 'Get Document'}
        </Button>
      </Flex>
    </form>
  )
}

export default DocInputForm
