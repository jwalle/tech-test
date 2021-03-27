import React, { createContext, useContext, useReducer } from "react";
import { ActionTypes } from "./actions";

type Actions<T> = {
  type: T;
  payload?: any;
  meta?: any;
};

interface IAppState {
  user: {
    token: string | null;
    userId: number | null;
  }
}

interface IAppContext {
  setUser: ({ token: string, userId: number }) => void;
}

const initialState: IAppState = {
  user: {
    token: null,
    userId: null,
  }
};

const AppContext = createContext<IAppState & IAppContext>({
  ...initialState,
  setUser: () => { },
});

export const AppReducer = (state: IAppState, action: Actions<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action?.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser: (token) =>
          setImmediate(() =>
            dispatch({ type: ActionTypes.SET_USER, payload: token })
          ),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
