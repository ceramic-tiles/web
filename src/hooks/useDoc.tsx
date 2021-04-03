import { useQuery } from 'react-query'
import DocID from "@ceramicnetwork/docid";
import { ceramic } from '../App'

const getDocById = async (docId: any) => {
  const doc = await ceramic.loadDocument(docId).then((res) => res)
  return doc
}

export default function useDoc(docId: string) {
  return useQuery(['doc', docId], () => getDocById(DocID.fromString(docId)))
}
