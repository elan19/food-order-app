import { initializeApp } from 'firebase/app';
import { 
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAoSumOqLE8fECp8N4RF-gsr_DUXD7_fxM",
    authDomain: "food-order-98464.firebaseapp.com",
    projectId: "food-order-98464",
    storageBucket: "food-order-98464.appspot.com",
    messagingSenderId: "819735710295",
    appId: "1:819735710295:web:00f43e8a37380a85e7f112",
    measurementId: "G-95TQQ90PPT"
  };
  
  //initializeApp(firebaseConfig);

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  
  //const db = getFirestore();
  
  //const colRef = collection(db, 'food');

  // queries
  //const q = query(colRef, where("category", "==", "Burger"));
  
  /*getDocs(colRef)
    .then((snapshot) => {
    })
    .catch(err => {
      console.log(err.message);
    })*/

/*onSnapshot(colRef, (snapshot) => {
    let burgers = [];
    snapshot.docs.forEach((doc) => {
        burgers.push({ ...doc.data(), id: doc.id })
    });
    console.log(burgers);
})*/

export { firebaseApp, db };