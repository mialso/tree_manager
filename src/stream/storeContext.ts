import { createContext } from 'react';
import { createStore } from 'redux';

const store = createStore((state) => (state), {})

export const StoreContext = createContext(store)
