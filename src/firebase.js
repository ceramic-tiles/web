import firebase from 'firebase'
// Required for side-effects
require('firebase/firestore')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
})

const db = firebase.firestore()

export default db
