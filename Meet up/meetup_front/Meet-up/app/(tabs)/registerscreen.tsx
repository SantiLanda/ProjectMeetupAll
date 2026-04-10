import { View, Text, StyleSheet, Image, SafeAreaView, ImageBackground } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import React, { useState } from 'react'  
import { useAuth } from '@/context/AuthContext';

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {authState, onRegister} = useAuth()

  const register = async () => {
    const result = await onRegister!(email, username, password)
    if (result && result.error) {
      alert(result.msg)
    }
  }
  return (    
    <ImageBackground style={sytles.background} source={require("@/assets/images/background.png")}>
      <SafeAreaView style={sytles.container}>
      <View style={sytles.center}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Image style={sytles.image} source={require("@/assets/images/logo.webp")}>
            </Image>
          </View>
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={sytles.textTitle}>Full Name:</Text>
            <TextInput placeholder='Enter your full name' style={sytles.textInput} onChangeText={text => setUsername(text)}></TextInput>
          </View>
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={sytles.textTitle}>Email:</Text>
            <TextInput placeholder='Enter your email' style={sytles.textInput} onChangeText={text => setEmail(text)}></TextInput>
          </View>
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={sytles.textTitle}>Password:</Text>
            <TextInput secureTextEntry={true} placeholder='Enter your password' style={sytles.textInput} onChangeText={text => setPassword(text)}></TextInput>
          </View>
          <View style={sytles.containerButtons}>
            <Button textColor='white' style={[sytles.button, {backgroundColor: '#3498db'}]} mode="contained" onPress={() => console.log('Pressed')}>
              Scan fingerprint
            </Button>
            <Button textColor='white' style={[sytles.button, {backgroundColor: '#e67e22'}]} mode="contained" onPress={register}>
              Register
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
    }
  })

export default RegisterScreen