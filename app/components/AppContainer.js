import React, {Component} from 'react'
import {Platform, StyleSheet, Text, SafeAreaView, View, TouchableOpacity} from 'react-native'
import {createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator, DrawerItems, withNavigation, NavigationActions } from "react-navigation"
import Login from '../pages/Login'
import Register from '../pages/Register'
import SplashScreen from '../pages/SplashScreen'


import Shopping from '../tabs/Shopping/Shopping'
import ShoppingAdd from '../tabs/Shopping/ShoppingAdd'
import User from '../tabs/User/User'
import MenuDrawer  from '../components/MenuDrawer';
import Agenda from '../pages/Agenda'
import { Icon } from 'react-native-elements'
import SInfo from 'react-native-sensitive-info'

var activeColor = 'tomato'
var passiveColor = 'gray'

logout = () => {
    SInfo.deleteItem('token', {}).then(value => {
        // this.props.navigation.navigate('LoginScreen')
        // this.props.navigation.dispatch(NavigationActions.navigate('LoginScreen')) 
    })
}

const DrawerContent = (props) => (
	<SafeAreaView>
		<View style={{
		    backgroundColor: '#EB1E41',
		    height: 140,
		    alignItems: 'center',
		    justifyContent: 'center', }}>
			<Icon
                name = 'user-circle-o'
                type = 'font-awesome'
                color = 'white'
                size = {80} />
		</View>
		<DrawerItems {...props} />
			<TouchableOpacity onPress={this.logout}>
				<Text style={{margin: 16,fontWeight: 'bold'}}>Logout</Text>
			</TouchableOpacity>

	</SafeAreaView>
)


const AppNavigator = createStackNavigator({
    SplashScreen: { 
        screen: SplashScreen,
        navigationOptions: {
        header: null,
        },
    },
    LoginScreen: { 
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
    RegisterScreen: { 
        screen: Register,
        navigationOptions: {
            header: null,
        },
    },
}, {
    headerMode: 'none',
})

// shopping navigator
const ShoppingNavigator = createStackNavigator({
    Shopping: {
        screen: Shopping,
        navigationOptions: {
            title: 'Shopping',
            // header: null,
        },
    },
    ShoppingAdd: {
        screen: ShoppingAdd,
        navigationOptions: {
            title: 'Tambah Shopping',
        },
    }
}, {    
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#EB1E41',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
})

const userNavigator = createStackNavigator({
    User: {
        screen: User,
        navigationOptions: {
            title: 'User',
            // header: null,
        },
    }
}, {    
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#EB1E41',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
})

ShoppingNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'ShoppingAdd') {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    }
}


const navConfig = {
	contentComponent: DrawerContent
	// contentComponent: MenuDrawer
}

const TabNavigator = createDrawerNavigator({
    Shopping: {
        screen: ShoppingNavigator,
        navigationOptions: {
            tabBarLabel: 'Shopping',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon
                name = 'event'
                type = 'material' 
                color = { focused ? activeColor : passiveColor }/>
            )
        }
    },
    User: {
        screen: userNavigator,
        navigationOptions: {
            tabBarLabel: 'User',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon
                name = 'today'
                type = 'material' 
                color = { focused ? activeColor : passiveColor }/>
            )
        }
    },
}, navConfig)

// const AppContainer = createAppContainer(createDrawerNavigator({
// const AppContainer = createAppContainer(createSwitchNavigator({
export default AppContainer = createAppContainer(createSwitchNavigator({
    Auth: AppNavigator,
    // Dashboard: DashboardNew,
    Home: TabNavigator, 
}, {
    initialRouteName: 'Auth',
}))

// export default withNavigation(AppContainer)