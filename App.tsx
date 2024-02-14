import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import {TimerCountDownDisplay} from './TimerCountDownDisplay';
import {TimerToggleButton} from './TimerToggleButton';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { TimerModes } from './TimerModeDisplay';
import {TimerModeDisplay} from './TimerModeDisplay';


const DEFAULT_FOCUS_TIME = '20';
const DEFAULT_BREAK_TIME = '2';


export default function App() {
  const [focusTimeInput, setFocusTimeInput] = useState(DEFAULT_FOCUS_TIME);
  const [breakTimeInput, setBreakTimeInput] = useState(DEFAULT_BREAK_TIME);
  const[timerCount, setTimerCount] = useState<number>(parseInt(focusTimeInput)*60*1000);
  const[timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const[isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const[timerMode, setTimerMode] = useState<TimerModes>('Focus');
  const[showSettings, setShowSettings] = useState<boolean>(false);


  useEffect(() =>{
    if (timerCount ===0){
      if (timerMode ==='Focus'){
        setTimerMode('Break');
        setTimerCount(parseInt(breakTimeInput)*60*1000); 
      } else{
        setTimerMode('Focus');
        setTimerCount(parseInt(focusTimeInput)*60*1000);
      }
    }

  }, [timerCount, timerMode, focusTimeInput, breakTimeInput]);

  

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

  const handleBreakTimeChnage = (text: string) => {
    setBreakTimeInput(text);
  }

  const handleFocusTimeChnage = (text: string) => {
    setFocusTimeInput(text);
  }

  const handleSetTimes = () => {
    setTimerCount(parseInt(focusTimeInput) * 60 * 1000);
    setTimerMode('Focus');
    setShowSettings(false);
  }

  const handleResetTimes = () => {
    setFocusTimeInput(DEFAULT_FOCUS_TIME);
    setBreakTimeInput(DEFAULT_BREAK_TIME);
    setTimerCount(parseInt(DEFAULT_FOCUS_TIME) * 60 * 1000);  
    setShowSettings(false);
  }

  const toggleSettingsVisibility =() =>{
    setShowSettings(prev => !prev);
  }

  
  
  return (
    <View style={{...styles.container, 
    ...{backgroundColor: timerMode=== "Break" ? "#2a9d8f" : "#d95550"}}
    }>
      <TimerModeDisplay timerMode={timerMode} />
      <StatusBar style="auto" />
      

      <TouchableOpacity 
      style={styles.button} 
      onPress={toggleSettingsVisibility}
       >
        <Text style={styles.buttonText}>⚙️</Text>
       </TouchableOpacity>

      {showSettings && (
  <View style={styles.inputContainer}>
    <Text>Focus Time (minutes):</Text>
    <TextInput 
      style={styles.input}
      keyboardType="numeric"
      value={focusTimeInput}
      onChangeText={handleFocusTimeChnage}
    />

    <Text>Break Time (minutes):</Text>
    <TextInput 
      style={styles.input}
      keyboardType="numeric"
      value={breakTimeInput}
      onChangeText={handleBreakTimeChnage}
    />

    <TouchableOpacity  style={styles.button} onPress={handleSetTimes}>
      <Text style={styles.buttonText}>Set Time</Text>
    </TouchableOpacity>
    <TouchableOpacity  style={styles.button} onPress={handleResetTimes} >
      <Text style={styles.buttonText}>Reset Time</Text>
    </TouchableOpacity>
  </View>
)}

      <TimerToggleButton 
      isTimerRunning={ isTimerRunning}
      startTimer={startTimer}
      stopTimer={stopTimer} 
      />
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
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    height: 30,
    borderColor: 'Black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 100,
    textAlign: 'center',
    marginLeft: 20,
  
  },
  button:{
    backgroundColor: '#ff5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 3,
    elevation: 3,
    //for Ios
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },

  buttonText:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
