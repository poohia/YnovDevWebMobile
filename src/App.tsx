import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { App as AppCapacitor, URLOpenListenerEvent } from "@capacitor/app";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/listTopTheme.css";
import { CreateTop, Home, ViewTop, Connection } from "./pages";
import { Menu } from "./components";
import { useFirebaseLogin } from "./hooks";

const firebaseConfig = {
  apiKey: "AIzaSyC5nvukw5s-d99p9vez41QGI4g4ANJNpXc",
  authDomain: "cours-ynov-175ee.firebaseapp.com",
  databaseURL: "https://cours-ynov-175ee-default-rtdb.firebaseio.com",
  projectId: "cours-ynov-175ee",
  storageBucket: "cours-ynov-175ee.appspot.com",
  messagingSenderId: "270306187044",
  appId: "1:270306187044:web:42a5bfb711095d1ec945b1",
};

const App: React.FC = () => {
  const { user, checkAuth } = useFirebaseLogin();

  useEffect(() => {
    AppCapacitor.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
      // Example url: https://cours-ynov-175ee.web.app/123456
      // slug = /123456
      const slug = event.url.split(".app").pop();
      alert(slug?.replace("/", ""));
      // If no match, do nothing - let regular routing
      // logic take over
    });
  }, []);

  useEffect(() => {
    initializeApp(firebaseConfig);
    checkAuth();
  }, [checkAuth]);
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route
              path="/"
              exact
              render={(_props) =>
                user ? <Home /> : <Connection user={user} />
              }
            />
            <Route path="/create" exact component={CreateTop} />
            <Route path="/view/:id" exact component={ViewTop} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
