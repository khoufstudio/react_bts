import React, {Component} from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator} from 'react-native'
import { Icon } from 'react-native-elements'
import SInfo from 'react-native-sensitive-info'
import { NavigationActions } from 'react-navigation';
import axios from "axios";

export default class MenuDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ip_server: '',
            user_id: '',
            username: '',
            token: '',
            nama_menu: null,
            nama_user: '',
            icon_menu: {
            	'Kegiatan': 'event',
            	'Tiket Kegiatan': 'event',
            	'Draft Materi': 'drafts',
            	'Draft Materi Sahmen': 'drafts',
            	'Draft Materi Setjen': 'drafts',
            	'Bank Materi': 'storage',
            	'Bank Materi Final': 'storage',
            }
        }
    }

    getRole = async () => {
    	const {ip_server, userId, token} = await this.state
    	let url = `${ip_server}/api/role/${userId}/show`
        
        let config = {
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json'
            }
        }

        const getData = await axios.get(url, config)
            .then((res) => {
                if (res.data.success) {
                    console.log(res)
                    this.setState({nama_menu: res.data.nama_menu})
                }
            })
            .catch((err) => console.log(err))
    }

    async componentDidMount() {
        const ip_server = await SInfo.getItem('ip_server', {}).then(value => {
            if (value != null) {
            	this.setState({ip_server: value})
            }
        })

        const token = await SInfo.getItem('token', {}).then(value => {
        	this.setState({token: value})
        })

	    const userId = await SInfo.getItem('user_id', {}).then(value => {
	    	this.setState({userId: value})
        })

        const name = await SInfo.getItem('name', {}).then(value => {
	    	this.setState({nama_user: value})
        })

        const username = await SInfo.getItem('username', {}).then(value => {
	    	this.setState({username: value})
        })

        await this.getRole()

        
    }

    logout = () => {
        SInfo.deleteItem('token', {})
    	this.props.navigation.navigate('LoginScreen')
    }

	render() {
        const { nama_menu, icon_menu } = this.state
        const { navigate } = this.props.navigation
        
        if (nama_menu == null) {
            return <ActivityIndicator style = {styles.loading} size="large" color="#0000ff" />
        } else {
            return (
                <SafeAreaView style={{ flex: 1}}>
                    <View style={{ backgroundColor: '#EB1E41', padding: 20}}>
                    	<View style={{ flexDirection: 'row'}}>
                        	<Icon
                            	name = 'user-circle-o'
                            	type = 'font-awesome'
                            	color = 'white'
                            	size = {50} />
                        </View>

                        <Text style={{ marginTop: 15, fontFamily: 'Roboto', fontSize: 16, color: 'white', fontWeight: '700' }}>{this.state.username}</Text>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 14, color: 'white', fontWeight: '100' }}>{this.state.nama_user}</Text>
                    </View>
                    <View style={{ flex: 3}}>
                        <View style={{ marginTop: 10}}>
                            <TouchableOpacity onPress={() => navigate('Dashboard')}>
                            	<View style={styles.itemContainer}>   
		                            <Icon
			                            name = 'home'
			                            type = 'material'
			                            color = 'black'
			                            size = {18} />
	                                <Text style={styles.itemText}>Home</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            nama_menu.map((x, index) => (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => navigate(x.replace(/\s/g, ''))}>
                                    	<View style={styles.itemContainer}>   
		                                	<Icon
					                            name = {icon_menu[x]}
					                            type = 'material'
					                            color = 'black'
					                            size = {18} />
	                                        <Text style={styles.itemText}>{x}</Text>
                                    	</View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                        <View>
                            <TouchableOpacity onPress={this.logout}>
								<View style={styles.itemContainer}>   
                                	<Icon
			                            name = 'exit-to-app'
			                            type = 'material'
			                            color = 'black'
			                            size = {18} />
                                    <Text style={styles.itemText}>Logout</Text>
                            	</View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            )
        }
	}
}

const styles = StyleSheet.create({
    loading: {
        marginTop: 30
    },
    itemContainer: { flexDirection: 'row', padding: 10},
    itemText: { color: '#808080', fontFamily: 'Roboto', marginLeft: 20, fontSize: 16, fontWeight: "600"}
})