import React, { useState } from 'react';
import Routes from './src/routes';
import { UserProvider } from './src/ContextManager/ContextProvider';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserProvider
      value={{
        email: email,
        userId: userId,
        setUserId: setUserId,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        setEmail: setEmail,
      }}
    >
      <Routes />
    </UserProvider>
  );
};

export default App;
