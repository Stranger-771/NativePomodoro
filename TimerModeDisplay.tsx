import React from 'react';
import {Text, StyleSheet, View,} from 'react-native';

export type TimerModes = 'Focus' | 'Break';

type Props ={
    timerMode: TimerModes;
}
export const TimerModeDisplay: React.FC<Props> =({timerMode}) =>{
    return (
        <View style={Styles.container}>
        <Text style={Styles.timerModetext}> 
            {timerMode} Time {timerMode == 'Focus' ? "😊" : "😎"}
        </Text>
        </View>

    )
}

const Styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: '100%',
    },
    timerModetext:{
        fontSize:40,
        fontWeight:'800',
        color:'white',
    },
})
