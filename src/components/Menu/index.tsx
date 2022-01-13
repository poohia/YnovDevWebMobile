import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  add,
  archiveOutline,
  archiveSharp,
  heartOutline,
  heartSharp,
  list,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useFirebaseLogin } from "../../hooks";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Liste",
    url: "/",
    iosIcon: list,
    mdIcon: list,
  },
  {
    title: "Créer un top",
    url: "/create",
    iosIcon: add,
    mdIcon: add,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const { loggout } = useFirebaseLogin();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Liste des top</IonListHeader>
          <IonNote>jazoulay@joazco.com</IonNote>
          <IonButton
            color="danger"
            onClick={() => {
              loggout();
            }}
          >
            Déconnexion
          </IonButton>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
