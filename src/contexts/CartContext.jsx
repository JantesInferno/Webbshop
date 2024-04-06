import { createContext, useState, useEffect} from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({children}) => {
    
    const [cart, setCart] = useState([]);
    const [isItemDeleted, setIsItemDeleted] = useState(false);

    useEffect(() => {

      const storage = localStorage.getItem("ShoppingCart");
      if (storage !== null) {
        setCart(JSON.parse(storage));
      }
  
    }, []);
  
    useEffect(() => {
      if (cart.length > 0 || isItemDeleted) {
        localStorage.setItem('ShoppingCart', JSON.stringify(cart));
      }
    }, [cart])

    

    const addToCart = (item) => {
      const duplicates = cart.filter(product => {
        return product.productId === item.productId;
      })
      if (duplicates.length > 0) {
        item.quantity = duplicates.length + duplicates[0].quantity;
        removeFromCart(duplicates[0]);
      }
      else
        item.quantity = 1;
      setCart(prev => [...prev, item]);
    }
  
    const removeFromCart = (item) => {
      const items = cart.filter(product => {
        return product.productId !== item.productId;
      })
      setCart(items);
      setIsItemDeleted(true);
    }

    const removeItemFromQuantity = (item) => {
      if (item.quantity > 1) {
        let updatedCart = cart.map(product => 
          {
            if (product.productId == item.productId){
              return {...product, quantity: --item.quantity};
            }
            return product;
          });
          setCart(updatedCart);
      }
      else {
        removeFromCart(item);
      }
    }

    const addItemToQuantity = (item) => {
      let updatedCart = cart.map(product => 
        {
          if (product.productId == item.productId){
            return {...product, quantity: ++item.quantity};
          }
          return product;
        });
        setCart(updatedCart);
    }
    
  
    return (
        <CartContext.Provider value={{ 
            cart, setCart,
            isItemDeleted, setIsItemDeleted,
            addToCart, removeFromCart,
            addItemToQuantity, removeItemFromQuantity
          }}>
        {children}
      </CartContext.Provider>
    )
  }