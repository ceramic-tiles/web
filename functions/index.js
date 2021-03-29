const CeramicImport = require('@ceramicnetwork/http-client')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()
db.settings({ ignoreUndefinedProperties: true })

const API_URL = 'https://gateway-clay.ceramic.network'
const ceramic = new CeramicImport.default(API_URL)

const getDocById = async (docId) => {
  const doc = await ceramic.loadDocument(docId).then((res) => res)
  return doc
}

const formatDoc = (doc, incomingDoc) => {
  const { id, timestamp } = incomingDoc
  const { doctype, metadata, signature, anchorStatus } = doc?._state

  return { id, timestamp, doctype, metadata, signature, anchorStatus }
}

exports.hydrateIncomingDocument = functions.firestore
  .document('documents/{documentId}')
  .onCreate(async (snap) => {
    const incomingDoc = snap.data()

    let doc
    try {
      doc = await getDocById(incomingDoc.id)
    } catch (error) {
      console.error(error)
    }
    const formattedDoc = formatDoc(doc, incomingDoc)

    const collectionRef = db.collection('hydratedDocuments')
    collectionRef
      .add(formattedDoc)
      .then((documentReference) => {
        console.log(`Added document with id: ${documentReference.id}`)
      })
      .catch((err) => console.error(err))
  })
