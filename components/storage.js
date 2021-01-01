import * as SecureStore from 'expo-secure-store';

const key = 'game.brainsvswords.highscore'

//val is a value NOT a json file
export const save_score = async function(val){
    try{
        let json_score = {
            high_score: val
        }
        let jsontoString = JSON.stringify(json_score)
        await SecureStore.setItemAsync(key, jsontoString)
        return true
        
    }catch{
        return false
    }
}

export const find_score = async function(){
    try{
        let val = await SecureStore.getItemAsync(key)

        if(val == null){
            save_score(0)
            return {
                high_score: 0
            }
        }else{
            return JSON.parse(val)
        }

    }catch(err){
        console.log(err)
        return false
    }
}

export const remove_score = async function(){
    try{
        await SecureStore.deleteItemAsync(key)
        return true

    }catch{
        return false
    }
}