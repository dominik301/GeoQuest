import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {sendRequest} from '../../api'
import { router } from 'expo-router';

import MovieRow from '../../screens/Search/MovieRow'

const renderItem = onSelect => ({item}) => <MovieRow onSelect={onSelect} {...item} />
const getKey = ({id}) => id

export default function Search() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    sendRequest('levels')
      .then(result => {
        console.log(result)
        setResults(result)
      })
      .catch((err) => {
        console.log(err)
        setResults(null)
      })
  }, [])

  function handleMovieSelect (id) {
    router.navigate(`level/${id}`)
  }

  return (
    <View style={styles.container}>
      {results
        ? (
          <FlatList
            data={results}
            renderItem={renderItem(handleMovieSelect)}
            keyExtractor={getKey}
          />
        ) : <Text>No results</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});