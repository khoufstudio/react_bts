import React, {Component} from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import SInfo from 'react-native-sensitive-info'

const MenuDrawerNew = (props) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
		<View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
		<View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
		</View>
		<View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
		<Text>John Doe</Text>
		</View>
		</View>
		<ScrollView>
		<DrawerItems {...props} />
		</ScrollView>
		<View style={{ alignItems: "center", bottom: 20 }}>
		<View style={{ flexDirection: 'row' }}>
		<View style={{ flexDirection: 'column', marginRight: 15 }}>
		<Icon name="flask" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
		</View>
		<View style={{ flexDirection: 'column' }}>
		<Icon name="call" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
		</View>
		</View>
		</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({

});

export default MenuDrawerNew;