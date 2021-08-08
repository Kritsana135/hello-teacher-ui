import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./screens/Landing";
import Phan from "./screens/Phan";
import Video1 from "./screens/Video1";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/tray" component={Phan} />
        <Route path="/video1" component={Video1} />
      </Switch>
    </Router>
  );
}

export default App;
