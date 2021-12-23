import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import styles from '../styles';
import endpoints from '../endpoints';

const Home = props => {
  const userId = props.route.params.userId;

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.container]}>
        <View>
          <Button
            onPress={()=>{props.navigation.navigate('Tasks',{userId:userId})}}  title={'Tasks'}/>
          <Button
            onPress={()=>{props.navigation.navigate('Posts')}}  title={'Posts'}/>
          <Button
            onPress={()=>{props.navigation.navigate('Album')}} title={'Albums'}/>
          <Button
            onPress={()=>{props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Login",
                },
              ],
            })}} title={'Logout'}/>
        </View>
        {

        }
      </View>
    </SafeAreaView>
  );
};

export default Home;
