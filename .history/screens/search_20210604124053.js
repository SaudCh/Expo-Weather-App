import { StatusBar } from 'expo-status-bar';
import { Button, Container, Content, Input, Item, Icon, Text, View, Form } from 'native-base';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(props) {
    const [city, setCity] = useState('')
    const [cityList, setCityList] = useState(initialArray)




    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        storeData(cityList)
    }, [cityList])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            var obj = JSON.parse(jsonValue)
            //console.log(jsonValue[0].key)
            setCityList(obj)
            //console.log(list)
        } catch (e) {
            // error reading value
        }
    }

    const storeData = async (value) => {
        try {
            //console.log(value)
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }



    const addCity = () => {

        if (city !== '') {

            console.log(city)
            //var cit = city.replace(" ", "")
            //console.log(cit)
            setCityList(oldArray => [...oldArray, { city: city, key: 1 }]);

            //setCityList(searches => [...searches, { city: cit, key: Math.random() * 1000000 }])
            setCity('')
            //console.log(cityList)
        }

    }
    const removeCity = id => {
        //console.log(id)
        setCityList(searches => {
            return searches.filter(searches => searches.key !== id);
        });

    };
    const nav = (value) => {
        AsyncStorage.setItem('cityName', value)
        props.navigation.navigate('Home2', { params: { cityName: value }, screen: 'SCurrent' })
    }

    return (
        <ImageBackground source={require('../assets/img/back3.jpg')} style={styles.image}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, paddingTop: 38 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button transparent
                        onPress={() => props.navigation.navigate('Home')}
                    >
                        <Icon name="home" style={{ color: '#fff', fontSize: 25 }} />
                    </Button>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, paddingLeft: 20 }}>Add City</Text>
                </View>
                <Form style={{ flexDirection: 'row' }}>
                    <Item style={{ width: '75%' }}>
                        <Input
                            value={city}
                            onChangeText={setCity}
                            placeholder="City Name (Without Space)" placeholderTextColor="#fff" style={{ color: '#fff' }} />
                    </Item>
                    <Button style={{ marginLeft: 10 }}
                        onPress={addCity}
                    >
                        <Text>Add</Text>
                    </Button>
                </Form>
                <FlatList
                    data={cityList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => nav(item.city)}
                            style={{ margin: 10, borderColor: '#fff', borderWidth: 1, borderRadius: 20, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, color: '#fff' }}>
                                {item.city}
                            </Text>
                            <Button transparent
                                onPress={() => removeCity(item.key)}
                            >
                                <Icon name="trash" style={{ color: '#fff' }} />
                            </Button>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.key.toString()}
                />
            </View>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

});
