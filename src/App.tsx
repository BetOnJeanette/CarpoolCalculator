import { createSignal, Component } from 'solid-js';
import { Destination } from "./pages/Destination/Destination"
import styles from './App.module.css';
import { AppContextProvider } from './AppContext';
import { SelectableLocation } from './classes/Location';

const App: Component = () => {

  const [destination, setDestination] = createSignal<SelectableLocation>();
  
  function updateDestination(newDest: SelectableLocation) {
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
