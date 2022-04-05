import React from "react";
import {
        View,
        Text,
        TextInput,
        Image,
        StyleSheet,
        StatusBar,
        TouchableOpacity,
        LayoutAnimation,
        SafeAreaView,
        ScrollView
        } from "react-native";

import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import UserPermission from "../utilities/UserPermission";
import * as firebase from 'firebase'

// firebase.initializeApp(config);
var db = firebase.firestore();

export default class ProfileScreen extends React.Component {
    writeuserdata(name,emails,passwords,phonenos,platenos,avatars,uid){
        // firebase.database().ref('users/' + uid).set({
        console.log('data', this.state.uid)
        db.collection("users").doc(uid).set({
            displayName: this.state.displayName,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            plateNo: this.state.plateNo,
            // birthdate,
            photoURL: this.state.photoURL
        }).then((data) => {
            console.log('data', data)
        }).catch((error) => {
            console.log('error', error)
        })
    }

    state = {
        displayName: "",
        email: "",
        password: "",
        phoneno: "",
        plateno: "",
        birthdate: "",
        avatar: null
    };

    componentDidMount() {
        const {email, displayName, password} = firebase.auth().currentUser;
        
        this.setState({ email, displayName, password});  
        const uid=firebase.auth().currentUser.uid;
        this.setState({uid});

        var docRef = db.collection("users").doc(uid);

        docRef.get().then((doc) => {
            if (doc.exists) {

                const {phoneNumber, plateNo, photoURL}=doc.data();

                this.setState({phoneNumber, plateNo, photoURL});

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    handlePickAvatar = async () => {
        UserPermission.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if (!result.cancelled) {
            this.setState({ photoURL: result.uri });
           
        }
    };

    // handleSignUp = () => {
    //     firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(
    //             this.state.email,
    //             this.state.password,
    //             this.state.phoneno,
    //             this.state.plateno,
    //             this.state.birthdate
    //         )
    //         .then(userCredentials => {
    //             return userCredentials.user.updateProfile({
    //                 displayName: this.state.name
    //             });
    //         })
    //         .catch(error => this.setState({ errorMessage: error.message }));
    // };

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"></StatusBar>
                <SafeAreaView style={styles.headerWrapper}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerText}>Profile</Text>
                        </View>
                        <View
                            style={{
                                width: 30,
                            }}
                        />
                    </View>

                </SafeAreaView>

                <View style={{position: "absolute", top: 110, alignItems: "center", width: "100%"}}>
                    {/* <Text style={styles.greeting}>{'Hello.\nSign up to get started.'}</Text> */}
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.photoURL }} style={styles.avatar} />
                        <Ionicons
                            name="add-outline"
                            size={50}
                            color="#808080"
                            style={{marginTop: 6, marginLeft: 2, zIndex: -1}}>
                        </Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={{top: 10, width: "100%"}}>
                    {/* <Text style={styles.greeting}>{'Hello.\nSign up to get started.'}</Text> */}
                    <TouchableOpacity onPress={this.writeuserdata}>
                        <Ionicons
                            name="save-outline"
                            size={30}
                            color="#000000"
                            style={{marginTop: 4, marginLeft: 370}}
                            onPress = {() => this.writeuserdata(
                                this.state.displayName,
                                this.state.email,
                                this.state.password,
                                this.state.phoneno,
                                this.state.plateno,
                                this.state.avatar,
                                this.state.uid
                            )}                            
                        ></Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={styles.name}>
                    <View>
                    {/* {this.state.displayName} */}
                        <Text style={styles.title} style={{ fontSize: 20, fontFamily: 'Optima'}}>{this.state.displayName}</Text>
                    </View>
                </View>

                <View style={styles.contain}>
                    <ScrollView>
                       <View style={styles.form}>
                            <ScrollView style={{ marginBottom: 40, marginHorizontal: 30}}>

                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Email Address</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}
                                ></TextInput>
                            </View>

                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password}
                                ></TextInput>
                            </View>

                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Phone Number</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                    value={this.state.phoneNumber}
                                ></TextInput>
                            </View>

                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Vehicle Plate No.</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={(plateNo) => this.setState({ plateNo })}
                                    value={this.state.plateNo}
                                ></TextInput>
                            </View>

                            {/* <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Birth Date</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={(birthdate) => this.setState({ birthdate })}
                                    value={this.state.birthdate}
                                ></TextInput>
                            </View> */}

                            <View style={{ marginTop: 32 }}>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.signOutUser}>
                                    <Text style={{ color: '#ED2939' }}>
                                        <Ionicons
                                            name="log-out-outline"
                                            size={20}
                                        ></Ionicons>
                                        <Text style={{ fontSize: 20, fontFamily: 'Avenir' }}>Logout</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center"
    },
    headerWrapper: {
        backgroundColor: '#E7E3D7',
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
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    // save: {
    //     color: '#002147'
    // },
    name: {
        alignItems: 'center',
        marginTop: 100,
        fontSize: 30
    },
    contain: {
        marginTop: 40
    },
    // form: {
    //     marginBottom: 40,
    //     marginHorizontal: 30
    // },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
});