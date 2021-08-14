import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Certificate from "./screens/Certificate";
import Greeting from "./screens/Greeting";
import Ingredient from "./screens/Ingredient";
import Landing from "./screens/Landing";
import Phan from "./screens/Phan";
import Video1 from "./screens/Video1";
import Video2 from "./screens/Video2";

export const path = {
  landing: "/",
  ingredient: "/ingredient",
  phan: "/tray",
  video1: "/video1",
  video2: "/video2",
  greeting: "/greeting",
  certificate: "/certificate",
};

export enum PHAN_TYPE {
  BEAUTY,
  CREATIVE,
}
export interface IForm {
  studentId: string;
  firstName: string;
  lastName: string;
  greetingText: string;
  phanName: string;
  phanType: string;
  nameTitle: string;
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
    phanName: "",
    phanType: "",
    nameTitle: "",
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
        <Route path={path.phan}>
          <Phan setForm={setForm} form={form} />
        </Route>
        <Route path={path.video1}>
          <Video1 step={step} setStep={setStep} />
        </Route>
        <Route path={path.video2}>
          <Video2 step={step} setStep={setStep} />
        </Route>
        <Route path={path.greeting}>
          <Greeting />
        </Route>
        <Route path={path.certificate}>
          <Certificate />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
