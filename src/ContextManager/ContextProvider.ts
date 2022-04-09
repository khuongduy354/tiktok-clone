import React from 'react';
type ContextType = {
  email: string;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};
const UserContext = React.createContext<ContextType>({
  email: '',
  userId: -1,
  setUserId: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setEmail: () => {},
});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
