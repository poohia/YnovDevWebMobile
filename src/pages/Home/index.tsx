import React, { useEffect } from "react";
import {
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { StatusBar } from "@ionic-native/status-bar";

import { useTopList } from "../../hooks";
import { TopItem } from "../../types";
import "./home.css";
import { arrowForward } from "ionicons/icons";

const findFirstImgFromItems = (items: TopItem[]): string | undefined =>
  items ? items.find((item) => item.img !== undefined)?.img : undefined;

const Home = () => {
  const { list, init } = useTopList();

  useIonViewDidEnter(() => {
    init();
  });

  useEffect(() => {
    StatusBar.overlaysWebView(false);
    StatusBar.styleDefault();
    StatusBar.backgroundColorByHexString("#f7f1e3");
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Liste des top</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="homePage">
        <IonList>
          <IonListHeader>Votre liste de top</IonListHeader>
          {list.map((l, i) => {
            const { title, items, id } = l;
            const img = findFirstImgFromItems(items);
            return (
              <IonItem
                key={i}
                className={`${i % 2 === 0 ? "even" : "odd"} ${
                  i + 1 === list.length ? "last" : ""
                }`}
                routerLink={`/view/${id}`}
              >
                {img && (
                  <IonAvatar>
                    <img src={img} />
                  </IonAvatar>
                )}
                <IonLabel>{title}</IonLabel>
                <IonIcon icon={arrowForward} color="black" />
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
