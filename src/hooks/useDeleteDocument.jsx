import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

// Estado inicial
const initialState = {
  loading: null,
  error: null,
};

// Reducer
const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Hook principal
export const useDeleteDocument = () => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (collectionName, id) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);

      checkCancelBeforeDispatch({ type: "DELETED_DOC" });
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

  return { deleteDocument, response };
};
