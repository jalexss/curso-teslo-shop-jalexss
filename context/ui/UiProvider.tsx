import { FC, useReducer, ReactNode } from 'react';
import { UiContext, uiReducer } from './'

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
}

export interface Props {
  children?: ReactNode;
}

export const UiProvider:FC<Props> = ({ children }) => {
  
  const [ state, dispatch ] = useReducer( uiReducer, UI_INITIAL_STATE );

  const toogleSideMenu = () => {

    dispatch({ type: '[UI] - ToggleMenu'});
  }

  return (
    <UiContext.Provider 
      value={{
        ...state,

        //methods
        toogleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  )
};