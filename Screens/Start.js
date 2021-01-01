
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Animatable from 'react-native-animatable';

//custom imports
import { Custom_Button } from './../components/button'
import { button_click } from './../components/play_sound'
import { find_score } from './../components/storage'


export const Start_screen = function({ navigation }) {

  function find(){
    find_score().then(function(val){
        set_bst_score(val.high_score)
    })
  }

  const [font_load, set_load_font] = useState(false)
  const [bst_score, set_bst_score] = useState(find() || 0)

  async function loadingfont(){
    await Font.loadAsync({
      'Viga-Regular': require('./../fonts/Viga-Regular.ttf')
    })
    set_load_font(true)
  }

  function play_btn(){ 
    button_click()
    navigation.push('Game') 
  }

  useEffect(function(){
    loadingfont()
  }, [font_load])

  if(font_load != false){
    return (
      <Animatable.View animation="fadeIn" delay={5} style={styles.container}>
        <View style={{
          flex: 2,
          paddingTop: 60,
          right:40,
          alignSelf: "center",
        }}> 
        <Animatable.View animation="pulse" iterationCount="infinite" useNativeDriver={true}>
          <Text style={styles.title_1} >Brains</Text>
          <Text style={styles.title_2} >vs</Text>
          <Text style={styles.title_3} >Words</Text>
        </Animatable.View>
        </View>
  
        <View 
        style={{
          alignSelf:'center',
          padding:20,
          flex: 2
        }}>
          <Text style={styles.score_text}>Best Score: {bst_score}</Text>
  
          <View style={{padding: 100}}>
            <Custom_Button press={play_btn} name='Play' />
          </View>
        </View>
      </Animatable.View>
    );
  }else{
    //loading screen
    return(
      <Animatable.View animation="fadeIn" delay={5} style={{justifyContent:'center', alignItems:'center', flex: 1, backgroundColor: '#fff',}}>
        <ActivityIndicator color='#a3a3a3' />
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    title_1:{
      fontSize: 75,
      fontFamily:'Viga-Regular'
    },
    title_2:{
      fontSize: 45,
      fontWeight: "bold",
      fontFamily:'Roboto'
    },
    title_3:{
      fontSize: 75,
      fontFamily:'Viga-Regular'
    },
    score_text:{
      fontWeight: "bold",
      fontSize: 20,
      alignSelf:'center',
      color:'#a3a3a3',
      fontFamily:'Roboto'
    },
    button_style:{
      alignItems:'center',
      alignContent:'center',
      alignSelf:'center',
      justifyContent:'center',
      backgroundColor:'#000000',
      width: 120,
      height: 40,
      borderRadius: 2,
      elevation: 10,
    },
    button_text:{
      color:'#ffffff',
      fontWeight:'700',
      fontSize:18,
      fontFamily:'Roboto'
    }
});