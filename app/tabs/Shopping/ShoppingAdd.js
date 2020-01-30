import React, { Component } from 'react'
import { Modal, Text, View, StyleSheet, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import Spinner from 'react-native-spinkit'  
import SInfo from 'react-native-sensitive-info'
import axios from 'axios';

export default class ShoppingAdd extends Component {

    constructor(props) {
        super(props);         
        this.state = {
            ip_server: 'http://3.0.56.213:5000/api/signup',
            name: '',
            modalVisible: false,
        }
    }

    ShoppingAdd = async () => {
        this.setState({ modalVisible: true })
        let config = {
        	user: {
	            username: this.state.username,
	            email: this.state.email,
	            encrypted_password: this.state.password,
				address: this.state.address,
				city: this.state.city,
				country: this.state.country,
				name: this.state.name,
				postcode: this.state.postcode,
        	}
        }

        let url = `${this.state.ip_server}`

        axios.post(url, config)
	        .then((res) => {
	            this.setState({ modalVisible: false })
	            console.log(res.data)

	            if (typeof res.data.email !== 'undefined') {
	            	alert('anda berhasil daftar. silahkan login dengan email dan password')
	            	
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
                <View style={{ flex: 1, paddingTop: 100, alignItems: 'center' }}>
                    <Text style={styles.header}>Belanja</Text>
                    <TextInput 
                        placeholder = 'Nama Barang'
                        secureTextEntry={true} 
                        style = {styles.inputField}
                        onChangeText = { TextInputValue => this.setState({name: TextInputValue})}
                        underlineColorAndroid = 'white' 
                        placeholderTextColor = '#C7C7CD'>
                    </TextInput>

                    <TouchableOpacity style={styles.buttonShoppingAdd} onPress={this.ShoppingAdd}>
                        <Text style = { styles.textBtn }>Tambah Keranjang</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    View: {
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
    buttonShoppingAdd: { 
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