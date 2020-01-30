'use strict';

import React, { Component } from 'react'

import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import CardView from 'react-native-cardview'

class Dashboard extends Component {
	
	_clickCard = () => {
		alert('test')
	}

	render() {
		return (
		<View style={styles.container}>
			<LinearGradient
				colors={['#4c669f', '#3b5998', '#192f6a']}
				style={styles.background} />

			<View style={styles.containerHeader}>
				<Image
					source = {require('./../assets/images/logo.png')}
					style={styles.logo} />
				<Text style={styles.logoText}>
					E-Materi</Text>
			</View>

		
			<View style={styles.containerCard}>
				<CardView
					style={{margin: 20}}
					cardElevation={4}
					cardMaxElevation={2}
					cornerRadius={5}>
					<TouchableOpacity 
						style={styles.card}
						onPress = {() => this.props.navigation.navigate('Kegiatan')}>
						<Icon
							name = 'tags'
							type='font-awesome'
							color='#4c669f'
							size={50} />
						<Text style={styles.cardText}>Kegiatan</Text>
					</TouchableOpacity>
				</CardView>
				
				<CardView
					style={{ margin: 20 }}
					cardElevation={4}
					cardMaxElevation={2}
					cornerRadius={5}>
					<TouchableOpacity 
					onPress = { this._clickCard }
					style={styles.card}>
						<Icon
							name='calendar'
							type='font-awesome'
							color='#4c669f'
							size={50} />
						<Text style={styles.cardText}>Agenda</Text>
					</TouchableOpacity>
				</CardView>
		
			</View>

			<View style={{
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center'}}>
				<CardView
					style={{ margin: 20 }}
					cardElevation={4}
					cardMaxElevation={2}
					cornerRadius={5}>
					<TouchableOpacity 
					onPress = { this._clickCard }
					style={styles.card}>
						<Icon
							name = 'line-chart'
							type='font-awesome'
							color='#4c669f'
							size={50} />
						<Text style={styles.cardText}>Tren</Text>
					</TouchableOpacity>
				</CardView>

				<CardView
					style={{ margin: 20 }}
					cardElevation={4}
					cardMaxElevation={2}
					cornerRadius={5}>
					<TouchableOpacity 
					onPress = { this._clickCard }
					style={styles.card}>
						<Icon
							name = 'archive'
							type='material'
							color='#4c669f'
							size={50} />
						<Text style={styles.cardText}>Bank Materi</Text>
					</TouchableOpacity>
				</CardView>
			</View>

			<View style={styles.containerFooter}>
				<Text>Copyright 2019</Text>
			</View>
		</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		alignItems: 'center'
	},
	containerHeader: {
		padding: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		height: 40,
		width: 40,
		resizeMode: 'contain',
	},
	logoText: {
		color: 'white',
		marginLeft: 10,
		fontSize: 35,
		fontWeight: '100',
		letterSpacing: 3,
		fontFamily: 'Roboto',
		textShadowColor: '#000', 
		textShadowOffset: {
			width: 1,
			height: 1
		}, 
		textShadowRadius: 2
	},
	background: {
		height: 350,
		width: 350,
		backgroundColor: 'blue',
		position: 'absolute',
		top: -100,
		transform: [{ scaleX: 2 }],
		borderRadius: 175
	},
	usernameHeader: {
		color: 'white',
		fontSize: 14
	},
	containerCard: {
		
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		width: 150,
		height: 180,
		alignItems: 'center',
		justifyContent: 'center'
	},
	cardText: {
		marginTop: 20,
		fontSize: 16,
		fontWeight: 'bold'
	},
	containerFooter: {
		position: "absolute",
		bottom: 0,
		padding: 10
	}

});


export default Dashboard;