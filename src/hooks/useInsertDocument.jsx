import { db } from "../firebase/config";
import { useEffect, useReducer, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "INSERTED_DOC":
      return { loading: false, error: null };

    case "LOADING":
      return { loading: true, error: null };

    case "ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const navigate = useNavigate();
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const insertedDocument = await addDoc(collection(db, docCollection), newDocument);

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });

      navigate("/dashboard");
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

  return { insertDocument, response };
};
