import React from 'react';
import { Text, View ,TouchableOpacity} from 'react-native';

const ModeloOtro = (props) => {





    return (
        <View {...props}>
         <TouchableOpacity onPress={props.lado} > 
            <View style={{alignItems: 'center',justifyContent: 'center',}}>
            <Text style={{fontSize: 10 ,fontWeight:'bold',color: '#ffffff'}}>{props.dia}</Text>
            </View>
        </TouchableOpacity>   
        </View>
        

)
    
    }

export default ModeloOtro;
