import { StatusBar } from 'expo-status-bar';
import { Container, Content, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

export default function App() {
    return (
        <ImageBackground source={require('../assets/img/back1.jpg')} style={styles.image}>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

});
