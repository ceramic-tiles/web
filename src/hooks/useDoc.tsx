import { useQuery } from 'react-query'
import { ceramic } from '../App'

const getDocById = async (docId: string) => {
  const doc = await ceramic.loadDocument(docId).then((res) => res)
  return doc
}

export default function useDoc(docId: any) {
  return useQuery(['doc', docId], () => getDocById(docId))
}
