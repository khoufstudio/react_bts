/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import {createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator, DrawerItems } from "react-navigation"
import AppContainer from './app/components/AppContainer'

import { Icon } from 'react-native-elements'

var activeColor = 'tomato'
var passiveColor = 'gray'

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        )
        return null
    }
    return null
}


export default class App extends Component {
    
    render() {
        return (
            <AppContainer />
        )
    }
}


