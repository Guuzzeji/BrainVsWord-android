
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const Custom_Button = function(props) {
    return (
        <TouchableOpacity onPress={props.press}>
            <View style={styles.button_style}>
                <Text style={styles.button_text}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button_style:{
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'#000000',
        width: 120,
        height: 40,
        borderRadius: 2,
    },
    button_text:{
        color:'#ffffff',
        fontWeight:'700',
        fontSize:18,
        fontFamily:'Roboto'
    }
});