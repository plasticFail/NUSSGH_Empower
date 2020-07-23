//import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Loading from '../../components/loading';

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const url = 'https://sghempower.com/auth/patient-login';

  const handleLogin = () => {
    makePostRequest(url);
  };

  async function makePostRequest(url) {
    try {
      setIsLoading(true);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          remember: true,
          password: password,
          username: username,
        }),
      });
      let responseJson = await response.json();
      setIsLoading(false);
      if (responseJson.token != null) {
        setIsLoading(true);
        navigation.navigate('Home');
        setIsLoading(false);
      } else {
        Alert.alert('Error', 'Invalid username/password combination.', [
          {text: 'Got It'},
        ]);
      }

      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, marginBottom: 20, fontWeight: '500'}}>
        Welcome!
      </Text>
      <Image
        source={require('../../img/logo_v1.png')}
        style={{width: 200, height: 200, marginBottom: 10}}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Username"
        placeholderTextColor="#a1a3a0"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#a1a3a0"
        onChangeText={setPassword}
      />
      <Text
        style={{
          marginLeft: '40%',
          marginVertical: 5,
          color: '#a1a3a0',
        }}
        onPress={() => navigation.navigate('ForgetPassword')}>
        Forget Password?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Loading isLoading={isLoading} />
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputBox: {
    width: 300,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#AAD326',
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});
