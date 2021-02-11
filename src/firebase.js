import firebase from 'firebase'
// Required for side-effects
require('firebase/firestore')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBVzrFoXDKqPPY_vAgJGISGYzBMXgOc184',
  authDomain: 'ceramic-304214.firebaseapp.com',
  projectId: 'ceramic-304214',
})

const db = firebase.firestore()

export default db
