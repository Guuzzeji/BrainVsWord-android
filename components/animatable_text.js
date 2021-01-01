import React from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const Animtext = function(props){

    function handle_anim(ref){
        props.set_val(ref)
    }

    return (
        <Animatable.Text style={props.style_animatable} ref={handle_anim} useNativeDriver={true}>
            <Text style={props.style_text} >{props.text_dis}</Text>
        </Animatable.Text>
    )
}