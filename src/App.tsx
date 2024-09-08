import { createContext, createSignal, onMount, type Component } from 'solid-js';
import { Destination } from "./pages/Destination"
import styles from './App.module.css';
import { AppContextProvider } from './AppContext';
import { FeatureResponse } from './classes/FeatureResponse';

const App: Component = () => {

  const [destination, setDestination] = createSignal<FeatureResponse>();
  
  function updateDestination(newDest: FeatureResponse) {
    setDestination(newDest);
  }

  return (
    <AppContextProvider>
      <div class={styles.App}>
        <header class={styles.mainBody}>
          <Destination onSubmitDest={updateDestination}/>
        </header>
      </div>
    </AppContextProvider>
  );
};

export default App;
