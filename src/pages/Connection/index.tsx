import { isPlatform } from "@ionic/core";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { User } from "firebase/auth";
import { logoGoogle } from "ionicons/icons";
import { useState } from "react";
import { useFirebaseLogin } from "../../hooks";

type ConnectionProps = {
  user?: User | null;
};

const Connection = (props: ConnectionProps) => {
  const { connectionWithEmailPassword } = useFirebaseLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user } = props;

  if (typeof user === "undefined") {
    if (isPlatform("capacitor")) {
      // SplashScreen.hide();
    }
    return (
      <IonPage>
        <IonContent>
          Chargement <IonSpinner name="bubbles" />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="connectionPage">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  autocomplete="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Mot de passe</IonLabel>
                <IonInput
                  type="password"
                  autocomplete="current-password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonButton
                color="primary"
                type="submit"
                expand="full"
                onClick={() => {
                  connectionWithEmailPassword(email, password);
                }}
              >
                Enregistrer
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Connection;
