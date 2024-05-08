import { db } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const contactModel = {
  
    create: async function (contactItem) {
      try {
        const docRef = await addDoc(collection(db, 'contact'), contactItem);
        return docRef.id;
      } catch (error) {
        console.error(error);
      }
    }
};

export default contactModel;
