import React, { useEffect } from 'react'
import { Button, Text, View, StyleSheet, useColorScheme } from 'react-native'

import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function LevelFinishedView() {
    const router = useRouter();
    const navigation = useNavigation();

    const handleDismiss = (count: number) => {
        router.dismiss(count)
    };

    const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colorScheme === 'dark' ? 'white' : 'black',
    },
  });

    useEffect(() => {
        navigation.setOptions({ title: `End of Exercise` });
      }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You have completed the level</Text>
            <Button title="Back to home screen" onPress={() => handleDismiss(3)}/>
        </View>
    )
}
