import React, { version,useState } from 'react';
import { Text, ScrollView, View, Image ,StyleSheet, StatusBar,Alert  ,TouchableOpacity } from 'react-native';
import { Card, Input, Icon ,SocialIcon,Button,CheckBox  } from 'react-native-elements';
import { useSelector,useDispatch } from 'react-redux';
import {signin,USER_TYPE} from '../redux/user';

export default function Login (props){
    const { navigate } = props.navigation;
    const [phoneNumber, setphoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [doctorFlag,setDoctorFlag] = useState(false);
    const [patientFlag,setPatientFlag] = useState(false);
    const phoneNumberRef = React.createRef();
    const passwordRef = React.createRef();
    const dispatch = useDispatch();

    const signingin = (phoneNumber,password) => {
        var type = doctorFlag ? 'doctor':'patient';
        dispatch(USER_TYPE(type));
        if(doctorFlag && password && phoneNumber){
            const userIn = {
                username:phoneNumber,
                password:password,
                type:type
              }
            
            dispatch(signin(userIn));
            setphoneNumber(''); setPassword('');
            phoneNumberRef.current.clear();passwordRef.current.clear();
        }
        else if(patientFlag && password && phoneNumber) {
            const userIn = {
                username:phoneNumber,
                password:password,
                type:type
              }
            dispatch(signin(userIn))
            setphoneNumber(''); setPassword('');
            phoneNumberRef.current.clear();passwordRef.current.clear();
        }
        else{
            Alert.alert(
                "faild to Sign In",
                "please fill all the fields",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
    }

    return(
        <ScrollView style={{ backgroundColor:'#55A8D9'}}>
            <StatusBar backgroundColor='#55A8D9'/>
            <View style={styles.contianer}>
                <Image style={styles.Image} source={require('./images/LogoSmall.png')} />
                <View style={{width:'80%'}}>
                    <Input  
                        placeholder='phone number' inputContainerStyle={{borderBottomColor:'white'}} 
                        textContentType='username' placeholderTextColor='#D6D8DA' 
                        keyboardType='numeric' 
                        leftIcon={ <Icon style={{marginRight:20}} type='font-awesome' name='user' size={24} color='white'/>}
                        onChangeText = {value  => setphoneNumber(value)} 
                        ref={phoneNumberRef}
                    />
                    <Input  
                        placeholder='Password' inputContainerStyle={{borderBottomColor:'white'}} 
                        textContentType ='password' placeholderTextColor='#D6D8DA'  secureTextEntry={true} 
                        leftIcon={ <Icon style={{marginRight:20}} type='font-awesome' name='unlock-alt' size={24} color='white'/>}
                        onChangeText = {value  => setPassword(value)} 
                        ref={passwordRef}
                    />
                    <View style={styles.checkboxContainer}>
                    <CheckBox
                        containerStyle={styles.checkbox}
                        textStyle={{color:"#fff"}}
                        center
                        title='Doctor'
                        iconLeft
                        iconType='font-awesome'
                        checkedIcon='user-md'
                        uncheckedIcon='user-md'
                        checkedColor='blue'
                        checked={doctorFlag}
                        onPress = {() => {setDoctorFlag(!doctorFlag);setPatientFlag(false);}}
                    />
                    <CheckBox
                        containerStyle={styles.checkbox}
                        textStyle={{color:"#fff"}}
                        center
                        title='Patient'
                        iconLeft
                        iconType='font-awesome'
                        checkedIcon='user'
                        uncheckedIcon='user'
                        checkedColor='blue'
                        checked={patientFlag}
                        onPress = {() => {setPatientFlag(!patientFlag);setDoctorFlag(false);}}
                    />
                </View>
                    <TouchableOpacity
                        style={{marginLeft:180,marginBottom:10}}
                        onPress={()=>{}}
                    >
                        <Text>Forget Password ?</Text>
                    </TouchableOpacity>
                </View>
                <Button 
                    icon={
                        <Icon
                        type='font-awesome' name="sign-in"
                        size={30}
                        color="white"
                        />
                    }
                    title="   Sign in"
                    buttonStyle={styles.Button}
                    loading= {false}
                    type="outline"
                    containerStyle={{color:'white'}}
                    titleStyle={{color:'white'}}
                    onPress={()=>{signingin(phoneNumber,password);}}

                    />
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                        <Text>Don't have an accoun?</Text>
                        <TouchableOpacity
                            onPress={()=>navigate('Signup')}
                        >
                            <Text style={{color:'white',fontSize:15}}>  Sign Up</Text>
                        </TouchableOpacity>
                </View>
                <View style={{marginTop:20,width:300,height:50,marginBottom:90}}>
                    <SocialIcon title='Sign In With Facebook'
                    button
                    type='facebook'
                    onPress={()=>{}}
                    />
                    <SocialIcon
                    title='Sign In With Google'
                    button
                    type='google'
                    onPress={()=>{}}
                    />
                </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    Image: {margin:20},
    contianer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center' ,
        backgroundColor:'#55A8D9' ,
        marginTop:60},
    Button:{
        marginTop:10,
        borderRadius:20,
        width:120,
        borderColor:'white',
        borderEndWidth:1,
        },
    checkboxContainer:{
            flexDirection: 'row',
            alignSelf:'center',
            marginTop:0,
            marginBottom:10,
            padding:0,
        },
    checkbox:{
            backgroundColor:'#55A8D9' ,
            borderWidth:1,
            borderRadius:20,
            padding:7,
        },

  });