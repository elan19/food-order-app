import { db } from '../firebase.js';
import { collection, getDocs, query } from 'firebase/firestore';

const menuModel = {
    getAll: async function () {
      try {
        const querySnapshot = await getDocs(collection(db, 'food'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
      } catch (error) {
        console.error(error);
      }
    },

    getCategory: async function (category) {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'menu').where('category', '==', category)));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
      } catch (error) {
        console.error(error);
      }
    }
};

export default menuModel;
