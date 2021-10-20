import { StatusBar } from 'expo-status-bar';
import { Container, Content, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KET = '75a05decea97f4ef343d85e3c08246fa'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?'


export default function App(props) {

    const [errorMsg, setErrorMsg] = useState(null);
    const [currentWeather, setCurrentweather] = useState(null)
    const [unitSystem, setUnitSystem] = useState("metric")

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
            //console.log('Latitude :' + latitude + " Longitude " + longitude)
            const weatherURL = `${BASE_WEATHER_URL}q=${props.city}&units=${unitSystem}&appid=${WEATHER_API_KET}`

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
            list: [{
                main: { temp },
                dt_txt,
                weather: [{ icon }]
            }]
        } = currentWeather;
        return (
            <View style={{ ...styles.card }}>
                <View style={{ ...styles.hourCont }}>
                    <Text style={{ display: 'none' }}>{str = currentWeather.list[0].dt_txt}</Text>
                    <Text style={{ ...styles.text }}>{str.substring(11, 16)}</Text>
                    <Image
                        style={{ height: 70, width: 70 }}
                        source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.list[0].weather[0].icon}@4x.png` }}
                    />
                    <Text style={{ ...styles.text }}>{Math.ceil(currentWeather.list[0].main.temp)}&deg;</Text>
                </View>
                <View style={{ ...styles.hourCont }}>
                    <Text style={{ display: 'none' }}>{str = currentWeather.list[1].dt_txt}</Text>
                    <Text style={{ ...styles.text }}>{str.substring(11, 16)}</Text>
                    <Image
                        style={{ height: 70, width: 70 }}
                        source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.list[1].weather[0].icon}@4x.png` }}
                    />
                    <Text style={{ ...styles.text }}>{Math.ceil(currentWeather.list[1].main.temp)}&deg;</Text>
                </View>
                <View style={{ ...styles.hourCont }}>
                    <Text style={{ display: 'none' }}>{str = currentWeather.list[2].dt_txt}</Text>
                    <Text style={{ ...styles.text }}>{str.substring(11, 16)}</Text>
                    <Image
                        style={{ height: 70, width: 70 }}
                        source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.list[2].weather[0].icon}@4x.png` }}
                    />
                    <Text style={{ ...styles.text }}>{Math.ceil(currentWeather.list[2].main.temp)}&deg;</Text>
                </View>
                <View style={{ ...styles.hourCont }}>
                    <Text style={{ display: 'none' }}>{str = currentWeather.list[3].dt_txt}</Text>
                    <Text style={{ ...styles.text }}>{str.substring(11, 16)}</Text>
                    <Image
                        style={{ height: 70, width: 70 }}
                        source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.list[3].weather[0].icon}@4x.png` }}
                    />
                    <Text style={{ ...styles.text }}>{Math.ceil(currentWeather.list[3].main.temp)}&deg;</Text>
                </View>
                <View style={{ ...styles.hourCont }}>
                    <Text style={{ display: 'none' }}>{str = currentWeather.list[4].dt_txt}</Text>
                    <Text style={{ ...styles.text }}>{str.substring(11, 16)}</Text>
                    <Image
                        style={{ height: 70, width: 70 }}
                        source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.list[4].weather[0].icon}@4x.png` }}
                    />
                    <Text style={{ ...styles.text }}>{Math.ceil(currentWeather.list[4].main.temp)}&deg;</Text>
                </View>
            </View>
        );
    } else {
        return (
            <View>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderColor: '#fff',
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 20,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flex: 1,
        borderColor: '#fff',
        borderRightWidth: 1,
        alignItems: 'center'

    },
    hourCont: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
});
