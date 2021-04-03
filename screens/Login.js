import React from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';

import {css} from '../styles/css';

export default function Login({ navigation, _signIn }){

    return (
      <>
      <View style={{ 
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
          }}>
        <View >
          <View style={{marginBottom: 40}}>
            <Text style={{fontSize: 75, fontWeight: 'bold'}}>
              <Text style={{color: '#4BC283'}}>VEG</Text>
              <Text style={{color: '#545454'}}>IES</Text>
            </Text>
          </View>
        </View>

        <TouchableHighlight onPress={_signIn} style={{borderRadius: 5}}>
            <View style={{flexDirection: "row", alignItems: 'center',  backgroundColor: '#53C899', borderRadius: 5, elevation: 5}}>
              <View style={{padding: 6, backgroundColor: 'white', borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}>
                <Image source={require('../asset/google.png')} style={{height: 30, width: 30}} />
              </View>
              <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>Login with Google</Text>
              </View>
            </View>
        </TouchableHighlight>
      </View>
      </>
    );
  }