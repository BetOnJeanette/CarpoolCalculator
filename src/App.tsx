import { createContext, createSignal, onMount, type Component } from 'solid-js';
import { Destination } from "./pages/Destination"

import logo from './logo.svg';
import styles from './App.module.css';
import { AppContextProvider } from './AppContext';

const App: Component = () => {
  return (
    <AppContextProvider>
      <div class={styles.App}>
        <header class={styles.header}>
          <Destination />
        </header>
      </div>
    </AppContextProvider>
  );
};

export default App;
