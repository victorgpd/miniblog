import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

// Estado inicial
const initialState = {
  loading: null,
  error: null,
};

// Reducer
const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  } 
};

// Hook principal
export const useUpdateDocument = () => {
  const [response, dispatch] = useReducer(updateReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (collectionName, id, data) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);

      checkCancelBeforeDispatch({ type: "UPDATED_DOC" });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updateDocument, response };
};
