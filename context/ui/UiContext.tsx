import { createContext } from 'react';

interface ContextProps {
  isMenuOpen: boolean;

  //Methods
  toogleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
