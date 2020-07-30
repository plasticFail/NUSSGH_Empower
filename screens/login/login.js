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
//third party libs
import {connect} from 'react-redux';
//functions
import {mapStateToProps, mapDispatchToProps} from '../../redux/reduxMapping';
import {storeUsername, getUsername, storePassword, getPassword, storeToken} from '../../storage/asyncStorageFunctions'
import {patientLoginRequest} from '../../netcalls/requestsAuth';
//components
import Loading from '../../components/loading';


class Login extends Component{

  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      username: "",
      password: "",
      isLoading: false,
    }
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const username = await getUsername();
    if(username !== null && username !== ''){
      console.log('username : ' + username);
      this.setState({username:username});
    }
    const password = await getPassword();
    if(password !== null && password !== ''){
      console.log('password : ' + password);
      this.setState({password:password});
    }
  }

  handleLogin = async() => {
    this.setState({isLoading:true});
    let token = await patientLoginRequest(this.state.username, this.state.password);
    if (token != null) {
      await storeUsername(this.state.username);
      await storePassword(this.state.password);
      await storeToken(token);
      this.props.login();
    }else {
      Alert.alert('Error', 'Invalid username/password combination.', [
        {text: 'Got It'},
      ]);
    }
    this.setState({isLoading:false});
  };

  handleUsernameInput = inputText => {
    this.setState({username: inputText});
  }

  handlePasswordInput = inputText => {
    this.setState({password: inputText});
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={{fontSize: 30, marginBottom: 20, fontWeight: '500'}}>
            Welcome!
          </Text>
          <Image
              source={require('../../resources/images/logo_v1.png')}
              style={{width: 200, height: 200, marginBottom: 10}}
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
              onPress={() => this.props.navigation.navigate('ForgetPassword')}>
            Forget Password?
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Loading isLoading={this.state.isLoading}/>
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
