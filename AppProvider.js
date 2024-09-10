// AppContext.js
import React, { useState, createContext } from 'react';

// Create a context with default values
// const MyContext = createContext({
//   userData: { fullName: '' ,email:''},
//   setUserData: (e) => {}
// });

const MyContext=createContext()

export const AppProvider = ({ children }) => {
  // State to manage user data
  const [userData, setUserData] = useState({ fullName: '',email:'' });

  return (
    <MyContext.Provider value={{ userData, setUserData }}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext};
