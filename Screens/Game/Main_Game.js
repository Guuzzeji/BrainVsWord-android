import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, BackHandler, StatusBar } from 'react-native';

//custom imports
import {Custom_Button} from './../../components/button'
import {Animtext} from './../../components/animatable_text'
import { Game_Over } from './Game_Over'
import { wrong_sound, get_point_sound } from './../../components/play_sound'

//game logic import 
const wordmixer = require('./wordmixer')
const word_list = require('./../../json_data/word.json')

function rng_word_list(){
  let x = Math.floor(Math.random()*word_list.length)
  return x
}

//offset starting random
function rng_start(){
  let x = Math.floor(Math.random()*3) +1
  return x
}


export const Main_Game = function({ navigation }) {

  //View ref
  const [shake_view, set_shake_view] = useState(null)
  const [point_view, set_point_view] = useState(null)

  const [run_loop, set_run_loop] = useState(rng_start())
  function get_word(){
    let word = word_list[rng_word_list()]
    let mix = wordmixer(word, run_loop)
    //console.log(word)
    return {
      normal: word,
      mix 
    }
  }

  //game Var
  const [dis_word, set_dis_word] = useState({
    normal: '',
    mix: ''
  })
  const [score, set_score] = useState(0)
  const [textin, set_textin] = useState('')
  const [tries, set_tries] = useState(3)
  const [over, set_over] = useState(false)


  useEffect(function(){
    set_dis_word(get_word())
  }, [score])

  function text_input(text){
    set_textin(text)
  }

  function solve_btn(){
    //console.log(textin.toLowerCase(), dis_word.normal.toLowerCase())
    let player_word = textin.toLowerCase().trim()
    let random_word = dis_word.normal.toLowerCase().trim()
    
    //solved
    if(player_word == random_word){
      //console.log('solved')
      point_view.bounce(500)
      get_point_sound()
      //score adding base on word length
      if(dis_word.normal.trim().length >= 8){
        set_score(score + 3)
      }else if(dis_word.normal.trim().length > 5 && dis_word.normal.toLowerCase().length <= 7 ){
        set_score(score + 2)
      }else{
        set_score(score + 1)
      }

      //after adding score
      set_run_loop(run_loop +1)
      //console.log(run_loop)
      set_textin('')

    }else{
      //wrong
      wrong_sound()
      set_tries(tries -1)
      shake_view.shake()
      if(tries == 1){
        set_over(true)
      }
    }
  }

  function skip_btn(){
    set_score(score - 2)
    set_textin('')
    point_view.shake()
    if(score <= 0){
      set_over(true)
    }
  }

  function Restart(){
    set_over(false)
    set_score(0)
    set_tries(3)
    set_textin('')
    set_run_loop(rng_start())
    set_dis_word(get_word())
  }

  BackHandler.addEventListener('hardwareBackPress', function(){
    navigation.pop(1)
  })


  return (
    <KeyboardAvoidingView style={styles.container} behavior={"height"}>

      <TouchableWithoutFeedback onPress={function(){Keyboard.dismiss()}}>
      <View style={{
        alignItems:'center',
        flex: 0, 
      }}>
        <Animtext style_text={styles.score_text} text_dis={score} set_val={set_point_view}/>
        <Text style={styles.time_text} >{tries} Tires Left</Text>
      </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={function(){Keyboard.dismiss()}}>
      <View style={{
        alignItems:'center',
        flex: 0.9,
        alignContent:'center',
        justifyContent:'center',
      }}>

        <Animtext style_text={styles.mix_word_text} text_dis={dis_word.mix.toLocaleUpperCase()} set_val={set_shake_view}/>

        <View style={{padding: 10}}>
          <View style={styles.text_back_in}>
            <TextInput style={styles.text_in} textAlign="center" placeholder="What the word..." onChangeText={text_input} value={textin} onSubmitEditing={solve_btn} maxLength={dis_word.normal.length || 10} keyboardType='default' returnKeyType='next' />
          </View>
        </View>

        <View style={{padding: 10, flexDirection: "row-reverse", justifyContent:"space-evenly"}}>
          <Custom_Button name='Solved' press={solve_btn}/>
          <View style={{paddingRight:10}}/>
          <Custom_Button name='Skip' press={skip_btn}/>
        </View>
      </View>
      </TouchableWithoutFeedback>

      <Game_Over can_see={over} scoretext={score} set_can_see={set_over} callback={Restart}/>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    score_text:{
      alignSelf:'center',
      fontSize: 55,
      fontWeight:'bold',
      fontFamily:'Roboto',
    },
    time_text:{
      fontSize: 18,
      color:'#929292',
      fontFamily:'Roboto'
    },
    mix_word_text:{
      fontSize:21,
      padding: 10,
      fontWeight:'bold'
    },
    text_in:{
      fontSize: 18,
      padding: 8,
      width: 220,
      fontFamily:'Roboto'
    },
    text_back_in:{
      backgroundColor:'#F2F2F2',
      width: 220,
      borderRadius: 3,
      elevation: 5,
      flexDirection:'row'
    }
});