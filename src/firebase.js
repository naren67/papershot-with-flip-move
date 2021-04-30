import firebase from 'firebase'

const firebaseConfig = {
          apiKey: "AIzaSyD5ynxA3DElfl8qyKQJv17MvVcKpmnu5aw",
          authDomain: "paper-shot.firebaseapp.com",
          projectId: "paper-shot",
          storageBucket: "paper-shot.appspot.com",
          messagingSenderId: "29244363528",
          appId: "1:29244363528:web:a3f70af01f4cc8472012bd",
          measurementId: "G-0WKLBQ2Y9C"
        };

        const firebaseApp = firebase.initializeApp(firebaseConfig)

        const db = firebase.firestore()
        const auth = firebase.auth()
        const provider = new firebase.auth.GoogleAuthProvider()

        export {auth, provider}
        export default db