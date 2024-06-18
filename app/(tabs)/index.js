import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView, Platform, StatusBar } from 'react-native';

import {sendRequest} from '../../api'
import { router } from 'expo-router';

import LevelRow from '../../screens/Search/MovieRow'

const renderItem = onSelect => ({item}) => <LevelRow onSelect={onSelect} {...item} />
const getKey = ({id}) => id

export default function Search() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    sendRequest('levels')
      .then(result => {
        setResults(result)
      })
      .catch((err) => {
        console.log(err)
        setResults(null)
      })
  }, [])

  function handleLevelSelect (id) {
    router.navigate(`level/${id}`)
  }

  return (
    <SafeAreaView style={[styles.container,
      Platform.OS === 'android' ? { paddingTop: StatusBar.currentHeight } : null]}>
      {results
        ? (
          <FlatList
            data={results}
            renderItem={renderItem(handleLevelSelect)}
            keyExtractor={getKey}
          />
        ) : <Text>No results</Text>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});