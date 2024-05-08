import { db } from '../firebase.js';
import { collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore';

const orderModel = {
    getAll: async function () {
      try {
        const querySnapshot = await getDocs(collection(db, 'order'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  
    create: async function (order) {
      try {
        const docRef = await addDoc(collection(db, 'order'), order);
        return docRef.id;
      } catch (error) {
        console.error(error);
      }
    },
  
    getOne: async function (orderId) {
      try {
        const docSnapshot = await getDoc(doc(db, 'order', orderId));
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
          console.error('No such document!');
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    }
};

export default orderModel;
