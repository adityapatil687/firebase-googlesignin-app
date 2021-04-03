import React from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';

import {css} from '../styles/css';

export default function UserProf({ navigation, _signOut, userInfo}){
    
    return (
        <>
        <View style={{flex: 1, backgroundColor: '#ffffff',}}>
          <View style={{marginLeft: 15, marginTop: 5}}>
            <Text style={{fontSize: 35, fontWeight: 'bold'}}>
              <Text style={{color: '#4BC283'}}>VEG</Text>
              <Text style={{color: '#545454'}}>IES</Text>
            </Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
              <View style={{marginBottom: 50}}>
                <Text style={{fontSize: 28, color: '#5d5d5d', fontWeight: 'bold'}}>Logged in as</Text>
              </View>
              
                <View style={{marginBottom: 15}}>
                    <Image source={{uri: userInfo.user.photo}} style={{height: 170 , width: 170, borderRadius: 100}} />
                </View>
                <Text style={{marginBottom: 110, fontSize: 18, color: '#6E6E6E'}}>{userInfo.user.name}</Text>
              

            <TouchableHighlight style={{borderRadius: 5}} onPress={()=> console.log("Ok")}>
              <View style={{backgroundColor: '#53C899', elevation: 5,  paddingHorizontal: '28%',paddingVertical: 7, borderRadius: 5}}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>Continue</Text>
              </View>
            </TouchableHighlight>
            
            <TouchableHighlight style={{borderRadius: 5, marginTop: 35}} onPress={_signOut}>
              <View style={{backgroundColor: '#C85353', elevation: 5, paddingHorizontal: '30%', paddingVertical: 7, borderRadius: 5 }}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>Logout</Text>
              </View>
            </TouchableHighlight>
        

          </View>
        </View>
        </>
    );
}