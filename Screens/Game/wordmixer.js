function mix_word(word, loop){
    let arr_word = word.split('')

    let offset = Math.random()

    let run_through = loop

    if(loop > word.length){
        run_through = word.length
    }

    for(let x = 0; x < run_through; x++){
        let r = Math.random()
        let copy = arr_word[x]

    if(r > 0.5){
        if(arr_word[x + 1] != undefined){
            //move right
            arr_word[x] = arr_word[x + 1]
            arr_word[x + 1] = copy
        }else{
            //move left
            arr_word[x] = arr_word[x - 1]
            arr_word[x - 1] = copy
        }
    }else{
        if(arr_word[x - 1] != undefined){
            //move left
            arr_word[x] = arr_word[x - 1]
            arr_word[x - 1] = copy
        }else{
            //move right
            arr_word[x] = arr_word[x + 1]
            arr_word[x + 1] = copy
        }
        }
    }

    function clean(new_word){
        let word = new_word.toString()
        for(let x = 0; x < word.length; x++){
            word = word.replace(',', ' ')
        }
        return word
    }

    if(word == clean(arr_word)){
        return clean(arr_word.reverse())
    }

    if(loop > word.length){
        if(offset > 0.5){
            return clean(arr_word.reverse())
        }else{
            return clean(arr_word)
        }
    }else{
        return clean(arr_word)
    }

}


module.exports = mix_word