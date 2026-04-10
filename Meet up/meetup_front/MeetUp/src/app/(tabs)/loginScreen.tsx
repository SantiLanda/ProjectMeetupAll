import { View, Text, StyleSheet, Image, SafeAreaView, ImageBackground, Alert } from 'react-native'
import { Button, TextInput, RadioButton } from 'react-native-paper';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LogInScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {authState, onLogin} = useAuth()

	const logIn = async () => {
		const result = await onLogin!(email, password)
    if (result && result.error) {
        Alert.alert('Error', result.msg, [{text: 'OK', onPress: () => console.log('OK Pressed')}])
    }
	}

    return (
      <ImageBackground style={sytles.background} source={require("../../assets/images/background.png")}>
        <SafeAreaView style={sytles.container}>
        <View style={sytles.center}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image style={sytles.image} source={require("../../assets/images/logo.webp")}>
                </Image>
            </View>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={sytles.textTitle}>Email address:</Text>
                <TextInput placeholder='Enter your email' style={sytles.textInput} onChangeText={text => setEmail(text)}></TextInput>
            </View>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={sytles.textTitle}>Password:</Text>
                <TextInput placeholder='Enter your password' secureTextEntry={true} style={sytles.textInput} onChangeText={text => setPassword(text)}></TextInput>
            </View>
            <View style={sytles.containerRadio}>
                <Button textColor='white' style={[sytles.button, {backgroundColor: '#e67e22'}]} mode="contained" onPress={logIn}>
                Log In
                </Button>
            </View>
        </View>
        </SafeAreaView>
      </ImageBackground>    
	)
}

const sytles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    background: {
    flex: 1,
    resizeMode: 'cover', 
    },
    center: {
      backgroundColor: '#1abc9c',
      height: 650,
      width: 360,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    image: {
      width: 120,
      height: 120,
      textAlign: 'center',
      borderRadius: 20,
    },
    textLogin: {
      fontFamily: 'Arial, sans-seriff',
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
    },
    textTitle: {
      fontFamily: 'Arial, sans-seriff',
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 12,
      marginBottom: 5
    },
    textSubtitle: {
      fontFamily: 'Arial, sans-seriff',
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
    },
    containerButtons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginTop: 30
    },
    button: {
      fontSize: 20,
      backgroundColor: '#fff',
      color: 'black',
      marginBottom: 10,
      borderRadius: 10,
      width: 300
    },
    textInput: {
      height: 30,
      width: 300,
      marginTop: 10,
      marginBottom: 10
    },
    containerRadio: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10,
        width: 300
    }
  })

export default LogInScreen