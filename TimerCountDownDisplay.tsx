import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

type Props = {
  timerCount: number;
};

export const TimerCountDownDisplay: React.FC<Props> = ({ timerCount }) => {
  const minutes = Math.floor(timerCount / 60000); // Calculate minutes
  const seconds = Math.floor((timerCount % 60000) / 1000); // Calculate seconds


  return (
    <View>
      <Text style={Styles.timerCountDownText}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  timerCountDownText: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
  },
});
