import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import { IconButton, ToggleButton } from 'react-native-paper';
import React, {useEffect, useRef, useState} from 'react'  
import * as ScreenOrientation from "expo-screen-orientation";
import { Link, useNavigation } from 'expo-router';
import { Avatar } from '@/classes/Avatar.model';
import AvatarViewerExpoThree from '@/components/avatarViewer';

const EditAvatar = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(new Avatar())
  const [settingType, setSettingType] = useState('skinColour')
  const [skinColour, setSkinColour] = useState(avatar.skinColour)
  const [hairColour, setHairColour] = useState<string>(avatar.hairColour);
  const [hairStyle, setHairStyle] = useState<string>(avatar.hairStyle);
  const [eyeColour, setEyeColour] = useState<string>(avatar.eyeColour);
  const [eyeStyle, setEyeStyle] = useState<string>(avatar.eyeStyle);
  const [topClothes, setTopClothes] = useState<string>(avatar.topClothes);
  const [bottomClothes, setBottomClothes] = useState<string>(avatar.bottomClothes);
  const [shoes, setShoes] = useState<string>(avatar.shoes);
  const [hat, setHat] = useState<string>(avatar.hat);
  const [gender, setGender] = useState<string>(avatar.gender);  
  

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    if (avatar.skinColour !== skinColour) {
      avatar.skinColour = skinColour;
    }
    if (avatar.hairColour !== hairColour) {
      avatar.hairColour = hairColour;
    }
    if (avatar.hairStyle !== hairStyle) {
      avatar.hairStyle = hairStyle;
    }
    if (avatar.eyeColour !== eyeColour) {
      avatar.eyeColour = eyeColour;
    }
    if (avatar.eyeStyle !== eyeStyle) {
      avatar.eyeStyle = eyeStyle;
    }
    if (avatar.topClothes !== topClothes) {
      avatar.topClothes = topClothes;
    }
    if (avatar.bottomClothes !== bottomClothes) {
      avatar.bottomClothes = bottomClothes;
    }
    if (avatar.shoes !== shoes) {
      avatar.shoes = shoes;
    }
    if (avatar.hat !== hat) {
      avatar.hat = hat;
    }
    if (avatar.gender !== gender) {
      avatar.gender = gender;
    }
    setAvatar({skinColour: skinColour, hairColour: hairColour, hairStyle: hairStyle, eyeColour: eyeColour, eyeStyle: eyeStyle, topClothes: topClothes,
      bottomClothes: bottomClothes, shoes: shoes, hat: hat, gender: gender
    })   
  }, [skinColour, hairColour, hairStyle, eyeColour, eyeStyle, topClothes, bottomClothes, shoes, hat, gender]);

  return (    
      <SafeAreaView style={sytles.container}>
        <View>
          <View style={sytles.backButton}>
            <IconButton icon='arrow-left-bottom-bold' iconColor='#182C45' onPress={() => {ScreenOrientation.unlockAsync(); navigation.goBack()}} rippleColor={'#eee'}/>
            <IconButton icon='content-save' iconColor='#182C45' onPress={() => {console.log('save'); ScreenOrientation.unlockAsync(); navigation.goBack()}} rippleColor={'#eee'}/>
          </View>
          <View style={{height: 320, width: 350, backgroundColor: '#f0f0f0', marginLeft: 19}}>
            <AvatarViewerExpoThree avatar={avatar}/>
          </View>
        </View>
      <View style={sytles.center}>
          <ToggleButton.Row onValueChange={(value) => setSettingType(value)} value={settingType} style={{height: 50}}>
            <ToggleButton icon="baby-face-outline" iconColor='#fff' value='skinColour' size={40} style={sytles.settingsBar}>
            </ToggleButton>
            <ToggleButton icon="eye-outline" iconColor='#fff' value='eyeColour' size={40} style={sytles.settingsBar}>
            </ToggleButton>
            <ToggleButton icon="face-man-shimmer" iconColor='#fff' value='hair' size={40} style={sytles.settingsBar}>
            </ToggleButton>
            <ToggleButton icon="tshirt-crew-outline" iconColor='#fff' value='upperClothes' size={40} style={sytles.settingsBar}>
            </ToggleButton>
            <ToggleButton icon={require('@/assets/icons/long-pants-svgrepo-com.png')} iconColor='#fff' value='bottomClothes' size={40} style={sytles.settingsBar}>
            </ToggleButton>
            <ToggleButton icon="shoe-sneaker" iconColor='#fff' value='shoes' size={40} style={sytles.settingsBar}>
            </ToggleButton>
            <ToggleButton icon="hat-fedora" iconColor='#fff' value='hats' size={40} style={sytles.settingsBar}>
            </ToggleButton>
          </ToggleButton.Row>
          <View style={{height: 20}}></View>
          {settingType == 'skinColour' ? (
            <>
              <ToggleButton.Row value={skinColour} onValueChange={(value) => setSkinColour(value)}>
                <ToggleButton icon="square-rounded" iconColor='#dcc39d' value='#dcc39d' size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="square-rounded" iconColor='#e6d5c1' value='#e6d5c1' size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="square-rounded" iconColor='#dcaa9e' value='#dcaa9e' size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="square-rounded" iconColor='#b77f3c' value='#b77f3c' size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="square-rounded" iconColor='#694d1e' value='#694d1e' size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="square-rounded" iconColor='#40260c' value='#40260c' size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="square-rounded" iconColor='#221a11' value='#221a11' size={40} style={sytles.settingsBar}>
                </ToggleButton>
              </ToggleButton.Row>
              <ToggleButton.Row value={gender} onValueChange={(value) => setGender(value)} style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}>
                <ToggleButton icon="gender-male" iconColor='#0097A8' value='male' size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="gender-female" iconColor='#F93FA5' value='female' size={40} style={sytles.settingsBar}>
                </ToggleButton>
              </ToggleButton.Row>
            </>
          ) : null}
          {settingType == 'hair' ?(
            <>
              <ToggleButton.Row value={hairStyle} onValueChange={(value) => setHairStyle(value)}>
                <ToggleButton icon="circle-off-outline" iconColor='#BDBDBD' value={undefined} size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="numeric-1" size={40} iconColor='#BDBDBD' value='hair-1' style={sytles.settingsBar}>
                </ToggleButton>
              </ToggleButton.Row>
            </>
          ) : null}
          {settingType == 'upperClothes' ?(
            <>
              <ToggleButton.Row value={topClothes} onValueChange={(value) => setTopClothes(value)}>
                <ToggleButton icon="circle-off-outline" iconColor='#BDBDBD' value={undefined} size={40} style={sytles.settingsBar}>
                </ToggleButton>
                <ToggleButton icon="numeric-1" size={40} iconColor='#BDBDBD' value='clothes-1' style={sytles.settingsBar}>
                </ToggleButton>
              </ToggleButton.Row>
            </>
          ) : null}
      </View>
      </SafeAreaView>
  )
}

const sytles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-between'
    },
    center: {
      backgroundColor: '#1abc9c',
      height: 396,
      width: 485,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 20,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      alignSelf: 'flex-end',
      padding: 10
    },
    backButton: {
      color: '#1abc9c',
      height: 70,
      width: 200,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: 20,
      alignSelf: 'flex-start'
    },
    settingsBar: {
      height: 50,
      width: 67,
      borderWidth: 0,
      borderRadius: 10},
    skinColor: {
        height: 50,
        width: 80,
        borderWidth: 0,
        borderRadius: 10}
  })

export default EditAvatar