import { createContext, createSignal, onMount, type Component } from 'solid-js';
import { Destination } from "./pages/Destination"
import styles from './App.module.css';
import { AppContextProvider } from './AppContext';

const App: Component = () => {
  return (
    <AppContextProvider>
      <div class={styles.App}>
        <header class={styles.mainBody}>
          <Destination />
        </header>
      </div>
    </AppContextProvider>
  );
};

export default App;
