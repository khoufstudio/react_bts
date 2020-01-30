import React, { Component } from 'react'
import { Text, View, Button, Image, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import SInfo from 'react-native-sensitive-info'
import { Icon } from 'react-native-elements'
import axios from 'axios';


export default class Shopping extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ip_server: '',
            loading: true,
            data: [],
            isFetching: false,
            token: ''
        }
    }
    
    _getDataApi = async () => {
    	const token = await SInfo.getItem('token', {}).then(value => { 
            this.setState({token: value})
            return value
        })

        let url = `http://3.0.56.213:5000/api/shopping`
        console.log(url)

        let config = {
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json'
            }
        }

        const getData = await axios.get(url, config)
	        .then(res => {
	        	console.log(res.data)
	            this.setState({
	                data: res.data.data,
	                loading: false,
	                isFetching: false,
	            })
	        })
    }

    _handleRefresh = () => {
        this.setState({ isFetching: true }, function() { this._getDataApi() })
    }

    componentDidMount() {
        this._getDataApi()
    }

    renderItem(data) {
        return (
            <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center'}}>
                <View style = {styles.containerList}>
                    <Icon
                        name = 'clipboard-check-outline'
                        type = 'material-community'
                        color = '#EB615B' />
                    <Text> {data.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { loading, data } = this.state
        if (loading) {
            return <ActivityIndicator style = {styles.loading} size="large" color="#0000ff" />
        } else {
            return (
                <View style = {{height: '100%'}} >
                    <FlatList
                        data={data}
                        onRefresh = {() => this._handleRefresh()}
                        refreshing = {this.state.isFetching}
                        renderItem={this.renderItem} 
                        keyExtractor={(item) => item.id.toString()} />

                    <TouchableOpacity 
                        onPress = {() => this.props.navigation.navigate('ShoppingAdd')} 
                        style = {styles.fab} >
                        <Icon
                            name = 'add'
                            type = 'material'
                            color = 'white' />
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        marginTop: 30
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 10,
        backgroundColor: '#C9421B',
        borderRadius: 30,
        elevation: 8
    },
    containerList: {
        width: "90%",
        margin: 10,
        padding: 15,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 10,
    },
    itemHeader: {
        fontSize: 16,
        fontFamily: 'Muli-Bold',
        textTransform: 'uppercase',
        marginLeft: 10,
    },
})
