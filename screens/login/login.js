import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
  storeRole,
} from '../../storage/asyncStorageFunctions';
import {loginRequest} from '../../netcalls/requestsAuth';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';
//components
import Loading from '../../components/loading';
import globalStyles from '../../styles/globalStyles';
//svg
import Logo from '../../resources/images/Patient-Icons/SVG/icon-color-empower.svg';
import {role_patient, role_caregiver} from '../../commonFunctions/common';
import {scaleFont} from '../../commonFunctions/scaleFunction';

const tabs = [role_patient, role_caregiver];

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
    this.props.logout();
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

    let rsp = await loginRequest(this.state.username, this.state.password);
    console.log('----');
    console.group(rsp);
    let token = rsp?.token;
    let role = rsp?.type;

    if (token != null) {
      await storeUsername(this.state.username);
      await storePassword(this.state.password);
      await storeToken(token);
      await storeRole(role);
      this.props.login();

      console.log('login success!');
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
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.container}>
          <Logo
            height={styles.logoStyle.height}
            width={styles.logoStyle.width}
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
    width: adjustSize(100),
    height: adjustSize(100),
    marginBottom: adjustSize(10),
    borderRadius: adjustSize(20),
  },
  welcomeText: {
    fontSize: adjustSize(30),
    color: 'white',
    fontFamily: 'SFProDisplay-Bold',
  },
  detailText: {
    fontSize: adjustSize(20),
    color: 'white',
    fontFamily: 'SFProDisplay-Regular',
  },
  inputBox: {
    width: '90%',
    fontSize: adjustSize(18),
    height: adjustSize(50),
    borderRadius: adjustSize(20),
    backgroundColor: '#12683E',
    paddingStart: adjustSize(30), //position placeholder text
    marginVertical: adjustSize(10),
    alignSelf: 'center',
    color: 'white',
  },
  light: {
    color: 'white',
    fontSize: adjustSize(17),
    marginTop: '3%',
    fontFamily: 'SFProDisplay-Regular',
  },
  bold: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'SFProDisplay-Bold',
  },
  forgetPassword: {
    margin: '4%',
    color: 'white',
    textAlign: 'center',
    fontSize: adjustSize(17),
  },
  border: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    width: adjustSize(150),
  },
});
