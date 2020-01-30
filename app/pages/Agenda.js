import React, { Component } from 'react'
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import SInfo from 'react-native-sensitive-info'
import { Icon } from 'react-native-elements'

export default class Agenda extends Component {
	constructor(props) {
        super(props);
        this.state = {
            name: 'test coy',
        }
    }

	logout = () => {
        SInfo.deleteItem('token', {}).then(value => {
            this.props.navigation.navigate('LoginScreen')
        })
    }

    componentDidMount() {
        // isi ke id author ke 
        SInfo.getItem('name', {}).then(value => {
            this.setState({ name: value })
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
           		<Icon
                    name = 'user-circle-o'
                    type = 'font-awesome'
                    color = '#808080'
                    size = {80} />
                {/*
	                <Button
					  onPress={this.logout}
					  title="Logout"
					  color="#419e3a"
					  accessibilityLabel="Learn more about this purple button" />
                */}
            	<Text style={{ textAlign: 'center', fontFamily: 'Muli-Regular', fontSize: 20, marginTop: 20 }}>{ this.state.name }</Text>

			  	<View style={styles.inputContainer}>
                    <TouchableOpacity onPress = { this.logout }> 
                        <View style={styles.buttonContainer2}>
                            <Icon
                                name = 'logout'
                                type = 'material-community'
                                color = 'white' />
                            <Text style={{color: 'white', fontFamily: 'Muli-Bold', marginLeft: 20, fontSize: 16}}>
                                Logout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	buttonContainer2: {backgroundColor: 'red', padding: 10, borderRadius: 10, flexDirection: 'row', alignContent: 'center', borderWidth: 2, borderColor: 'red'},
    inputContainer: {marginTop: 40, marginLeft: 20, marginRight: 20},
})