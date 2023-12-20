import IndexRouter from "./route";
import './App.scss';
import {Provider} from "react-redux";
import { store, persistedStore } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <IndexRouter></IndexRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
