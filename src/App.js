import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Establishment from "./components/Establishment";
import NearstCannabisStores from './components/NearstCannabisStores';

import EstablishmentService from "./services/establishment_service";

// this is a test

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  const markerImg = require("./images/meu-local.png");
  const markerImg2 = require("./images/marijuanaaa.png");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Para usar o App ative a sua localizaçao em Ajustes.");
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    })();

    loadCannabisStores();
  }, []);

  async function loadCannabisStores() {
    try {
      const response = await EstablishmentService.index(latitude, longitude);
      setLocations(response.data.results);
    } catch (error) {
      setLocations([]);
    }
  }

  return (
    <View style={styles.container}>
    <NearstCannabisStores latitude={latitude} longitude={longitude} />
      {(selected) && <Establishment place={selected} />}
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          //map distance on the screen
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        <Marker
          title="Seu Local"
          // pinColor = {"blue"}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          image={markerImg}
        ></Marker>
        {locations.map((item) => {
          return (
            <Marker
              key={item.place_id}
              title={item.name}
              coordinate={{
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
              }}
              onPress={() => setSelected(item)}
              image={markerImg2}
            ></Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

export default App;
