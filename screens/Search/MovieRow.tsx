import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
  movieMetadata: {
    flex: 1,
  },
})

interface IRowProps {
  id: number;
  description: string;
  onSelect: (id: number) => void;
}

const Row = (props: IRowProps) => (
  <TouchableOpacity onPress={() => props.onSelect(props.id)} style={styles.container}>
    <View style={styles.movieMetadata}>
      <Text style={styles.title}>Level {props.id}</Text>
      <Text>{props.description}</Text>
    </View>
  </TouchableOpacity>
)

export default Row