import React, { useEffect, useState } from 'react'
import { Text, View , Button, StyleSheet, useColorScheme } from 'react-native'

import {sendRequest} from '../../api'
import { Link, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

interface ILevel {
  intro_text: string;
}

export default function LevelWrapper() {
  const { id } = useLocalSearchParams();
  const [level, setLevel] = useState<ILevel | null>(null);
  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colorScheme === 'dark' ? 'white' : 'black',
    },
  });

  useEffect(() => {
    sendRequest(`level/${id}`)
      .then(result => {
        setLevel(result)
      })
      .catch(() => setLevel(null))
  }, [id])

  useEffect(() => {
    if (id) {
      navigation.setOptions({ title: `Level ${id}` });
    }
  }, [id, navigation]);

    if (!id) return <Text>There was an error</Text>
    return (level
      ? (<View style={styles.container}>
            <Text style={styles.text}>{level.intro_text}</Text>
            <Link href={{
                pathname: "/exercise/[id]", 
                params: {id: id}
            }} asChild>
              <Button title="Go to exercise" />
            </Link>
            
        </View>)
      : <Text>Loading...</Text>
          )
}