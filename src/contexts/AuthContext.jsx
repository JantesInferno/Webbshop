import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
    
        onAuthStateChanged(firebaseAuth, (user) => {
          setCurrentUser(user);
        })
        
    }, []);

    const createUserAccount = async (email, password, firstname, lastname) => {
        try {
          await createUserWithEmailAndPassword(firebaseAuth, email, password)
          .catch((err) =>
            console.log(err)
          );
          await updateProfile(firebaseAuth.currentUser, { displayName: `${firstname} ${lastname}` })
          .catch(
            (err) => console.log(err)
          );
        } catch (err) {
          console.log(err);
        }
    }
    
    const signInUser = async (email, password) => {
        let error;
        await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(() => {
            console.log('user logged in')
        })
        .catch((err) => {
            console.log(err.message)
            error = err.message;
        })
        return error;
    }

    const signOutUser = () => {
        signOut(firebaseAuth).then(() => {
            console.log('user signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <AuthContext.Provider value={{ currentUser, createUserAccount, signInUser, signOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}