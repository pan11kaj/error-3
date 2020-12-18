import React, { Component } from 'react';
import { KeyboardAvoidingView,ScrollView,Modal,View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert } from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import {Icon,Input} from 'react-native-elements';
export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      isModalVisible:'false',
      firstName:'',
      contact:'',
      lastName:'',
      address:'',
      confirmPassword:''
    }
  }
  showModal = ()=>{
    return(
      <Modal 
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboard}>
              <Text style={{fontSize:RFValue(20),color:'#32867d'}}>SIGNUP</Text>
              <Text style={styles.lable}>first Name</Text>
              <TextInput
              style={styles.TextInput}
              placeholder="first Name"
              maxLength={8}
              onChangeText={(text)=>{this.setState({firstName:text})}}
              />
              <Text style={styles.lable}>last Name</Text>
                    <TextInput
              style={styles.TextInput}
              placeholder="Last Name"
              maxLength={8}
              onChangeText={(text)=>{this.setState({lastName:text})}}
              />
              <Text style={styles.lable}>contact</Text>
                    <TextInput
              style={styles.TextInput}
              placeholder="contact"
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{this.setState({contact:text})}}
              />
              <Text style={styles.lable}>Address</Text>
                    <TextInput
              style={styles.TextInput}
              placeholder="Address"
              multiline={true}
              onChangeText={(text)=>{this.setState({address:text})}}
              />
              <Text style={styles.lable}>email</Text>
                    <TextInput
              style={styles.TextInput}
              placeholder="email"
              keyboardType={'email-address'}
              onChangeText={(text)=>{this.setState({emailId:text})}}

              />
              <Text style={styles.lable}>Password</Text>
                    <TextInput
              style={styles.TextInput}
              secureTextEntry={true}
              placeholder="Password"
     
              onChangeText={(text)=>{this.setState({password:text})}}
              />
              <Text style={styles.lable}>Confirm Password</Text>
                    <TextInput
              style={styles.TextInput}
              secureTextEntry={true}
              placeholder="Confirm password"
              maxLength={8}
              onChangeText={(text)=>{this.setState({confirmPassword:text})}}
              />
              <View style={{flex:0.2,alignItems:'center'}}><TouchableOpacity style={styles.registerButton} onPress={()=>{this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}}>
                <Text style={styles.registerButtontext}>Register</Text></TouchableOpacity></View>
                <View style={styles.modalBackButton}>
                  <TouchableOpacity style={styles.cancelButton} onPress={()=>this.setState({"isModalVisible":false})}>
                    <Text style={styles.cancelButtonText}>
                    Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }
   
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.props.navigation.navigate('DonateBooks')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password,confirmPassword) =>{
     if(password !== confirmPassword)
     { 
       return Alert.alert("password doesn't match\nCheck your password.") }
     else{ firebase.auth().createUserWithEmailAndPassword(emailId, password) 
      .then(()=>{ 
        db.collection('users').add({ 
          first_name:this.state.firstName,
           last_name:this.state.lastName,
            contact:this.state.contact,
            email_id:this.state.emailId, address:this.state.address ,
            isBookRequest:'false'
          }) 
            
            return Alert.alert( 'User Added Successfully', '', [ {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})}, ] ); }) 
            .catch((error)=> { // Handle Errors here.
     var errorCode = error.code; 
     var errorMessage = error.message; 
     return Alert.alert(errorMessage) });
     } }

  
  

  render(){
    return(
      <View style={styles.container}>{this.showModal()}
         <View style={{justifyContent:'center',alignItems:'center'}}>
         <View style={{flex:0.25}}/>
         <View style={{flex:0.15}}/>
         <View style={{flex:0.85,justifyContent:'center',alignItems:'center',padding:RFValue(10)}}>
       <Image
       source={require('../assets/santa.png')} style={{height:'100%',width:'70%',resizeMode:'stretch'}}/>

         </View></View><View style={{flex:0.45}}></View>
         <View style={{justifyContent:'center',alignItems:'center',flex:0.24}}></View>
        <View style={styles.profileContainer}>
         
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>this.setState({"isModalVisible":true})}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}


const styles = StyleSheet.create({ cancelButtonText:{ fontSize : RFValue(20), fontWeight:'bold', color: "#32867d", marginTop:RFValue(10) },scrollview:{ flex: 1, backgroundColor: "#fff" }, signupView:{ flex:0.05, justifyContent:'center', alignItems:'center' }, signupText:{ fontSize:RFValue(20), fontWeight:"bold", color:"#32867d" }, santaView:{ flex:0.85, justifyContent:"center", alignItems:"center", padding:RFValue(10) }, santaImage:{ width:"70%", height:"100%", resizeMode:"stretch" }, TextInput:{ flex:0.5, alignItems:"center", justifyContent:"center" }, bookImage:{ width:"100%", height:RFValue(220) } });
