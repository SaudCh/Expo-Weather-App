import { StatusBar } from 'expo-status-bar';
import { Button, Container, Content, Icon, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

export default function App() {
    return (
        <ImageBackground source={require('../assets/img/back1.jpg')} style={styles.image}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, paddingTop: 38 }}>
                <View style={{flexDirection:'row',alignContent:'center'}}>
                    <Button transparent>
                        <Icon name="home" style={{ color: '#fff' }} />
                    </Button>
                    <Text>Add City</Text>
                </View>
            </View>
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
