import React, { version,useState } from 'react';
import { Text, ScrollView, View, Image ,StyleSheet, StatusBar,Alert,TouchableOpacity } from 'react-native';
import { Card, Input, Icon ,SocialIcon,Button,CheckBox   } from 'react-native-elements';
import { useSelector,useDispatch } from 'react-redux';
import {singup} from '../redux/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { Loading } from './watingComponent';
const user = ['','','','','','']
export default function Signup (props){

    const userState = useSelector(state => state.user)
    const inputRef = React.createRef();
    

    const [doctorFlag,setDoctorFlag] = useState(false);
    const [patientFlag,setPatientFlag] = useState(false);
    const [maleFlag,setMaleFlag] = useState(false);
    const [femaleFlag,setFemaleFlag] = useState(false);

    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [date, SetDate] = useState( new Date());
    const dispatch = useDispatch();
    const [speciality , SetSpeciality] = useState('');

    const itemsNumber = ["Pulmonologists","Gastroenterologists","Endocrinologists","Nephrologists","Otolaryngologists"]
    
    const pickerItems = itemsNumber.map((value,index) => 
    <Picker.Item label={value.toString()} value={value.toString()} key={index.toString()+1} />   )     
    
    
    const setUserInput = (value,index) => {
        console.log("value",value,"index",index)
        user[index]= value;

    }
    const sendingData = (userData) => {
        let type = ''
        let gender= ''
        if (doctorFlag == true){
            type='doctor'
        }else if( patientFlag == true){
            type='patient'
        }
        if(maleFlag == true){
            gender='male'
        } else if(femaleFlag == true){
            gender='female'
        }
        var newUser = {
            username:userData[0],
            password:userData[1],
            type:type,
            speciality:speciality,
            firstname:userData[2],
            lastname:userData[3],
            email:userData[4],
            gender:gender,
            birthdate:date        
          }
          console.log(newUser)
        dispatch(singup(newUser))
        /*inputRef.current.clear();*/
    }
    const ShowAlert = () =>{
        return(
            <View>{
        Alert.alert(
            'Sgin Up',
            'You are successfully Singed up ...',
            [
              
              { text: "OK", onPress: () => {props.navigation.navigate('Login'); } }
            ],
            { cancelable: false }
          )}</View>);
    }
    if(userState.status == 'succeeded sigin up'){
        return(
        <ShowAlert/>
        );
    }else if(userState.errMess){
        return(
            <View>
            <ScrollView style={{ backgroundColor:'#fff'}}> 
            <Text  style={{margin:10,fontWeight:'bold'}}>Failed to Sign Up</Text>
            <View style={{fontSize: 18,paddingLeft:10,paddingRight:10,marginTop:20}}>
            <Text >Please Try again{"\n"}</Text>

            </View>
            </ScrollView>  
            </View>   
    );}else if(userState.status == 'pending sgetReports') {
        return(
            <Loading />
        );
    }
    else{
    return(
        <ScrollView style={{flex: 1, backgroundColor:'#55A8D9'}}>
            <StatusBar backgroundColor='#55A8D9'/>
            <View style={styles.contianer}>
                <View style={styles.Image}>
                    <Image  source={require('./images/LogoSmall.png')} />
                </View>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'white',fontSize:25, fontWeight:'bold'}}>  Sign Up</Text>
                    <Text>          It's quick and easy.</Text>
                </View>
                <View style={{width:'100%'}}>
                    <Input
                        placeholder='Phone number' inputContainerStyle={{borderBottomColor:'white'}} 
                        placeholderTextColor='#D6D8DA' 
                        keyboardType='numeric'
                        onChangeText = {value  => setUserInput(value,0)}  
                        ref={inputRef}  />
                    <Input  
                        placeholder='Password' inputContainerStyle={{borderBottomColor:'white'}} 
                        placeholderTextColor='#D6D8DA'  secureTextEntry={true}
                        onChangeText = {value  => setUserInput(value,1)} 
                        ref={inputRef}  />
                </View>
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
                        checkedColor='green'
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
                        checkedColor='green'
                        checked={patientFlag}
                        onPress = {() => {setPatientFlag(!patientFlag);setDoctorFlag(false);}}
                    />
                </View>
                {(doctorFlag || patientFlag) && (<>
                <View style={{width:'100%'}}>
                    <Input  
                        placeholder='First Name' inputContainerStyle={{borderBottomColor:'white'}} 
                        placeholderTextColor='#D6D8DA'  
                        onChangeText = {value  => setUserInput(value,2)} 
                        ref={inputRef}  />
                    <Input
                        placeholder='Last Name' inputContainerStyle={{borderBottomColor:'white'}} 
                        placeholderTextColor='#D6D8DA' 
                        onChangeText = {value  => setUserInput(value,3)}  
                        ref={inputRef}  />
                    <Input
                        placeholder='Emaile' inputContainerStyle={{borderBottomColor:'white'}} 
                        placeholderTextColor='#D6D8DA' 
                        onChangeText = {value  => setUserInput(value,4)}  
                        ref={inputRef}  />
                    <TouchableOpacity
                        style={styles.DateTimePickerButton}
                        onPress={()=>setShowDateTimePicker(true)}
                            >
                        <Text style={{fontSize:17}}>Your Birthday : {date.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showDateTimePicker && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={false}
                            display="spinner"
                            onChange={(event, selectedDate) =>{SetDate(selectedDate || date);setShowDateTimePicker(false)}}
                            />
                    )}
                </View>
                {doctorFlag && (<>
                <View style={styles.pickerContianer}>
                    <Text style={{fontSize:18,marginLeft:15}}>Your speciality</Text>
                    <Picker
                        selectedValue={speciality}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            SetSpeciality(itemValue)
                        }>
                        <Picker.Item label='***' value='0' key='0' />
                        {pickerItems}
                    </Picker>
                </View>
                </>)}
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        containerStyle={styles.checkbox}
                        textStyle={{color:"#fff"}}
                        center
                        title='Male'
                        iconLeft
                        iconType='font-awesome'
                        checkedIcon='male'
                        uncheckedIcon='male'
                        checkedColor='green'
                        checked={maleFlag}
                        onPress = {() => {setMaleFlag(!maleFlag);setFemaleFlag(false);}}
                    />
                    <CheckBox
                        containerStyle={styles.checkbox}
                        textStyle={{color:"#fff"}}
                        center
                        title='Female'
                        iconLeft
                        iconType='font-awesome'
                        checkedIcon='female'
                        uncheckedIcon='female'
                        checkedColor='green'
                        checked={femaleFlag}
                        onPress = {() => {setFemaleFlag(!femaleFlag);setMaleFlag(false);}}
                    />
                </View>
                </>)}
                <View style={{}}>
                    <Text style={{fontSize:11,marginLeft:10,color:'#D6D8DA'}}>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Button 
                        icon={
                            <Icon
                            type='font-awesome' name="sign-in"
                            size={30}
                            color="white"
                            />
                        }
                        title="   Sign Up"
                        buttonStyle={styles.Button}
                        loading= {false}
                        type="outline"
                        containerStyle={{color:'white'}}
                        titleStyle={{color:'white'}}
                        onPress={()=>{sendingData(user);}}
                        />
                </View>


            </View>
        </ScrollView>
    );}

}

const styles = StyleSheet.create({
    Image: {
        margin:20,
        alignItems: 'center' ,
    },
    contianer: {
        flexDirection: 'column',
        flex: 1,
        
        backgroundColor:'#55A8D9' ,
        marginTop:10},
    Button:{
        marginTop:20,
        marginBottom:30,
        alignItems: 'center' ,
        borderRadius:20,
        width:120,
        borderColor:'white',
        borderEndWidth:1,
        },
    checkboxContainer:{
        flexDirection: 'row',
        alignSelf:'center',
        marginBottom:10,
    },
    checkbox:{
        backgroundColor:'#55A8D9' ,
        borderWidth:1,
        borderRadius:20,
    },
    DateTimePickerButton:{
        alignItems: "center",
        borderColor:'white',
        borderWidth:1,
        borderRadius:20,
        marginBottom:20,
        padding:10,
        fontSize:18
    },
    pickerContianer:{
        flexDirection:'row',
        alignItems: "center",
        borderWidth:1,
        borderRadius:20,
        borderColor:'white',
        marginBottom:15,
    },
    picker:{
        flex:1,
        marginLeft:40,

    }
  });