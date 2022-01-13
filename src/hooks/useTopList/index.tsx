import React, { useState, useEffect, useCallback } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useDatabase } from "..";
import { defaultList, List, Top } from "../../types";

const key = "list";

const useTopList = () => {
  const [list, setList] = useState<List>([]);
  const { setItem, getItem } = useDatabase();

  const init = () => {
    const db = getFirestore();
    getDocs(collection(db, "lists")).then((querySnapshot) => {
      const tops: Top[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          tops.push(data as Top);
        }
      });
      setList(tops);
    });
  };

  const getLists = useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        getItem<List>(key)
          .then((l) => {
            if (l && l.length > 0) {
              setList(l);
              resolve();
            } else {
              reject();
            }
          })
          .catch(reject);
      }),
    [getItem]
  );

  const pushTop = (top: Top) => {
    const db = getFirestore();
    return addDoc(collection(db, "lists"), top).then((data) => {
      // update top with id
      setDoc(doc(db, "lists", data.id), { ...top, id: data.id });
    });
  };

  const createList = (l: List) => setList(Array.from(list.concat(l)));
  const findTopByTitle = useCallback(
    (title: string) => list.find((l) => l.title === title),
    [list]
  );

  const findTopById = (id: string) => {
    const db = getFirestore();
    return getDoc(doc(db, "lists", id));
  };

  useEffect(() => {
    setItem(key, list).catch((error) => console.error(error));
  }, [list, setItem]);

  return {
    list,
    pushTop,
    createList,
    findTopByTitle,
    init,
    getLists,
    findTopById,
  };
};

export default useTopList;
