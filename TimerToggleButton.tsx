import React from 'react';
import {Text, StyleSheet, View, Button, Pressable} from 'react-native';
import {FontAwesome} from'@expo/vector-icons';


type Props={
    isTimerRunning: boolean;
    stopTimer: ()=>void;
    startTimer: ()=> void;

};

export const TimerToggleButton: React.FC<Props> =({
    isTimerRunning,
    stopTimer,
    startTimer,
}) =>{
    return (
        <Pressable onPress={isTimerRunning ? stopTimer : startTimer}>
            <View style= {styles.container}>
                <FontAwesome name={isTimerRunning ? 'pause' : 'play'} size ={120} style={styles.icon}/>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    icon: {
        alignSelf:'center',
        color:'white',

    },
    container:{
        borderWidth:5,
        width:220,
        height:220,
        borderRadius:125,
        justifyContent: 'center',
        borderColor: 'white',
        marginVertical: 50,

    },
});