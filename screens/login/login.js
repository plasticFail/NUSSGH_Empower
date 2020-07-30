import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../../redux/reduxMapping';
import {
  storeUsername,
  getUsername,
  storePassword,
  getPassword,
  storeToken,
  getToken,
} from '../../storage/asyncStorageFunctions';

const url = 'https://sghempower.com/auth/patient-login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      username: '',
      password: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const username = await getUsername();
    if (username !== null && username !== '') {
      console.log('username : ' + username);
      this.setState({username: username});
    }
    const password = await getPassword();
    if (password !== null && password !== '') {
      console.log('password : ' + password);
      this.setState({password: password});
    }
    const token = await getToken();
    if (token !== null && token !== '') {
      console.log('token : ' + token);
      this.props.login();
    }
  };

  handleLogin = () => {
    this.makePostRequest(url);
  };

  handleUsernameInput = (inputText) => {
    this.setState({username: inputText});
  };

  handlePasswordInput = (inputText) => {
    this.setState({password: inputText});
  };

  makePostRequest = async (url) => {
    try {
      this.setState({isLoading: true});
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          remember: true,
          password: this.state.password,
          username: this.state.username,
        }),
      });
      let responseJson = await response.json();
      this.setState({isLoading: false});
      if (responseJson.token != null) {
        this.setState({isLoading: true});
        await storeUsername(this.state.username);
        await storePassword(this.state.password);
        await storeToken(responseJson.token);
        this.props.login();
        this.setState({isLoading: false});
      } else {
        Alert.alert('Error', 'Invalid username/password combination.', [
          {text: 'Got It'},
        ]);
      }

      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../resources/images/logo_v1.png')}
          style={{width: 350, height: 350, marginBottom: 10}}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Username"
          placeholderTextColor="#a1a3a0"
          value={this.state.username}
          onChangeText={this.handleUsernameInput}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#a1a3a0"
          value={this.state.password}
          onChangeText={this.handlePasswordInput}
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
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Loading isLoading={this.state.isLoading} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
