
import {View,ScrollView,StyleSheet,StatusBar } from 'react-native';
import {Icon,Text,Divider  } from 'react-native-elements';
import React from 'react';
import Hyperlink from 'react-native-hyperlink';
import {DrawerActions } from '@react-navigation/native';
const HGBexclamation = ({navigation}) =>{

    return(
        <View>
            <StatusBar backgroundColor='#55A8D9'/>
                <View style={styles.WelcomBar}>
                    <Icon name="menu" size={30} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>
                    <Text style={styles.WelcomBarText}>
                        HGB
                    </Text>
                </View>
        <ScrollView style={{ backgroundColor:'#fff'}}> 
            <Hyperlink
            linkDefault
            linkStyle={ { color: '#2980b9', fontSize: 15 } }
            linkText={ (url) => url === 'https://www.healthline.com/health/serum-hemoglobin' ? 'hemoglobin (Hgb) test' : 
            url === 'https://www.healthline.com/nutrition/10-reasons-you-are-tired' ? 'exhaustion' : 
            url === 'https://www.healthline.com/symptom/dizziness'? 'dizziness': 
            url === 'https://www.healthline.com/health/breathing-difficulties'? 'shortness of breath':
            url === 'https://www.healthline.com/health/normal-hemoglobin-levels'? 'typical ranges':
            url === 'https://www.healthline.com/health/hgb#uses'? 'complete blood count (CBC)':
            url === 'https://www.healthline.com/health/sickle-cell-anemia' ? ' sickle cell anemia' :
            url === 'https://www.healthline.com/nutrition/healthy-iron-rich-foods' ? 'diet' :
            url === 'https://www.healthline.com/health/anemia' ? 'anemia' :
            url === 'https://www.healthline.com/health/rbc-count' ? 'red blood cell count':
            url === 'https://www.healthline.com/health/hematocrit' ? 'hematocrit' :
            url === 'https://www.healthline.com/health/paleness' ? ' skin paleness':
            url === 'https://www.healthline.com/health/abnormal-heart-rhythms' ? 'abnormal ':
            url === 'https://www.healthline.com/health/paroxysmal-supraventricular-tachycardia-psvt' ? 'rapid heartbeat' :
            url === 'https://www.healthline.com/health/causes-of-chest-pain' ? 'pain in your chest' :
            url === 'https://www.healthline.com/health/headache' ? 'headache':
            url === 'https://www.healthline.com/health/fatigue' ? 'fatigue':
            url === 'https://www.healthline.com/health/folate-deficiency' ? 'folate' :
            url === 'https://www.healthline.com/nutrition/vitamin-b12-deficiency-symptoms' ? 'vitamin B-12' :
            url === 'https://www.healthline.com/health/gastric-cancer' ? 'stomach' :
            url === 'https://www.healthline.com/health/colon-cancer' ? 'colon cancer' :
            url === 'https://www.healthline.com/health/sickle-cell-anemia' ? 'a genetic condition' :
            url === 'https://www.healthline.com/health/hypothyroidism/symptoms-treatments-more' ? 'doesn’t produce enough thyroid hormones' :
            url === 'https://www.healthline.com/health/splenomegaly' ? 'enlarged spleen ' :
            url === 'https://www.healthline.com/health/leukemia' ? 'leukemia' :
            url === 'https://www.healthline.com/health/chronic-kidney-disease' ? 'kidneys don’t function properly' :
            url === 'https://www.healthline.com/health/polycythemia-vera' ? 'Polycythemia vera':
            url === 'https://www.healthline.com/health/bruises-easily' ? 'easily bruised':
            url === 'https://www.healthline.com/health/joint-swelling' ? 'joint swelling':
            url === 'https://www.healthline.com/health/jaundice-yellow-skin' ? 'jaundice':
            url === 'https://www.healthline.com/health/copd' ? 'condition':
            url === 'https://www.healthline.com/health/dehydration' ? 'dehydrated':
            url === 'https://www.healthline.com/health/heart-failure' ? 'heart failure':
            url === 'https://www.healthline.com/health/liver-cancer' ? 'liver':
            url === 'https://www.healthline.com/health/kidney-cancer' ? 'kidneys':
            url
            }
            >     
            <Text h3 style={{margin:10}}>What is the Hgb test?</Text>
            <Divider
                orientation="horizontal"
                />
            <View style={{fontSize: 18,paddingLeft:10,paddingRight:10,marginTop:20}}>
                
                <Text>
                    The https://www.healthline.com/health/serum-hemoglobin measures how much hemoglobin your red blood cells contain.{"\n"}{"\n"}

                    Hgb is a protein produced by your bone marrow that’s stored in red blood cells. It helps red blood cells transport oxygen 
                        from your lungs to your body through your arteries.{"\n"}{"\n"}

                    It also transports carbon dioxide (CO2) from around your body back to your lungs through your veins.
                    Hgb is what makes red blood cells look red.{"\n"}{"\n"}

                    Abnormally high or low Hgb can cause symptoms like https://www.healthline.com/nutrition/10-reasons-you-are-tired,
                    https://www.healthline.com/symptom/dizziness, or https://www.healthline.com/health/breathing-difficulties. Your doctor may suggest an Hgb test if you’re experiencing these symptoms.
                    You may have an underlying condition that needs to be diagnosed.{"\n"}{"\n"}

                    Learn why you may need an Hgb test, what the https://www.healthline.com/health/normal-hemoglobin-levels are for Hgb,
                    and what can cause abnormal Hgb levels.{"\n"}{"\n"}

                </Text>
                <Divider
                orientation="horizontal"
                />
                <Text h4 style={{margin:10}}> Why do I need the Hgb test?</Text>
                <Divider
                orientation="horizontal"
                />
                <Text>
                    {"\n"}
                    The Hgb test uses a sample of your blood to determine hemoglobin levels.{"\n"}{"\n"}

                    To take a sample, your healthcare provider extracts blood from a vein by pricking
                    your finger or inserting a needle with an attached tube into the crease of your arm.
                    The sample is then stored in the tube to be analyzed later at a lab.{"\n"}{"\n"}

                    The needle may cause brief discomfort, but the insertion usually lasts less than a minute.
                    If you’re sensitive to getting blood drawn or the sight of blood, have someone come with
                    you and let your provider know.{"\n"}{"\n"}

                    The Hgb test may be ordered as part of a https://www.healthline.com/health/hgb#uses test.
                    A CBC test also measures other important components of your blood,
                    such as white blood cells and platelets. Abnormal levels of any of these cells can
                    indicate underlying conditions or blood disorders.{"\n"}{"\n"}
                </Text>
                
                <Text style={{fontWeight:'bold'}}>

                Here are a few other reasons your doctor may order an Hgb test:{"\n"}{"\n"}
                </Text>
                <View style={{marginLeft:10}}>
                    <Text  >
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'red'/>  You have parents or other family members who have blood disorders, such as https://www.healthline.com/health/sickle-cell-anemia.{"\n"}
                    </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/>   You have an infection.{"\n"}
                    </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/>   You don’t have enough iron in your https://www.healthline.com/health/serum-hemoglobin.{"\n"}
                    </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/>   You’ve lost a lot of blood after surgery or a traumatic injury.{"\n"}
                    </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/>   You’re pregnant.{"\n"}
                    </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/>   You have a medical condition that can affect your Hgb levels.{"\n"}{"\n"}
                    </Text>
                </View>
                <Text >
                You don’t need to fast for the Hgb test specifically. You may need to fast — avoiding food or liquids with calories for
                 about 12 hours — if your doctor plans to test the chemistry of your blood at the same time.
                  You should drink plenty of water, however.{"\n"}{"\n"}
                </Text>
                <Divider
                orientation="horizontal"
                />
                <Text h4 style={{margin:5}}> What are the ranges for the test results?</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{marginTop:20}}>Your age and gender both affect your Hgb levels. Typical healthy Hgb levels are as follows:{"\n"}{"\n"}{"\n"}</Text>
                <Divider
                orientation="horizontal"
                />
                <Text h4 style={{margin:5}}> What are the symptoms of low hemoglobin?</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{marginTop:20}}>
                Low Hgb is also known as https://www.healthline.com/health/anemia, which means that you don’t have enough red blood cells in your body.{"\n"}{"\n"}

                With anemia, a blood test will also show that you have a low https://www.healthline.com/health/rbc-count and may have low https://www.healthline.com/health/hematocrit,
                 the volume of red blood cells to other components in your blood.{"\n"}
                 </Text>
                 <Text style={{fontWeight:'bold'}}>
                Anemia can have many causes, so symptoms vary widely. Common anemia symptoms can include:{"\n"}
                </Text>
                 <View style={{marginLeft:10}}>
                 <Text  >
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'red'/> exhaustion{"\n"}
                    </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/>
                https://www.healthline.com/health/paleness{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> shortness of breath{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> https://www.healthline.com/health/abnormal-heart-rhythms or https://www.healthline.com/health/paroxysmal-supraventricular-tachycardia-psvt{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> https://www.healthline.com/health/causes-of-chest-pain{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> cold, swollen hands or feet{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> https://www.healthline.com/health/headache{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> trouble with physical activity{"\n"}{"\n"}
                </Text>
                </View>
                    <Text  >  
                While exhaustion or https://www.healthline.com/health/fatigue isn’t a cause of low hemoglobin, it can be a symptom. A lower than normal 
                    amount of hemoglobin can result in decreased oxygen delivery to vital organs and muscles, resulting 
                    in fatigue or a lack of energy.{"\n"}{"\n"}</Text>
                
                <Divider
                orientation="horizontal"
                />
                <Text h4 style={{margin:5}}> What are the causes of low hemoglobin?</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{marginTop:20}}>
                Low Hgb levels can be caused by any condition that affects your body’s
                 ability to create red blood cells or conditions that lower red blood cells in your bloodstream.{"\n"}{"\n"}
                 </Text>
                 <Text style={{fontWeight:'bold'}}>
                Possible causes of low Hgb include:{"\n"}
                </Text>
                <View style={{marginLeft:10}}>
                <Text  >
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'red'/> lack of iron in your diet, which makes it harder for your bone marrow to produce Hgb{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> lack of https://www.healthline.com/health/folate-deficiency or https://www.healthline.com/nutrition/vitamin-b12-deficiency-symptoms, which can lead to your body producing fewer red blood cells
                 than are needed{"\n"}
                 </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> severe blood loss after surgery or a major injury{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> internal bleeding from stomach ulcers, https://www.healthline.com/health/gastric-cancer or https://www.healthline.com/health/colon-cancer, or internal injuries{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> sickle cell anemia, https://www.healthline.com/health/sickle-cell-anemia that causes red blood cells to be abnormally sickle-shaped
                 and able to carry less Hgb{"\n"}
                 </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> hypothyroidism, which means that the thyroid gland https://www.healthline.com/health/hypothyroidism/symptoms-treatments-more{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> splenomegaly, or an https://www.healthline.com/health/splenomegaly from infection, liver conditions, or cancer{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> bone marrow conditions, such as https://www.healthline.com/health/leukemia, that prevent your bone marrow from producing
                 enough red blood cells{"\n"}
                 </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> chronic kidney disease, in which your https://www.healthline.com/health/chronic-kidney-disease
                 (resulting in a deficiency of erythropoietin, a hormone that stimulates
                  red blood cell production in your bone marrow){"\n"}
                  </Text>
                </View>
                
                <Text style={{fontWeight:'bold'}}>Other causes can include:{"\n"}</Text>
                <View style={{marginLeft:10}}>
                <Text  >
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'red'/> donating blood too often{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> heavy bleeding during your period{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> alcohol misuse{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> chronic health problems such as autoimmune diseases or cancer{"\n"}{"\n"}
                    </Text>
                </View>
                <Divider
                orientation="horizontal"
                />
                <Text h4 style={{margin:5}}> What are the symptoms of high hemoglobin?</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{marginTop:20}}>
                High Hgb is known as polycythemia. This means you have too many red blood cells.{"\n"}{"\n"}

                https://www.healthline.com/health/polycythemia-vera is a cancer of the blood in which your bone marrow overproduces red blood cells.{"\n"}{"\n"}

                With polycythemia, a blood test also shows that you have a high red blood cell count and high hematocrit.{"\n"}{"\n"}
                </Text>
                <Text style={{fontWeight:'bold'}}>
                Common symptoms of high Hgb levels include:{"\n"}</Text>
                <View style={{marginLeft:10}}>  
                <Text  >
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'red'/> itchiness{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> headache{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> dizziness{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> getting https://www.healthline.com/health/bruises-easily or bleeding{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> sweating more than usual{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> painful https://www.healthline.com/health/joint-swelling{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> abnormal weight loss{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> a yellow tint to the eyes and skin (https://www.healthline.com/health/jaundice-yellow-skin){"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> feeling exhausted{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> a purple or reddish tint to the skin{"\n"}</Text>
                </View>
                <Divider
                orientation="horizontal"
                />
                <Text h4 style={{margin:5}}> What are the causes of high hemoglobin?</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{marginTop:20}}>
                High Hgb may result from your body needing to store more Hgb in red blood cells
                 due to your environment, a condition that affects your heart or lung function, or lifestyle choices.{"\n"}{"\n"}
                </Text>
                <Text style={{fontWeight:'bold'}}>
                Possible causes of high Hgb levels include:{"\n"}</Text>

                <View style={{marginLeft:10}}>
                <Text  >
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'red'/> <Text style={{fontWeight:'bold'}}>living at high altitudes</Text> where there’s not as much oxygen in the air, such as in the mountains{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> <Text style={{fontWeight:'bold'}}>smoking tobacco products</Text>, including cigarettes or cigars{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> <Text style={{fontWeight:'bold'}}>Xchronic obstructive pulmonary disease (COPD)</Text>, a https://www.healthline.com/health/copd that 
                     inflames the lungs and blocks air from getting into your lungs{"\n"}
                     </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> <Text style={{fontWeight:'bold'}}>heart or lung diseases</Text> that affect your ability to breathe, your lungs’ ability to pass oxygen into your bloodstream,
                 or your heart’s ability to pump normally{"\n"}
                 </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> <Text style={{fontWeight:'bold'}}>taking erythropoietin unnecessarily</Text>, such as to enhance high-level physical performance{"\n"}{"\n"}
                </Text>
                </View>

                <Text>Other causes include:{"\n"}</Text>

                <View style={{marginLeft:10}}>
                <Text  >
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'red'/> being severely https://www.healthline.com/health/dehydration{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> https://www.healthline.com/health/heart-failure{"\n"}
                </Text>
                    <Text  >
                    <Icon   name="circle" type='font-awesome' 
                    size={8} color= 'red'/> cancer of the https://www.healthline.com/health/liver-cancer or https://www.healthline.com/health/kidney-cancer{"\n"}{"\n"}
                </Text>
                </View>

                <Divider
                orientation="horizontal"
                />
                <Text h4 style={{margin:5}}> The takeaway</Text> 
                <Divider
                orientation="horizontal"
                />
                <Text style={{marginTop:20}}>
                Your doctor may recommend a Hgb test if you have symptoms of abnormal Hgb levels or if you’re 
                pregnant.{"\n"}{"\n"}

                The earlier you notice the symptoms of abnormal Hgb levels and have the cause diagnosed,
                 the more likely you are to have successful treatment.{"\n"}{"\n"}

                See your doctor if you’re experiencing any symptoms of high or low Hgb. If you have a family 
                history of blood disorders or conditions that can affect bone marrow or red blood cell 
                production, you’ll likely need regular Hgb tests along with a CBC to monitor how these 
                health problems may be affecting your blood cells.{"\n"}{"\n"}
                </Text>
                
            </View>
            </Hyperlink>
        </ScrollView> 
    </View>

    );
}
const RBCexclamation = ({navigation}) =>{

    return(
        <View>
            <StatusBar backgroundColor='#55A8D9'/>
                <View style={styles.WelcomBar}>
                    <Icon name="menu" size={30} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>
                    <Text style={styles.WelcomBarText}>
                        RBC
                    </Text>
                </View>
            <ScrollView style={{ backgroundColor:'#fff'}}> 
                <Hyperlink
                linkDefault
                linkStyle={ { color: '#2980b9', fontSize: 15 } }
                linkText={ (url) => url === 'https://www.nhs.uk/conditions/iron-deficiency-anaemia/' ? 'iron deficiency anaemia' : 
                url === 'https://www.nhs.uk/conditions/vitamin-b12-or-folate-deficiency-anaemia/' ? 'B12 or folate deficiency.' : 
                url === 'https://www.nhs.uk/conditions/kidney-disease/'? 'kidney disease': 
                url === 'https://www.nhs.uk/conditions/malnutrition/'? 'malnutrition':
                url === 'https://www.nhs.uk/live-well/quit-smoking/'? 'smoking':
                url === 'https://www.nhs.uk/conditions/congenital-heart-disease/'? 'congenital heart disease':
                url === 'https://www.nhs.uk/conditions/dehydration/' ? 'dehydration' :
                url === 'https://www.nhs.uk/conditions/diarrhoea-and-vomiting/' ? 'diarrhoea' :
                url === 'https://www.nhs.uk/conditions/idiopathic-pulmonary-fibrosis/' ? 'pulmonary fibrosis' :
                url === 'https://labtestsonline.org.uk/tests/red-blood-cell-count' ? 'red blood cell count':
                url 
                }
                >
                    <Text h3 style={{margin:10}}>Red blood cell count</Text>
                    <Divider
                        orientation="horizontal"
                        />
                    <View style={{fontSize: 18,paddingLeft:10,paddingRight:10,marginTop:20}}>
                    <Text style={{fontWeight:'bold'}}>A red blood cell (RBC) count is a blood test that tells you how many red blood cells you have.{"\n"}</Text>

                    <Text>Red blood cells contain a substance called haemoglobin, which transports oxygen around the body. {"\n"}{"\n"}

                     The amount of oxygen that's delivered to your body's tissues depends on the number of red blood cells you have and how well they work. {"\n"}{"\n"}

                     A RBC count is usually carried out as part of a full blood cell (FBC) count. {"\n"}{"\n"}

                     Women usually have a lower RBC count than men, and the level of red blood cells tends to decrease with age.{"\n"}{"\n"}
                     </Text>

                     <Text>A normal RBC count would be:{"\n"}</Text>

                    <Text style={{marginLeft:10}}><Icon name="circle" type='font-awesome' 
                    size={8} color= 'black'/><Text style={{fontWeight:'bold'}}> men</Text> – 4.7 to 6.1 million cells per microlitre (cells/mcL){"\n"}
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'black'/><Text style={{fontWeight:'bold'}}> women</Text> – 4.2 to 5.4 million cells/mcL{"\n"}</Text>
                    <Text>The results of an RBC count can be used to help diagnose blood-related conditions, such as https://www.nhs.uk/conditions/iron-deficiency-anaemia/ (where there are less red blood cells than normal).{"\n"}{"\n"}
                    
                    A low RBC count could also indicate a vitamin B6, https://www.nhs.uk/conditions/vitamin-b12-or-folate-deficiency-anaemia/.{"\n"}{"\n"}

                    It may also signify internal bleeding, https://www.nhs.uk/conditions/kidney-disease/ or https://www.nhs.uk/conditions/malnutrition/ (where a person's diet doesn't contain enough nutrients to meet their body's needs).{"\n"}{"\n"}

                    A high RBC count could be caused by a number of health conditions or health-related factors, including:{"\n"}
                    </Text>
                    <View style={{marginLeft:10,marginBottom:0}}>
                    <Text><Icon name="circle" type='font-awesome' 
                    size={8} color= 'black'/> https://www.nhs.uk/live-well/quit-smoking/{"\n"}
                    </Text>
                    <Text>
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'black'/> https://www.nhs.uk/conditions/congenital-heart-disease/{"\n"}
                    </Text>
                    <Text>
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'black'/> https://www.nhs.uk/conditions/dehydration/ (for example, from severe https://www.nhs.uk/conditions/diarrhoea-and-vomiting/){"\n"}
                    </Text>
                    <Text>
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'black'/> low blood oxygen levels (hypoxia){"\n"}
                    </Text>
                    <Text>
                    <Icon name="circle" type='font-awesome' 
                    size={8} color= 'black'/> https://www.nhs.uk/conditions/idiopathic-pulmonary-fibrosis/ (a lung condition that causes scarring of the lungs){"\n"}{"\n"}
                    </Text>
                    </View>
                    <Text>
                    Read more about the https://labtestsonline.org.uk/tests/red-blood-cell-count at Lab Tests Online UK.{"\n"}{"\n"}
                    </Text>
                    </View>
                </Hyperlink>
            </ScrollView> 
            </View>
    )
}
const UnederPreparation = ()=> {
    return(
    <ScrollView style={{ backgroundColor:'#fff'}}> 
        <Text h3 style={{margin:10}}>Under Preparation</Text>
            <Divider
                orientation="horizontal"
                />
            <View style={{fontSize: 18,paddingLeft:10,paddingRight:10,marginTop:20}}>
            <Text style={{fontWeight:'bold'}}>This page will be ready soon ...{"\n"}</Text>

            </View>
    </ScrollView>     
    );
}
const ExclamationArray = [RBCexclamation,HGBexclamation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation,UnederPreparation]
function Exclamation (props){

    const index = props.route.params.index;
    console.log(index)
    const RenderingComponent = ExclamationArray[index];
    return(
        <View style={{flex: 1, backgroundColor:'#55A8D9'}}>
            
            <RenderingComponent navigation={props.navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    Image: {margin:20},
    WelcomBar: {
        // alignItems: 'center' ,
        flexDirection: 'row',
        backgroundColor:'#55A8D9' ,
        marginTop:20,
        marginLeft:10,
        marginBottom:10
        },
    WelcomBarText: {
        fontSize:20,
        color:'white',
        marginLeft:20,
        fontWeight:'bold',
        
    },
});

export default Exclamation;
