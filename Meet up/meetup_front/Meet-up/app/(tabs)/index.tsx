import { View, Text, StyleSheet, Image, SafeAreaView, ImageBackground } from 'react-native'
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import React from 'react'  

const HomeScreen = () => {
    return (
      <ImageBackground style={sytles.background} source={require("@/assets/images/background.png")}>
        <SafeAreaView style={sytles.container}>
          <View style={sytles.center}>
              <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Image style={sytles.image} source={require("@/assets/images/logo.webp")}>
              </Image>
              <Text style={sytles.textTitle}>What is Meet Up?</Text>
              <Text style={sytles.textSubtitle}>Connect. Create. Share.</Text>
              </View>
              <View style={sytles.containerButtons}>
              <Button textColor='black' style={sytles.button} mode="contained" onPress={() => router.navigate('/registerscreen')}>
                  Join
              </Button>
              <Button textColor='black' style={sytles.button} mode="contained" onPress={() => router.navigate('/loginscreen')}>
                  Log In
              </Button>
              </View>
          </View>
        </SafeAreaView>
      </ImageBackground>    
    )
}

const sytles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
    container: {
      flex: 1,
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
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
      width: 200,
      height: 200,
      textAlign: 'center'
    },
    textTitle: {
      fontFamily: 'Arial, sans-seriff',
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 20
    },
    textSubtitle: {
      fontFamily: 'Arial, sans-seriff',
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
    },
    containerButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 60
    },
    button: {
      fontSize: 20,
      backgroundColor: '#fff',
      color: 'black',
      marginLeft: 5,
      marginRight: 5
    }
  })

export default HomeScreen