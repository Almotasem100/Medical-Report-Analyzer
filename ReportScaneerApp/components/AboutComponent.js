
import React from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Bar from './BarComponent';



const ContactView = ()=>{
    return(
        <Card>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card.Title><Text>Our History</Text></Card.Title>
                <Card.Divider/>
                <Text>Started in 2020, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world 
                    fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star 
                    Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.{"\n"}</Text>
                <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
            </Animatable.View>
        </Card>
    );
}
function About ({navigation}){

    return(
        <View>
            <Bar navigation={navigation}/>
            <ScrollView>
                <ContactView/>
            </ScrollView>
        </View>
    );
}

export default About;