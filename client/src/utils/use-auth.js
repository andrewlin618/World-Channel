import React, { useState, useContext, createContext } from "react";
// import axios from "axios";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState({});

    const login = (username, avatar) => {
        setUser({ username: username, avatar: avatar})
    }

    // ... to save the user to state.
    // const login = async (username, password) => {
    //     await axios.post('/login', { username: username, password: password })
    //         .then(res => {
    //             console.log('logged in!')
    //             console.log(res.data)
    //             setUser(res.data)
    //         })
    //         .catch(e => {
    //             console.log('Failed to log in!')
    //             console.log(e.response.data);
    //             setError(e.response);
    //         });
    //     return;
    // };

    // const signUp = async (username, password, gender) => {
    //     await axios.post('/register', { username: username, password: password, gender: gender })
    //         .then(res => {
    //             console.log('Signed up!')
    //             console.log(res.data)
    //             setUser(res.data)
    //         })
    //         .catch(e => {
    //             console.log('Failed to sign up!')
    //             console.log(e.response.data);                
    //             setError(e.response);
    //         })
    //     return;
    // };

    // const logout = async () => {
    //     await axios.post('/logout')
    //         .then(setUser(null))
    //         .catch(e => console.log(e));
    // };

    //   const sendPasswordResetEmail = email => {
    //     return firebase
    //       .auth()
    //       .sendPasswordResetEmail(email)
    //       .then(() => {
    //         return true;
    //       });
    //   };

    //   const confirmPasswordReset = (code, password) => {
    //     return firebase
    //       .auth()
    //       .confirmPasswordReset(code, password)
    //       .then(() => {
    //         return true;
    //       });
    //   };
    // Return the user object and auth method
    // useEffect(() => {
    //     axios.post('/authentication')
    //     .then(res => {
    //         if (res.data.username) {
    //             setUser(res.data);
    //         }
    //     })
    //     .catch(e => console.log(e.response.data))
    //   }, []);

    return {
        user,
        login,
        // signUp,
        // logout
        // sendPasswordResetEmail,
        // confirmPasswordReset
    };
}