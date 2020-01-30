import React, { Component } from 'react'
import { Modal, Text, View, StyleSheet, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Spinner from 'react-native-spinkit'  
import SInfo from 'react-native-sensitive-info'
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);         
        this.state = {
            ip_server: 'http://3.0.56.213:5000/api/signin',
            username: '',
            password: '',
            modalVisible: false,
        }


        SInfo.setItem('ip_server', this.state.ip_server, {});

        // cek kalo udah login, langsung ke halaman home
        SInfo.getItem('token', {}).then(value => {
            if (value != null) {
                this._buttonCLickMove()
            }
        })

    }
    
    _buttonCLickMove = () => this.props.navigation.navigate('Dashboard')

    _login = async () => {
        this.setState({ modalVisible: true })
        let config = {
            email: this.state.username,
            password: this.state.password
        }

        let url = `${this.state.ip_server}`

        axios.post(url, config)
	        .then((res) => {
	            this.setState({ modalVisible: false })
	            console.log(res.data)

	            if (typeof res.data.email !== 'undefined') {
	            	alert('anda berhasil login')
	            	SInfo.setItem('token', res.data.token, {})
	            	this.props.navigation.navigate('Shopping')
	            } else {
	            	alert('periksa kembali username dan password anda')
	            }
	        })
	        .catch((err) => {
	            this.setState({ modalVisible: false })
	            alert(err)
	            console.log(err)
	        })
    }

    register = () => {
		this.props.navigation.navigate('RegisterScreen')
    }

    render() {
        return (
            <View behaviour="padding" style={styles.wrapper}>
                <Modal 
                    animationType = {"fade"} transparent = {true}
                    visible = {this.state.modalVisible}
                    onRequestClose = {() => { console.log("Modal has been closed.") } }>
                    <View style = {styles.modal}>
                        <Spinner 
                            type={'ThreeBounce'}
                            color = {'white'} 
                            size = {50} />
                    </View>
                
                </Modal>
                <LinearGradient
                    colors={['#FF2914', '#EB1E41']}
                    style={{ flex: 1, paddingTop: 100, alignItems: 'center' }}>
                    {/*<Image
                        source = {require('./../assets/images/logo.png')}
                        style={styles.logo} />*/}
                    <Text style={styles.header}>Tes BTS</Text>
                    <TextInput 
                        placeholder = 'Email'
                        style = {styles.inputField}
                        onChangeText = { TextInputValue => this.setState({username: TextInputValue})}
                        underlineColorAndroid = 'white' 
                        placeholderTextColor = '#C7C7CD'>
                    </TextInput>
                    <TextInput 
                        placeholder = 'Password'
                        secureTextEntry={true} 
                        style = {styles.inputField}
                        onChangeText = { TextInputValue => this.setState({password: TextInputValue})}
                        underlineColorAndroid = 'white' 
                        placeholderTextColor = '#C7C7CD'>
                    </TextInput>

                    <TouchableOpacity style={styles.button} onPress={this._login}>
                        <Text style = { styles.textBtn }>Login</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.buttonRegister} onPress={this.register}>
                        <Text style = { styles.textBtn }>Register</Text>
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
        height: '100%'
    },
    header: {
        color: 'white',
        fontSize: 23,
        letterSpacing: 3,
        marginBottom: 50,
        fontWeight: 'bold',
    },  
    inputField: {
        color: 'white',
        width: '80%',
        borderColor: 'white',
        marginTop: 5,
        fontSize: 16,
    },
    logo: { 
        height: 150, 
        resizeMode: 'contain', 
        marginBottom: 20,
    },
    button: { 
        // backgroundColor: '#3700B3',
        // backgroundColor: '#063A68', // biru dagri
        backgroundColor: '#EB1E41', // merah
        marginTop: 30,
        alignItems: 'center',
        width: '80%',
    },
    buttonRegister: { 
        // backgroundColor: '#3700B3',
        // backgroundColor: '#063A68', // biru dagri
        backgroundColor: '#555555', // hitam
        marginTop: 30,
        alignItems: 'center',
        width: '80%',
    },
    textBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white', 
        padding: 10,
        borderRadius: 20,
        textTransform: 'uppercase'
    },
    modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(13, 11, 11, 0.54)',
      padding: 100
   },
   textModal: {
      color: '#3f2949',
      marginTop: 10
   }

})