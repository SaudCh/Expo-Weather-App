import { StatusBar } from "expo-status-bar";
import { Button, Container, Icon } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";

import Hours from "./3hours";

const windowHeight = Dimensions.get("window").height;

const WEATHER_API_KET = "7bbc635080914f5c8b0f463804331d46";
const BASE_WEATHER_URL = "https://api.weatherbit.io/v2.0/current?";

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentWeather, setCurrentweather] = useState(null);
  //const [unitSystem, setUnitSystem] = useState("metric")

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var date = new Date();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;
      //console.log('Latitude :' + latitude + " Longitude " + longitude)
      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KET}`;

      const response = await fetch(weatherURL);
      const result = await response.json();

      if (response.ok) {
        setCurrentweather(result);
        //console.log(result);
        //console.log(currentWeather);
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  if (currentWeather) {
    const {
      data: [
        { city_name, country_code, wind_spd, pres, dewpt, rh },
      ],
    } = currentWeather;

    return (
      <Container style={{}}>
        <StatusBar style="light" />
        <LinearGradient
          // Background Linear Gradient
          colors={["rgb(234, 175, 200)", "rgb(101, 78, 163)"]}
          style={styles.background}
        />
        <View style={{ paddingTop: 36 }}>
          <View style={{ height: 10 }}></View>
          <Text style={{ ...styles.date }}>
            {days[date.getDay()]},{date.getDate()} {months[date.getMonth()]}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#fff" }}>
              {city_name},
            </Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#fff" }}>
              {country_code}
            </Text>
          </View>
          <View style={{ height: 20 }}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ ...styles.main }}>Wind</Text>
            <Text style={{ ...styles.main }}>{wind_spd} m/s</Text>
          </View>
          <View style={{ height: 20 }}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ ...styles.main }}>Humidity</Text>
            <Text style={{ ...styles.main }}>{rh} %</Text>
          </View>
          <View style={{ height: 20 }}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ ...styles.main }}>Atm Pressure</Text>
            <Text style={{ ...styles.main }}>{Math.ceil(pres)} mmHg</Text>
          </View>
          <View style={{ height: 20 }}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ ...styles.main }}>Water</Text>
            <Text style={{ ...styles.main }}>{Math.ceil(dewpt)} &deg;</Text>
          </View>
          <View style={{ height: 20 }}></View>
        </View>
        <View style={{ height: 110 }}></View>
        <Hours />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',position:'absolute',bottom:50,left:10 }}>
          <Button transparent>
            <Icon name="add" style={{ color: '#fff', fontSize: 40 }} />
          </Button>
          <Button transparent>
            <Icon name="settings-outline" style={{ color: '#fff', fontSize: 40 }} />
          </Button>

        </View>
      </Container>
    );
  } else {
    return (
      <Container style={{}}>
        <StatusBar style="light" />
        <LinearGradient
          // Background Linear Gradient
          colors={["rgb(101, 78, 163)", "rgb(234, 175, 200)"]}
          style={styles.background}
        />
        <View style={{ paddingTop: 36 }}>
          <Text style={{ fontSize: 32 }}>{errorMsg}</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "110%",
  },
  date: {
    alignSelf: "center",
    fontFamily: "Roboto-Thin",
    fontSize: 30,
    color: "#fff",
  },
  main: {
    fontFamily: "Roboto-Thin",
    fontSize: 30,
    color: "#fff",
  },
  temperature: {
    fontFamily: "Roboto-Thin",
    fontSize: 100,
    color: "#fff",
  },
});
