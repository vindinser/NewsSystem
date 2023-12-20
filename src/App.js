import IndexRouter from "./route";
import './App.scss';
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <IndexRouter></IndexRouter>
    </Provider>
  );
}

export default App;
