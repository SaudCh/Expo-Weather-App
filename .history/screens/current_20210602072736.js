import { StatusBar } from 'expo-status-bar';
import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

import FiveDays from './fivedays'


const windowHeight = Dimensions.get('window').height;

const WEATHER_API_KET = '75a05decea97f4ef343d85e3c08246fa'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'



export default function App() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [lon, setLon] = useState()
    const [lat, setLat] = useState()
    const [currentWeather, setCurrentweather] = useState(null)
    const [unitSystem, setUnitSystem] = useState("metric")

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date

    useEffect(() => {
        load()
    }, [])

    async function load() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});


            const { latitude, longitude } = location.coords
            setLat(latitude)
            setLon(longitude)
            //console.log('Latitude :' + latitude + " Longitude " + longitude)
            const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KET}`

            const response = await fetch(weatherURL)
            const result = await response.json()

            if (response.ok) {
                setCurrentweather(result)
                //console.log(result)
                //console.log(currentWeather)
            } else {
                setErrorMsg(result.message)
            }

        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    if (currentWeather) {
        const {
            name,
            sys: { country },
            weather: [{ id, main, icon }],
            main: { temp }

        } = currentWeather
        //const { all } = clouds
        //const [{ icon, main }] = weather

        //const { icon } = details
        const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`

        return (
            <Container style={{}}>
                <StatusBar style='light' />
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgb(101, 78, 163)', 'rgb(234, 175, 200)']}
                    style={styles.background}
                />
                <View style={{ paddingTop: 36 }}>
                    <View style={{ height: 20 }}></View>
                    <Text style={{ ...styles.date }}>{days[date.getDay()]},{date.getDate()} {months[date.getMonth()]}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff' }}>{name},</Text>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff' }}>{country}</Text>
                        <Text>{ }</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ height: 160, width: 160 }}
                            source={{ uri: iconURL }}
                        />
                        <Text style={{ ...styles.main }}>{main}</Text>
                        <Text style={{ ...styles.temperature }}>{Math.ceil(temp)}&deg;</Text>
                    </View>
                </View>
                <View style={{ height: 50 }}></View>
                <FiveDays longitude={lon} latitude={lat} />


            </Container>
        );
    } else {
        return (
            <Container style={{}}>
                <StatusBar style='light' />
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgb(101, 78, 163)', 'rgb(234, 175, 200)']}
                    style={styles.background}
                />
                <View style={{ paddingTop: 36 }}>
                    <Text style={{ fontSize: 32 }}>{errorMsg}</Text>
                </View>


            </Container>
        )
    }

}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '110%',
    },
    date: {
        alignSelf: 'center',
        fontFamily: 'Roboto-Thin',
        fontSize: 30,
        color: '#fff',

    },
    main: {
        fontFamily: 'Roboto-Thin',
        fontSize: 35,
        color: '#fff',
    },
    temperature: {
        fontFamily: 'Roboto-Thin',
        fontSize: 100,
        color: '#fff',
    }
});
