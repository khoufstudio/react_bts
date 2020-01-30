import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-elements'
import SInfo from 'react-native-sensitive-info'
import moment from 'moment'
import axios from 'axios';

export default class Dashboard_new extends Component {
    async componentDidMount() {
        this.setState({ fontLoaded: true });
        this._getDataApi()
    }
    
    constructor(props) {
        super(props);

        moment.locale()

        this.state = {
            fontLoaded: false,
            loading: true, 
            tanggal: '11 Desember 2019',
            total_materi: 0, 
            total_kegiatan: 0,
            kegiatan: null,
            userId: ''
        } 
    }

    _getDataApi = async () => {
        const ip_server = await SInfo.getItem('ip_server', {}).then(value => {
            if (value != null) {
                return value
            }
        })

        const token = await SInfo.getItem('token', {}).then(value => {
            return value
        })

	    const userId = await SInfo.getItem('user_id', {}).then(value => {
	    	this.setState({userId: value})
            return value
        })

        let url = `${ip_server}/api/homepage/dashboard/${userId}`

        console.log(url)
        
        let config = {
            headers: {
                'Authorization': "Bearer " + token,
                'content-type': 'application/json'
            }
        }

        const getData = await axios.get(url, config)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    this.setState({total_materi: res.data.total_materi})
                    this.setState({total_kegiatan: res.data.total_kegiatan})
                    this.setState({kegiatan: res.data.kegiatan})
                    this.setState({loading: false})
                }
            })
            .catch((err) => console.log(err))
    }

    showFooter = () => {
    	const {userId} = this.state

    	console.log(userId)
    	if (false) {
    		return (
				<TouchableOpacity style={styles.cardFooter} onPress = {() => this.props.navigation.navigate('Kegiatan')}>
                    <Text style={styles.cardFooterText}>Lihat Selengkapnya</Text>
                </TouchableOpacity>
			)
    	} else {
    		return null
    	}
    }

    render() {
        const { loading, total_materi, total_kegiatan } = this.state
        const formattedDate = moment().format("LL");
        
        if (loading) {
            return <ActivityIndicator style = {styles.loading} size="large" color="#0000ff" />
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.buttonNav}>
                            <TouchableOpacity onPress = {() => this.props.navigation.openDrawer()}>
                                <Icon
                                    name = 'menu'
                                    type = 'material'
                                    color = 'white' />
                            </TouchableOpacity>
                            {/*<Icon
                                name = 'user'
                                type = 'entypo'
                                color = 'white' />*/}
                        </View>	
                        <View style={styles.displayStat}>
                            <View style={styles.dsContainer}>
                                <Text style={styles.dsVal}>{total_materi}</Text>
                                <Text style={styles.dsLabel}>Materi</Text>
                            </View>
                            <View style={styles.dsContainer}>
                                <Text style={styles.dsVal}>{total_kegiatan}</Text>
                                <Text style={styles.dsLabel}>Kegiatan</Text>
                            </View>
                        </View> 
                        <View style={styles.dateContainer}>
                            <Icon
                                name = 'calendar'
                                type = 'font-awesome'
                                color = 'white'
                                size = {18}
                                 />
                            {/* <Text style={styles.date}>{this.state.tanggal}</Text> */}
                            <Text style={styles.date}>{formattedDate}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Icon
                                    name = 'history'
                                    type = 'font-awesome'
                                    color = '#333333' />
                                <Text style={styles.cardTitle}>
                                    KEGIATAN TERAKHIR
                                </Text>
                            </View>
                            <View style={styles.cardBody}>
                            	{
                            		this.state.kegiatan.map((x, index) => (
                                        <View style={styles.cardItem} key={index}>
                                            <Icon
                                                name = 'clipboard-check-outline'
                                                type = 'material-community'
                                                color = '#808080' />
                                            <Text style={styles.cardItemText}>{(x.nama_kegiatan.length > 30) ? x.nama_kegiatan.substring(0, 28) + '..' : x.nama_kegiatan}</Text>
                                        </View>
                        			))
                            	}
                                
                            	{ this.showFooter() }
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        fontFamily: 'Muli-Regular',
    },
    loading: {
        marginTop: 30
    },
    header: {
        flex: 2,
        backgroundColor: '#EB1E41',
        // backgroundColor: '#497d99',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: 16,
        fontFamily: 'Muli-Black'
    },
    buttonNav: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    displayStat: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dsContainer: {
        marginHorizontal: 30,
        alignItems: 'center',
    },
    dsVal: {
        color: 'white',
        fontSize: 80,
        // fontWeight: 'bold',
        // backgroundColor: 'black',
        fontFamily: 'Muli-SemiBold',
        marginBottom: 0
    },
    dsLabel: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        // backgroundColor: 'black'
        fontFamily: "Muli-Regular",
    },

    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    date: {
        color: 'white',
        fontSize: 18,
        marginBottom: 1,
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 10,
        fontFamily: 'Muli',
        fontWeight: '200'
    },

    content: {
        flex: 3,
        padding: 30
    },

    card: {
        // backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 24,
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,

        elevation: 2,
    },

    cardHeader: {
        // backgroundColor: 'red',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 2
    },

    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333333',
        fontFamily: 'Muli-Black',
        marginLeft: 10
    },
    cardBody: {
        flex: 5,
        // backgroundColor: 'red'
    },
    cardItem: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 2
    },
    cardItemText: {
        color: '#808080',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
        textTransform: 'uppercase'
    },
    cardFooter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardFooterText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#b3b3b3',
        marginBottom: 20
    }


})