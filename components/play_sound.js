import { Audio } from 'expo-av';

export const get_point_sound = async function(){
    const sound = new Audio.Sound()

    try{
        await sound.loadAsync(require('./../sound_effects/collect.wav'), {shouldPlay: true,})
        await sound.playAsync()
        return 

    }catch{
        return null
    }
}

export const wrong_sound = async function(){
    const sound = new Audio.Sound()

    try{
        await sound.loadAsync(require('./../sound_effects/hit.wav'), {shouldPlay: true,})
        await sound.playAsync()
        return 

    }catch{
        return null
    }
}

export const button_click = async function(){
    const sound = new Audio.Sound()

    try{
        await sound.loadAsync(require('./../sound_effects/Select.wav'), {shouldPlay: true,})
        await sound.playAsync()
        return 

    }catch{
        return null
    }
}