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

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    let status=200
    fetch(endpoints.userLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      })
    }).then((response)=>{
      console.log(response);
      if(response.status!=200){
        alert('Invalid credentials')
      }
      status=response.status;
      return response.json()
    }).then(responseJson=>{
     console.log(responseJson)
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: "Home",
              params:{userId:1}
            },

        ],
      })
    }).catch(err=>{
      console.log(err)
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container,styles.centerAlign]}>
        <TextInput
          style={styles.textInput}
          placeholder={'Username'}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Password'}
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <Button
          onPress={login} title={'Login'}/>
      </View>
    </SafeAreaView>
  );
};

export default Login;
