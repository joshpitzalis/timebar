import { useEffect, useState } from 'react';
import { collection, doc } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from '../utils/firebase';

export const useFireColl = ref => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const tasks$ = collection(firestore.collection(ref))
      .pipe(map(docs => docs.map(doc => doc.data())))
      .subscribe(tasks => setItems(tasks));
    return () => tasks$.unsubscribe();
  }, [ref]);

  return items;
};

export const useFireDoc = ref => {
  const [items, setItems] = useState({});

  useEffect(() => {
    const tasks$ = doc(firestore.doc(ref))
      .pipe(map(doc => doc.data()))
      .subscribe(tasks => setItems(tasks));
    return () => tasks$.unsubscribe();
  }, [ref]);

  return items;
};
