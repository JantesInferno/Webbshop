import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const apiUrl = import.meta.env.VITE_REACT_APP_DB_URL;
    
    const [currentUser, setCurrentUser] = useState(null);


    const createUserAccount = async (name, username, email, password, address, city) => {

      const url = `${apiUrl}/api/user/register`;

      const result = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
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
          return 200;
        else
          return response.status;
      })
      .catch(error => {
        console.log(error);
        return 500;
      });

      return result;
    }
    
    const signInUser = async (username, password) => {

      const url = `${apiUrl}/api/user/login`;

      const result = await fetch(url, {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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

      setCurrentUser(result);

      return result.username ? 200 : result;
    }

    const signOutUser = async () => {

      const url = `${apiUrl}/api/user/logout`;

      setCurrentUser(null);

      await fetch(url, {
        method: "POST",
        credentials: 'include',
      })
      .then(response => {
        if (response.ok)
          console.log(response.json());
        else
          console.log(response.status);
      })
      .catch(error => {
        console.log(500);
      });
    }

    return (
        <AuthContext.Provider value={{ currentUser, createUserAccount, signInUser, signOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
