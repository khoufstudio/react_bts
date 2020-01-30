import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Spinner from 'react-native-spinkit'
import SInfo from 'react-native-sensitive-info'

export default class SplashScreen extends Component {
   
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result')
                },
            100)
        )
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        var data = await this.performTimeConsumingTask()

        if (data != null) {
            // cek kalo udah login, langsung ke halaman home
            SInfo.getItem('token', {}).then(value => {
                if (value != null) {
                    // this.props.navigation.navigate('Dashboard')
                    // this.props.navigation.navigate('KegiatanAdd')
                    this.props.navigation.navigate('Shopping')
                } else {
                    this.props.navigation.navigate('LoginScreen')
                }
            })
            
        }
    }

    render() {
        return (
            <LinearGradient
                colors={['#FF2914', '#FF8284', '#EB1E41']}
                style={styles.container}>
                <Image
                    source = {require('./../assets/images/logo.jpg')}
                    style={styles.logo} />
                <Text style={styles.header}>Test BTS</Text>
                <Spinner 
                    type={'ThreeBounce'}
                    color = {'white'} 
                    size = {50} />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        color: 'white',
        fontSize: 23,
        letterSpacing: 3,
        marginBottom: 50,
        fontWeight: 'bold',
    },  
    logo: { 
        height: 150, 
        resizeMode: 'contain', 
        marginBottom: 20,
    },
    button: { 
        backgroundColor: '#0069c0',
        marginTop: 30,
        alignItems: 'center',
        width: '80%',
    },
})