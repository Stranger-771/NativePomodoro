import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const FOCUS_TIME_MINUTES = 0.2*60*1000;
const BREAK_TIME_MINUTES = 0.1*60*1000;
export default function App() {
  const[timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);
  const[timerInterval, setTimerInterval] = useState<Node.jsTimer | null>(null);

  const startTimer =() => {
    const id = setInterval(() => setTimerCount(prev => prev -1000), 1000);
    setTimerInterval(id);
  }

  const stopTimer =() =>{
    if (timerInterval != null){
      clearInterval(timerInterval);
    } 

  }
  const timerDate = new Date(timerCount);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title='Start Timer' onPress ={startTimer}></Button>
      <Button title='Stop Timer' onPress ={stopTimer}></Button>
      <Text>{timerDate.getMinutes().toString().padStart(2, "0")}:{timerDate.getSeconds().toString().padStart(2, "0")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
