import { collection, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFetchDocument = (docCollection, search = null, id = null, uid = null) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    getDocument();
    return () => setCancelled(true);
  }, [docCollection, search, uid, id]);

  const checkIfIsCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  const getDocument = async () => {
    setLoading(true);
    setError(null);

    const collectionRef = await collection(db, docCollection);

    try {
      let q;

      if (search) {
        q = query(collectionRef, where("tags", "array-contains", search), orderBy("createdAt", "desc"));
      } else if (id) {
        // get a single document
        const docRef = doc(db, docCollection, id);

        onSnapshot(docRef, (docSnap) => {
          checkIfIsCancelled();

          if (docSnap.exists()) {
            setDocument({ id: docSnap.id, ...docSnap.data() });
          } else {
            setDocument([]);
          }

          setLoading(false);
        });

        return;
      } else if (uid) {
        q = query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"));
      } else {
        q = query(collectionRef, orderBy("createdAt", "desc"));
      }

      onSnapshot(q, (querySnapshot) => {
        checkIfIsCancelled();
        setDocument(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      });
    } catch (error) {
      checkIfIsCancelled();
      setError(error.message);
      setLoading(false);
    } finally {
      checkIfIsCancelled();
    }
  };

  return { document, loading, error };
};
