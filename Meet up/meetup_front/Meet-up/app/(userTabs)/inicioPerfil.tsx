import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Appbar, List} from 'react-native-paper';
import React from 'react'  
import { useAuth } from '../../context/AuthContext';
import { Link } from 'expo-router';
import { UserService } from '@/services/UserService';

const InicioPerfil = () => {
    const {onLogout} = useAuth()
    const userService = new UserService();
    const barName = `Welcome, ${userService.getUser().first_name}`;
    return (    
        <SafeAreaView style={{flex: 1}}>
          <Appbar.Header statusBarHeight={0} elevated={true} style={sytles.topBar}>
            <Appbar.Content title={barName} titleStyle={{color: '#182C45', fontWeight: 'bold'}}></Appbar.Content>
          </Appbar.Header>
          <View style={sytles.container}>
            <List.Section style={sytles.list}>
              <Link href='/(userTabs)/gameIn' asChild>
                <List.Item title="Enter world" description="Enter MeetUp's virtual space" left={props => <List.Icon {...props} icon="controller-classic" color='#C3F8F2'/>}
                rippleColor={"#31D2E2"} titleStyle={sytles.listTitle} descriptionStyle={sytles.listText}/>
              </Link>
              <Link href='/(userTabs)/editAvatar' asChild>
                <List.Item title="Edit avatar" description="Edit your avatar" left={props => <List.Icon {...props} icon="account-edit" color='#C3F8F2' />}
                rippleColor={"#31D2E2"} titleStyle={sytles.listTitle} descriptionStyle={sytles.listText}/>
              </Link> 
              <Link href='/(userTabs)/inicioPerfil' asChild>
                <List.Item title="Edit profile" description="Edit profile settings" left={props => <List.Icon {...props} icon="card-account-details" color='#C3F8F2' />}
                rippleColor={"#31D2E2"} titleStyle={sytles.listTitle} descriptionStyle={sytles.listText}/>
              </Link> 
              <List.Item title="Log out" description="Log out from meetup" left={props => <List.Icon {...props} icon="logout" color='#C3F8F2' />}
              rippleColor={"#31D2E2"} onPress={onLogout} titleStyle={sytles.listTitle} descriptionStyle={sytles.listText}/>
            </List.Section>
          </View>
        </SafeAreaView>
    )
}

const sytles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#16a085',
      display: 'flex',
    },
    topBar: {
      backgroundColor: '#47E6C7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
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
    list: {
      backgroundColor: '#1abc9c',
      marginTop: 0,
      paddingTop: 4,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.01)'
    },
    listTitle: {
      color: "#fafafa",
      fontSize: 20,
      fontWeight: 'bold'
    },
    listText: {
      color: "#fafafa",
      fontSize: 15,
    }
  })

export default InicioPerfil