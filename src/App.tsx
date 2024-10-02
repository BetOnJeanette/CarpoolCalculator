import { createSignal, Component, onMount, lazy, JSX, ValidComponent } from 'solid-js';
import { Destination } from "./pages/Destination/Destination"
import styles from './App.module.css';
import { AppContextProvider } from './AppContext';
import { SelectableLocation } from './classes/Location';
import { Group } from './classes/Group';
import { Dynamic } from 'solid-js/web';
import { Car } from './classes/Car';
import CarsPage from './pages/Cars/carsPage';
import RequestSent from './pages/RequestSent/RequestSent';

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
  let groups: Group[] = [];
  let cars: Car[] = [];

  function updateDestination(newDest: SelectableLocation){
    destination = newDest;
    setState(States.Groups)
  }

  function updateGroups(newGroups: Group[]){
    groups = newGroups
    setState(States.Cars);
  }

  function updateCars(newCars: Car[]) {
    cars = newCars;
    setState(States.Calculating)
  }

  function GoBack(){
    setState(state() - 1)
  }

  const StateMap = new Map<States, () => JSX.Element>()
  StateMap.set(States.Destination, defaultState)
  
  onMount(() => {
    StateMap.set(States.Groups, () => GroupsPage({onBack: GoBack, onSubmit: updateGroups, existingGroups: groups}));
    StateMap.set(States.Cars, () => CarsPage({onSubmit: updateCars, availableGroups: groups, onBack: GoBack, existingCars: cars}))
    StateMap.set(States.Calculating, () => RequestSent({groups: groups, cars: cars, dest: destination}))
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
