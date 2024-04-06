import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const apiUrl = import.meta.env.VITE_REACT_APP_DB_URL;
    
    const [currentUser, setCurrentUser] = useState(null);


    const createUserAccount = async (name, username, email, password, address, city) => {

      const url = `${apiUrl}/api/register`;

      await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          "name": name, 
          "username": username,
          "email": email,
          "password": password,
          "address": address,
          "city": city
        })
      })
      .then(response => {
        if (response.ok)
          console.log(response.json());
        else
          console.log(response.status);
      })
      .catch(error => {
        console.log(error);
      });
    }
    
    const signInUser = async (username, password) => {

      const url = `${apiUrl}/api/login`;

      const result = await fetch(url, {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password}),
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

      setCurrentUser(result.user);

      const now = new Date()

      const token = {
        value: result.token,
        expiry: now.getTime() + 600000,
      }

      sessionStorage.setItem('token', JSON.stringify(token))
      sessionStorage.setItem('user', result.user);

      return result.token ? 200 : result;
    }

    const signOutUser = () => {
      setCurrentUser(null);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ currentUser, createUserAccount, signInUser, signOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}