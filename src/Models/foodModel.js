import { db } from '../firebase.js'; // Adjust the path as needed
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
  
    /*create: async function (menuItem) {
      try {
        const docRef = await addDoc(collection(db, 'menu'), menuItem);
        return docRef.id;
      } catch (error) {
        console.error(error);
      }
    },
  
    update: async function (menuId, menuItem) {
      try {
        await setDoc(doc(db, 'menu', menuId), menuItem);
        return 'Success';
      } catch (error) {
        console.error(error);
      }
    },
  
    delete: async function (menuId) {
      try {
        await deleteDoc(doc(db, 'menu', menuId));
        return 'Success';
      } catch (error) {
        console.error(error);
      }
    },
  
    getOne: async function (menuId) {
      try {
        const docSnapshot = await getDoc(doc(db, 'menu', menuId));
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
          console.error('No such document!');
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    },*/

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
