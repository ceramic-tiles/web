import { useQuery } from 'react-query'
import { ceramic } from '../App'

const getCommitsbyDocId = async (docId: string) => {
  const docCommits = await ceramic.loadDocumentCommits(docId).then((res) => res)
  return docCommits
}

export default function useDocCommits(docId: any) {
  return useQuery(['docCommits', docId], () => getCommitsbyDocId(docId))
}