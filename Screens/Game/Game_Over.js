import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ToastAndroid, ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {captureRef} from "react-native-view-shot";
import * as Sharing from 'expo-sharing'; 

//Custom imports
import { Custom_Button } from './../../components/button'
import { button_click } from './../../components/play_sound'
import { wrong_sound } from './../../components/play_sound'
import { save_score, find_score, remove_score } from './../../components/storage'

export const Game_Over = function(props) {

  function find(){
    find_score().then(function(val){
        set_bst_score(val.high_score)
    })
  }

  //View Val
  const [main_view, set_main_view] = useState(null)

  //Score val
  const [bst_score, set_bst_score] = useState(find() || 0)
  const [new_score, set_new_score] = useState(false)
  
  //compare scores and save now high score
  function compare_scores(ply_score, store_score){
    if(ply_score > store_score){
      remove_score()
      save_score(ply_score).then(function(){
        set_new_score(true)
      })
      find()
      //console.log('best',bst_score)
    }else{
      //console.log('same',bst_score)
    }
  }

  //Callback for onshow
  function on_show(){ 
    wrong_sound()
    set_new_score(false); 
    compare_scores(props.scoretext, bst_score)
  }

  //screen shot btn that share scores
  async function share_btn(){
    try{
      const image = await captureRef(main_view, {
        format: 'jpg',
        quality: 0.8,
        result: 'tmpfile'
      })
      //console.log(image)
      if(!Sharing.isAvailableAsync()){
        return null
      }
      await Sharing.shareAsync(image)

    }catch(err){
      //console.log(err)
      ToastAndroid.show('Error: Fail To Share', ToastAndroid.SHORT)
      return null
    }
  }

  //play gif background if player beats their high score
  function Img_back_partly(props){
    if(new_score == true){
      return (
      <ImageBackground source={require('./../../assets/source.gif')} style={{flex: 1, resizeMode:'center', backgroundColor:'#fff'}}>
        {props.children}
      </ImageBackground>
      )
    }else{
      return(
        <View style={{flex: 1, backgroundColor:'#fff'}}>
          {props.children}
        </View>
      )
    }
  }

  //SCREEN
  return (
    <Modal animationType='fade' transparent={false} visible={props.can_see} onShow={on_show} hardwareAccelerated={true}>
      <View ref={function(ref){set_main_view(ref)}} style={styles.container}>
        <Img_back_partly>
        <View style={{flex: 3}}>
        </View>
        <Animatable.View animation="pulse" iterationCount="infinite" style={{flex: 4}} useNativeDriver={true}>
          <Text style={styles.text_over}>Game Over</Text>
        </Animatable.View>
        <View style={{flex: 4}}>
          <Text style={styles.score_text}>Score: {props.scoretext}</Text>
          <Text style={styles.best_score}>Best Score: {bst_score}</Text>
        </View>
        <View style={{flex: 6}}>
          <Custom_Button name='Play Again' press={function(){props.set_can_see(false); props.callback(); button_click()}} />
          <TouchableOpacity style={styles.best_score} onPress={share_btn}>
            <Text style={styles.best_score}>Share Score</Text>
          </TouchableOpacity>
        </View>
        <View style={{bottom:0}}>
          <Text style={styles.footer_text}>Brains vs Words</Text>
        </View>
        </Img_back_partly>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    text_over:{
      alignSelf:'center',
      fontSize: 55,
      fontFamily:'Viga-Regular'
    },
    best_score:{
      fontWeight: "bold",
      fontSize: 20,
      alignSelf:'center',
      color:'#a3a3a3',
      fontFamily:'Roboto',
      padding: 20
    },
    score_text:{
      fontWeight: "bold",
      fontSize: 20,
      alignSelf:'center',
      fontFamily:'Roboto'
    },
    footer_text:{
      fontSize: 15,
      alignSelf:'center',
      color:'#a3a3a3',
      fontFamily:'Viga-Regular',
      padding: 20
    },
});