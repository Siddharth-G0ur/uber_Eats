import  firebase  from 'firebase/compat'; // modified import statement

const firebaseConfig = {

  apiKey: "AIzaSyCiD2sz2Edd_f3ZqpdWSd33OnpEh_pEkpE",

  authDomain: "ubereats-345908.firebaseapp.com",

  projectId: "ubereats-345908",

  storageBucket: "ubereats-345908.appspot.com",

  messagingSenderId: "57276357964",

  appId: "1:57276357964:web:d6f2650e96a25bec1c43e9"

};


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;