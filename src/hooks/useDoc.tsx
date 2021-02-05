import { useQuery } from 'react-query'
import { ceramic } from '../App'

const getDocById = async (docId: string) => {
  const doc = await ceramic.loadDocument(docId).then((res) => res)
  return doc
}

export default function useDoc(docId: any) {
  return useQuery(['doc', docId], () => getDocById(docId))
}

// import { useState } from 'react'
// import { ceramic } from '../App'

// const useDoc = async (docId: any) => {
//   const [docObj, setDocObj] = useState({
//     isLoading: false,
//     error: '',
//     data: {},
//   })

//   setDocObj({ ...docObj, isLoading: true })

//   await ceramic
//     .loadDocument(docId)
//     .then((res) => {
//       setDocObj({ ...docObj, isLoading: false, data: res })
//     })
//     .catch((err) => setDocObj({ ...docObj, error: err }))

//   return docObj
// }

// export default useDoc
