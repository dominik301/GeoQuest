import React , {useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import {Marker} from 'react-native-maps';

import {sendRequest} from '../../api'
import { router } from 'expo-router';

export default function Map() {
  const [mapRegion, setmapRegion] = useState({
    latitude: 58.961,
    longitude: 18.342,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
    <View style={styles.container}>
      <MapView style={styles.map} 
      region={mapRegion}>
        {results ? results.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.location}
            title={marker.name}
            description={marker.description}
            onCalloutPress={() => handleLevelSelect(marker.id)}
          />
        )) : null
      }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
