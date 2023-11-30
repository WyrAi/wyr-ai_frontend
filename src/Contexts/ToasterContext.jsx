import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

const ToasterContext = createContext();

const Toast = (props) => {
  const { message, type, id } = props;
  const timerID = useRef(null); // create a Reference
  const toast = useToast();

  const handleDismiss = () => {
    toast.remove(id);
  };

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => {
      clearTimeout(timerID.current);
    };
  }, []);
  console.log(`alert alert-${type}`);
  const classname = `alert alert-${type}`;
  return (
    <div role="alert" className={classname}>
      <span>{message}</span>
    </div>
  );
};
const ToastsContainer = (props) => {
  const { toasts } = props;
  return (
    <div className="toast">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "DELETE_TOAST":
      const updatedToasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
      return {
        ...state,
        toasts: updatedToasts,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const initialState = {
  toasts: [],
};
export const ToasterContextProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type, message) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  };

  const success = (message) => {
    addToast("success", message);
  };

  const warning = (message) => {
    addToast("warning", message);
  };

  const info = (message) => {
    addToast("info", message);
  };

  const error = (message) => {
    addToast("error", message);
  };
  const remove = (id) => {
    dispatch({ type: "DELETE_TOAST", payload: id });
  };
  const value = { success, warning, info, error, remove };

  return (
    <ToasterContext.Provider value={value}>
      <ToastsContainer toasts={state.toasts} />
      {children}
    </ToasterContext.Provider>
  );
};

const useToast = () => useContext(ToasterContext);
export default useToast;
