import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Ingredient from "./screens/Ingredient";
import Landing from "./screens/Landing";
import Phan from "./screens/Phan";
import Video1 from "./screens/Video1";

const path = {
  landing: "/",
  ingredient: "/ingredient",
  phan: "/tray",
  video1: "/video1",
};

export interface IForm {
  studentId: string;
  firstName: string;
  lastName: string;
  greetingText: string;
}

export interface IStep {
  watchVideo1: boolean;
  watchVideo2: boolean;
}

function App() {
  const [form, setForm] = useLocalStorage<IForm>("form", {
    studentId: "",
    firstName: "",
    lastName: "",
    greetingText: "",
  });
  const [step, setStep] = useLocalStorage<IStep>("step", {
    watchVideo1: false,
    watchVideo2: false,
  });

  return (
    <Router>
      <Switch>
        <Route exact path={path.landing}>
          <Landing setForm={setForm} form={form} />
        </Route>
        <Route path={path.ingredient} component={Ingredient} />
        <Route path={path.phan} component={Phan} />
        <Route path={path.video1}>
          <Video1 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
