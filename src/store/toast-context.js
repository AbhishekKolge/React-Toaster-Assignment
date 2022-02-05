import { createContext, useReducer, useEffect, useState } from 'react';

const ToastContext = createContext({
  toasts: [],
  topToasts: [],
  idVariant: 1,
  addToastHandler: () => {},
  deleteToastHandler: () => {},
  deleteToastListHandler: () => {},
  changeToastTextHandler: () => {},
  clearNotificationHandler: () => {},
});

const defaultCartState = {
  toastList: [],
  idVariant: 1,
};

const toastReducer = (state, action) => {
  if (action.type === 'ADD_TOAST') {
    let toastText = '';
    action.text ? (toastText = action.text) : (toastText = 'Testing');
    const toastId = state.idVariant;
    const item = {
      text: toastText,
      id: toastId,
    };
    return {
      toastList: [item, ...state.toastList],
      idVariant: state.idVariant + 1,
    };
  }
  if (action.type === 'DELETE_TOAST') {
    const updatedList = state.toastList.filter((toast) => {
      return toast.id !== action.id;
    });
    return {
      toastList: updatedList,
      idVariant: state.idVariant,
    };
  }
  if (action.type === 'CHANGE_TEXT') {
    let updatedList = state.toastList;
    const item = state.toastList[0];
    if (item) {
      item.text = action.text;
      updatedList = [item];
    }
    return {
      toastList: updatedList,
      idVariant: state.idVariant,
    };
  }

  if (action.type === 'CLEAR_NOTIFICATIONS') {
    return defaultCartState;
  }
  return defaultCartState;
};

export const ToastContextProvider = (props) => {
  const [toastState, dispatchToastAction] = useReducer(
    toastReducer,
    defaultCartState
  );
  const [topToasts, setTopToasts] = useState([]);
  const addToastHandler = (text) => {
    dispatchToastAction({ type: 'ADD_TOAST', text });
  };

  const deleteToastHandler = (id) => {
    dispatchToastAction({ type: 'DELETE_TOAST', id });
  };

  const changeToastTextHandler = (text) => {
    dispatchToastAction({ type: 'CHANGE_TEXT', text });
  };

  const clearNotificationHandler = () => {
    dispatchToastAction({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const deleteToastListHandler = (id) => {
    const updatedList = topToasts.filter((toast) => {
      return toast.id !== id;
    });
    setTopToasts(updatedList);
  };

  useEffect(() => {
    const el = toastState.toastList.slice(
      Math.max(toastState.toastList.length - 3, 0)
    );
    setTopToasts(el);
  }, [toastState.toastList]);
  return (
    <ToastContext.Provider
      value={{
        toasts: toastState.toastList,
        idVariant: toastState.idVariant,
        topToasts,
        addToastHandler,
        deleteToastHandler,
        deleteToastListHandler,
        changeToastTextHandler,
        clearNotificationHandler,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
