import React from 'react';
import { View, ActivityIndicator } from 'react-native';

//import local files and screens
import {css} from '../styles/css';
import Login from '../screens/Login';
import UserProf from '../screens/UserProf';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

const Stack = createStackNavigator();

export default function Nav() {

  useEffect(() => {
    // Initial configuration
      GoogleSignin.configure({
      webClientId: '1003226761979-f3vj1937o3f747lpo19nbjqrlbs8i6hd.apps.googleusercontent.com',
      //androidClientId: '1003226761979-9cqdisdi6r0d2nrepspefup95dgo61nt.apps.googleusercontent.com',
      //offlineAccess: true,
    });
    _isSignedIn();
  }, []);

const [signin, setSignin] = useState(false);
const [userInfo, setUserInfo] = useState(null);
const [end, setEnd] =useState(false);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setSignin(isSignedIn);
    if (isSignedIn) {
      console.log('User is already signed in');
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setEnd(true);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      const userInfo = await GoogleSignin.signIn();
        //console.log('User Token --> ', userInfo.idToken);
        // Get the users ID token
        //const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
        // Sign-in the user with the credential
        auth().signInWithCredential(googleCredential) ;
        _isSignedIn();
    } catch (error) {
        console.log(error);
    }
  };

  const _signOut = async () => {
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      _isSignedIn();
      // Removing user Info
      setUserInfo(null); 
    } catch (error) {
      console.error(error);
    }
  };

if (userInfo != null && signin == true)
{
  console.log('in block 1');
  return(
    <>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            
          <Stack.Screen name="Profile" options={{headerShown: false}}>{props => <UserProf {...props} _signOut={_signOut} userInfo={userInfo} />}</Stack.Screen>
          <Stack.Screen name="Login" options={{headerShown: false}}>{props => <Login {...props} _signIn={_signIn} />}</Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    </>
  );
} else if (signin == false && userInfo == null && end == true ) {
  console.log('in block 2');
  return (
    <>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" options={{headerShown: false}}>{props => <Login {...props} _signIn={_signIn} />}</Stack.Screen>
            <Stack.Screen name="Profile" options={{headerShown: false}}>{props => <UserProf {...props} _signOut={_signOut} />}</Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
else{
  return(
    <View style={css.container}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
};