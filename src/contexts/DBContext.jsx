import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { AppContext } from './AppContext';

export const DBContext = createContext();

import { 
    getFirestore, 
    collection, 
    onSnapshot, 
    query, 
    where,
    addDoc,
    serverTimestamp,
  } from "firebase/firestore";
  
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signOut,
    signInWithEmailAndPassword,
    updateProfile
  } from 'firebase/auth'

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY ,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_APP_ID
  };
  
  initializeApp(firebaseConfig);

  const db = getFirestore(); 
   
  const auth = getAuth();

export const DBContextProvider = ({children}) => {
    
    const setCart = useContext(AppContext);
  
    const [data, setData] = useState([]);
    const [productsAutocomplete, setProductsAutocomplete] = useState([]);
    const [searchTitle, setSearchTitle] = useState("Visar alla produkter");
    const [currentUser, setCurrentUser] = useState();

    const navigate = useNavigate();

    const onAppLoad = () => {
        onSnapshot(collection(db, 'products'), (snapshot) => {
            const products = [];
            snapshot.docs.map((doc) => {
                products.push({ ...doc.data(), id: doc.id});
            })
            const productsTitleId= [];
            products.map(product => {
                productsTitleId.push({ title: product.title, id: product.id });
            })
            setData(products);
            setProductsAutocomplete(productsTitleId);
        })
    }

    const createUserAccount = async (email, password, firstname, lastname) => {
        try {
          await createUserWithEmailAndPassword(auth, email, password)
          .catch((err) =>
            console.log(err)
          );
          await updateProfile(auth.currentUser, { displayName: `${firstname} ${lastname}` })
          .catch(
            (err) => console.log(err)
          );
        } catch (err) {
          console.log(err);
        }
      }
    
      const signInUser = async (email, password) => {
        let error;
        await signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('user logged in:', cred.user)
        })
        .catch((err) => {
          console.log(err.message)
          error = err.message;
        })
        return error;
      }

      const signOutUser = () => {
        signOut(auth).then(() => {
          console.log('user signed out')
         })
         .catch((err) => {
           console.log(err.message)
         })
      }
    
      const createOrder = (cart) => {
    
        const sum = cart.reduce((n, {price, quantity}) => n + (price * quantity), 0);
        console.log(cart);
        console.log(sum);
    
        addDoc(collection(db, 'orders'), {
          created: serverTimestamp(),
          products: cart,
          sum: sum,
          customerid: currentUser.uid,
          customeremail: currentUser.email,
          customername: currentUser.displayName
        })
        .then(() => {
          alert('Beställning lagd')
          setCart([]);
        })
    }

    const searchProducts = (input) => {
        const q = query(
          collection(db, 'products'),
          where('searchterm', '>=', input.toLowerCase()),
          where('searchterm', '<=', input.toLowerCase() + '\uf8ff')
        )
    
        onSnapshot(q, (snapshot) => {
          const products = [];
          snapshot.docs.map((doc) => {
            products.push({ ...doc.data(), id: doc.id})
          })
          setSearchTitle(`Visar ${products.length} resultat för '${input}':`);
          setData(products);
        });
    }

    const getCategoryProducts = (category) => {
      setData([]);
  
      const q = query(collection(db, 'products'), where("category", "==", category))
  
      onSnapshot(q, (snapshot) => {
        const products = [];
        snapshot.docs.map((doc) => {
          products.push({ ...doc.data(), id: doc.id})
        })
        setSearchTitle(`${category}`);
        setData(products);
      });
      navigate(`${category}/`);
    }
    
  
    return (
        <DBContext.Provider value={{ 
            onAppLoad,
            data, setData,
            productsAutocomplete, setProductsAutocomplete,
            searchTitle, setSearchTitle,
            currentUser, setCurrentUser,
            createUserAccount,
            signInUser, signOutUser,
            getCategoryProducts, 
            searchProducts,
            createOrder
          }}>
        {children}
      </DBContext.Provider>
    )
  }