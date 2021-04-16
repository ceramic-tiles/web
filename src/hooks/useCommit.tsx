import { useQuery } from 'react-query'
import DocID from "@ceramicnetwork/docid";
import { ceramic } from '../App'

const getCommitById = async (docId: any) => {
  const doc = await ceramic.loadDocument(docId).then((res) => res)
  return doc
}

export default function useCommit(docId: string, commitId: string) {
  const fetchDoc = DocID.fromOther(DocID.fromString(docId), commitId)
  return useQuery(['doc', docId, commitId], () => getCommitById(fetchDoc))
}
