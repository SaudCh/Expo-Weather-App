import { StatusBar } from 'expo-status-bar';
import { Button, Container, Content, Input, Item, Icon, Text, View, Form } from 'native-base';
import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

export default function App(props) {
    return (
        <ImageBackground source={require('../assets/img/back1.jpg')} style={styles.image}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, paddingTop: 38 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button transparent
                        onPress={() => props.navigation.navigate('Home')}
                    >
                        <Icon name="home" style={{ color: '#fff', fontSize: 25 }} />
                    </Button>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, paddingLeft: 20 }}>Add City</Text>
                </View>
                <Form style={{flexDirection:'row'}}>
                    <Item style={{width:'80%'}}>
                        <Input placeholder="Username" />
                    </Item>
                    <Button>
                        <Text>Add</Text>
                    </Button>
                </Form>

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
