import { createSignal, Component, onMount, lazy, JSX, ValidComponent } from 'solid-js';
import { Destination } from "./pages/Destination/Destination"
import styles from './App.module.css';
import { AppContextProvider } from './AppContext';
import { SelectableLocation } from './classes/Location';
import { Group } from './classes/Group';
import { Dynamic } from 'solid-js/web';

const GroupsPage = lazy(async () => await import("./pages/Groups/Groups"))

enum States {
  Destination,
  Groups,
  Cars,
  Calculating,
  Route
}

const App: Component = () => {
  const [state, setState] = createSignal<States>(States.Destination)
  const defaultState = () => Destination({onSubmitDest: updateDestination, currentDest: destination});

  let destination: SelectableLocation;
  let groups: Group[];
  
  function updateDestination(newDest: SelectableLocation){
    destination = newDest;
    setState(States.Groups)
  }

  function updateGroups(newGroups: Group[]){
    groups = newGroups
  }

  function GoBack(){
    setState(state() - 1)
  }

  const StateMap = new Map<States, () => JSX.Element>()
  StateMap.set(States.Destination, defaultState)
  
  onMount(() => {
    States.Groups, StateMap.set(States.Groups, () => GroupsPage({BackUp: GoBack, UpdateGroups: updateGroups, groups: groups}));
  })

  return (
    <AppContextProvider>
      <div class={styles.App}>
        <main class={styles.mainBody}>
          <Dynamic component={StateMap.get(state()) as ValidComponent || defaultState as ValidComponent}></Dynamic>
        </main>
      </div>
    </AppContextProvider>
  );
};

export default App;
