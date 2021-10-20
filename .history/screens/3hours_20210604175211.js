import { StatusBar } from 'expo-status-bar';
import { Container, Content, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KET = '75a05decea97f4ef343d85e3c08246fa'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall?'


export default function App() {

    const [errorMsg, setErrorMsg] = useState(null);
    const [currentWeather, setCurrentweather] = useState(null)
    const [unitSystem, setUnitSystem] = useState("metric")

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    var date = new Date
    var s = 0;
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
            const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&exclude=daily,current,minutely,alerts&units=${unitSystem}&appid=${WEATHER_API_KET}`

            const response = await fetch(weatherURL)
            const result = await response.json()

            if (response.ok) {
                setCurrentweather(result)
                //console.log(result)
                console.log(currentWeather)
            } else {
                setErrorMsg(result.message)
            }

        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    /*
    const renderItem = ({ item }) => (
        <View style={{ ...styles.hourCont }}>
            <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png` }}
            />
            <Text style={{ ...styles.text }}>{Math.ceil(item.temp)}&deg;</Text>
        </View>
    );
        */
    if (currentWeather) {

        return (
            <ScrollView
                horizontal={true}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ ...styles.hourCont }}>
                        <Text style={{...styles.text}}>Now</Text>
                        <Image
                            style={{ height: 100, width: 100 }}
                            source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.hourly[0].weather[0].icon}@4x.png` }}
                        />
                        <Text style={{ ...styles.text }}>{Math.ceil(currentWeather.hourly[0].temp)}&deg;</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ ...styles.hourCont }}>
                        <Text style={{...styles.text}}>{hours[(date.getHours()+1)%24]}</Text>
                        <Image
                            style={{ height: 100, width: 100 }}
                            source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.hourly[1].weather[0].icon}@4x.png` }}
                        />
                        <Text style={{ ...styles.text }}>{Math.ceil(currentWeather.hourly[1].temp)}&deg;</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ ...styles.hourCont }}>
                        <Text style={{...styles.text}}>{hours[(date.getHours()+2)%24]}</Text>
                        <Image
                            style={{ height: 100, width: 100 }}
                            source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.hourly[2].weather[0].icon}@4x.png` }}
                        />
                        <Text style={{ ...styles.text }}>{Math.ceil(currentWeather.hourly[2].temp)}&deg;</Text>
                    </View>

                </View>
            </ScrollView>

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
