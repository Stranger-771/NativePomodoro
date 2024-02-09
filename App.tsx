import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import {TimerCountDownDisplay} from './TimerCountDownDisplay';
import {TimerToggleButton} from './TimerToggleButton';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TimerModes } from './TimerModeDisplay';
import {TimerModeDisplay} from './TimerModeDisplay';

const FOCUS_TIME_MINUTES = 25*60*1000;
const BREAK_TIME_MINUTES = 5*60*1000;
export default function App() {
  const[timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);
  const[timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const[isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const[timerMode, setTimerMode] = useState<TimerModes>('Focus');

  useEffect(() =>{
    if (timerCount ===0){
      if (timerMode ==='Focus'){
        setTimerMode('Break');
        setTimerCount(BREAK_TIME_MINUTES); 
      } else{
        setTimerMode('Focus');
        setTimerCount(FOCUS_TIME_MINUTES);
      }
    }

  }, [timerCount, timerMode]);

  

  const startTimer =() => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount(prev => prev -1000), 1000);
    setTimerInterval(id);
  }

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }
  }
  
  
  return (
    <View style={{...styles.container, 
    ...{backgroundColor: timerMode=== "Break" ? "#2a9d8f" : "#d95550"}}
    }>
      <TimerModeDisplay timerMode={timerMode} />
      <StatusBar style="auto" />
      <TimerToggleButton 
      isTimerRunning={ isTimerRunning}
      startTimer={startTimer}
      stopTimer={stopTimer} />
      <TimerCountDownDisplay timerCount={timerCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c95550',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
