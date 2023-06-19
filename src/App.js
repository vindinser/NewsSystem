import "./App.scss";
import { useEffect } from "react";
import axios from "axios";

function App() {

  useEffect(() => {
    axios.get("/api/mmdb/movie/v3/list/hot.json?ct=%E4%B8%89%E6%B2%B3&ci=538&channelId=4").then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      app
    </div>
  );
}

export default App;
