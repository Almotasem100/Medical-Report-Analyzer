import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Bar from './BarComponent'
const ContactView = ()=>{
    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}> 
            <Card>
                <Card.Title><Text>Contact Information</Text></Card.Title>
                <Card.Divider/>
                <Text>121, Clear Water Bay Road{"\n"}{"\n"} 
                Clear Water Bay, Kowloon {"\n"}{"\n"}
                HONG KONG {"\n"}{"\n"}
                Tel: +852 1234 5678 {"\n"}{"\n"}
                Fax: +852 8765 4321 {"\n"}{"\n"}
                Email:confusion@food.net</Text>
            </Card>
        </Animatable.View>
    );
}

function Contact ({navigation}){

        
        return(
            <View>
                <Bar navigation={navigation}/>
                <ContactView/>
            </View>
        );
}

export default Contact;