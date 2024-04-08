import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

export const DBContext = createContext();

export const DBContextProvider = ({children}) => {
    
    const apiUrl = import.meta.env.VITE_REACT_APP_DB_URL;

    const setCart = useContext(CartContext);
  
    const [data, setData] = useState([]);
    const [productsAutocomplete, setProductsAutocomplete] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');

    const location = useLocation();

    useEffect(() => {
        getAllProducts();
    }, [])

    
    const createOrder = async (cart, user) => {


      let productDict = Object.assign({}, ...cart.map((product) => ({[product.productId]: product.quantity})));

      const token = sessionStorage.getItem('token');

      const url = `${apiUrl}/api/create-order`;

      const result = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ "productsQuantity": productDict})
      })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          return response.status;
      })
      .catch(error => {
        return 500;
      });

      return result;
    }

    const searchProducts = async (input) => {

      const url = `${apiUrl}/api/get-products-by-name/${input}`;

      const result = await fetch(url)
      .then(response => {
        if (response.ok)
          return response.json();
        else
          console.log(response.status);
      })
      .catch(error => {
        console.log(error);
      });

      setSearchTitle(`Visar ${result.length} resultat för '${input}':`);
      setData(result);

    }

    const getCategoryProducts = async (categoryId, categoryName) => {

      const url = `${apiUrl}/api/get-category-by-id/${categoryId}`;

      const result = await fetch(url)
      .then(response => {
        if (response.ok)
          return response.json();
        else
          console.log(response.status);
      })
      .catch(error => {
        console.log(error);
      });

      setSearchTitle(`${categoryName}`);
      setData(result.products);

    }

    const getAllProducts = async () => {
      const url = `${apiUrl}/api/get-all-products`;

      const products = await fetch(url)
      .then(response => {
        if (response.ok)
          return response.json();
        else
          console.log(response.status);
      })
      .catch(error => {
        console.log(error);
      });

      const productsTitleId = [];

      products.map(product => {
        productsTitleId.push({ title: product.title, id: product.productId});
      })

      setData(products);
      setSearchTitle('Visar alla produkter');
      setProductsAutocomplete(productsTitleId);

    }
    
  
    return (
        <DBContext.Provider value={{ 
            data, setData,
            productsAutocomplete, setProductsAutocomplete,
            searchTitle, setSearchTitle,
            getCategoryProducts, 
            getAllProducts,
            searchProducts,
            createOrder
          }}>
        {children}
      </DBContext.Provider>
    )
  }