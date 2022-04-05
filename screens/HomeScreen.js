import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase'


//var db = firebase.firestore();

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: ""
    };

    componentDidMount() {
        const {email, displayName} = firebase.auth().currentUser;

        this.setState({ email, displayName });

        
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"></StatusBar>
                <SafeAreaView style={styles.headerWrapper}>
                    <View style={styles.header}>
                        {/* <View>
                            <Ionicons name="chevron-back" size={30} style={styles.iconBlack}></Ionicons>
                        </View> */}
                        <View>
                            <Text style={styles.headerText}>Parkerly</Text>
                        </View>
                        <View
                            style={{
                                width: 30,
                            }}
                        />
                    </View>
                    <View>
                        {/* <Splash width= '   80' height= '80' /> */}
                    </View>
                </SafeAreaView>

                {/* <View style={styles.outerlayer}> */}
                    <View style={styles.content}>
                        <View style={{top: 10, width: "100%"}}>
                            {/* <Text style={styles.greeting}>{'Hello.\nSign up to get started.'}</Text> */}
                            <TouchableOpacity onPress={this.handleSignUp}>
                                <Ionicons
                                    name="share-social-outline"
                                    size={30}
                                    color="#000000"
                                    style={{marginTop: 4, marginLeft: 330}}>
                                </Ionicons>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.title}>{this.state.displayName}</Text>
                        </View>

                        <View>
                            <Text style={{
                                fontSize: 30,
                                color: '#707070',
                                borderColor: '#E7E3D7',
                                // backgroundColor: '#E7E3D7',
                                borderRadius: 10,
                                borderWidth: 5,
                            }}>JHR 1999</Text>
                        </View>

                        <View>
                            <Image
                                source={{uri: "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=" + this.state.phoneNumber}}
                                style={{ width: 300, height: 300 }}
                            ></Image>
                        </View>
                        <View>
                            <Text style= {{ marginVertical: 30, fontSize: 20 }}>
                                Share your QR code with others
                            </Text>
                        </View>
                    </View>
                {/* </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: '#f7f7f7'
    },
    headerWrapper: {
        backgroundColor: '#E7E3D7',
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconBlack: {
        color: '#696969'
    },
    headerText: {
        fontWeight: 'bold',
        color: '#696969',
        fontSize: 25
    },
    // outerlayer: {
    //     alignItems: "center",
    //     marginHorizontal: 30,
    //     paddingHorizontal: 30,
    //     backgroundColor: '#E7E3D7',
    //     borderRadius: 15,
    //     marginTop: 60,
    // },
    content: {
        alignItems: "center",
        // marginHorizontal: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F3EFE4',
        borderRadius: 50,
        marginTop: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#2d2d2d',
        paddingVertical: 20
    }
});