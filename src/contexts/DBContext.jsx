import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import firebaseApp from '../firebase/firebase';

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

const db = getFirestore(); 

export const DBContextProvider = ({children}) => {
    
    const setCart = useContext(CartContext);
  
    const [data, setData] = useState([]);
    const [productsAutocomplete, setProductsAutocomplete] = useState([]);
    const [searchTitle, setSearchTitle] = useState("Visar alla produkter");

    const navigate = useNavigate();

    useEffect(() => {
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
    }, [])

    
    const createOrder = (cart, user) => {
  
      const sum = cart.reduce((n, {price, quantity}) => n + (price * quantity), 0);
      console.log(cart);
      console.log(sum);
  
      addDoc(collection(db, 'orders'), {
        created: serverTimestamp(),
        products: cart,
        sum: sum,
        customerid: user.uid,
        customeremail: user.email,
        customername: user.displayName
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

    const getCategoryProducts = (category, path) => {
      setData([]);
      console.log(data);
      const q = query(collection(db, 'products'), where("category", "==", category))
  
      onSnapshot(q, (snapshot) => {
        const products = [];
        snapshot.docs.map((doc) => {
          products.push({ ...doc.data(), id: doc.id})
        })
        setSearchTitle(`${category}`);
        setData(products);
      });
      navigate(`${path}/`);
    }
    
  
    return (
        <DBContext.Provider value={{ 
            data, setData,
            productsAutocomplete, setProductsAutocomplete,
            searchTitle, setSearchTitle,
            getCategoryProducts, 
            searchProducts,
            createOrder
          }}>
        {children}
      </DBContext.Provider>
    )
  }