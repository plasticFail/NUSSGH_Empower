import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
//third party libs
import {connect} from 'react-redux';
//functions
import {mapStateToProps, mapDispatchToProps} from '../../redux/reduxMapping';
import {
  storeUsername,
  getUsername,
  storePassword,
  getPassword,
  storeToken,
} from '../../storage/asyncStorageFunctions';
import {patientLoginRequest} from '../../netcalls/requestsAuth';
//components
import Loading from '../../components/loading';
import globalStyles from '../../styles/globalStyles';
import LoadingModal from '../../components/loadingModal';

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
  };

  handleLogin = async () => {
    this.setState({isLoading: true});
    let token = await patientLoginRequest(
      this.state.username,
      this.state.password,
    );
    if (token != null) {
      await storeUsername(this.state.username);
      await storePassword(this.state.password);
      await storeToken(token);
      this.props.login();
    } else {
      Alert.alert('Error', 'Invalid username/password combination.', [
        {text: 'Got It'},
      ]);
    }
    this.setState({isLoading: false});
  };

  handleUsernameInput = (inputText) => {
    this.setState({username: inputText});
  };

  handlePasswordInput = (inputText) => {
    this.setState({password: inputText});
  };

  render() {
    const {navigation} = this.props;
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.container}>
          <Image
            source={require('../../resources/images/empower_logo.png')}
            style={styles.logoStyle}
          />
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.detailText}>
            To proceed with the app, please log in with your credentials
          </Text>
          <View style={{flex: 0.5}} />
          <TextInput
            style={styles.inputBox}
            placeholder="Username"
            placeholderTextColor="white"
            value={this.state.username}
            onChangeText={this.handleUsernameInput}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="white"
            value={this.state.password}
            onChangeText={this.handlePasswordInput}
          />
          <TouchableOpacity
            style={[
              globalStyles.nextButtonStyle,
              {backgroundColor: 'white', marginBottom: 0},
            ]}
            onPress={this.handleLogin}>
            <Text style={globalStyles.actionButtonText}>Login</Text>
          </TouchableOpacity>
          <Text
            style={styles.forgetPassword}
            onPress={() => this.props.navigation.navigate('ForgetPassword')}>
            Forget Password?
          </Text>
          <Loading isLoading={this.state.isLoading} />
          <View style={{justifyContent: 'flex-end', paddingTop: '3%'}}>
            <Text style={styles.light}>
              Having trouble?{' '}
              <Text
                style={styles.bold}
                onPress={() =>
                  this.props.navigation.navigate('ContactUsScreen')
                }>
                Contact Us Now!{' '}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0D8b43',
    padding: '6%',
  },
  logoStyle: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '700',
  },
  detailText: {
    fontSize: 20,
    color: 'white',
  },
  inputBox: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    backgroundColor: '#12683E',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    alignSelf: 'center',
    color: 'white',
  },
  light: {
    color: 'white',
    fontSize: 17,
    marginTop: '3%',
  },
  bold: {
    fontWeight: '800',
    color: 'white',
  },
  forgetPassword: {
    margin: '4%',
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
});
