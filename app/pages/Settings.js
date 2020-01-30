import React, { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

export default class Settings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> This is the Settings screen </Text>
                <Button onPress={() => this.props.navigation.navigate('Home')} title="Go To Home"></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    }
})
