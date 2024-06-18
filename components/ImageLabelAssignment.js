import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, ImageBackground, Button } from 'react-native';
import Draggable from 'react-native-draggable';

const imageMapping = {
  fold: require('../assets/images/fold.jpg'),
};

const AssignmentComponent = ({imageUrl, question, onSolved}) => {
  const [solved, setSolved] = useState({});

  useEffect(() => {
    const initialSolvedState = {};
    question.labels.forEach((label) => {
      // append "label: false" object to solved array
      initialSolvedState[label] = false;
    });
    setSolved(initialSolvedState);
  }, []);


  const handleDrop = (label, gesture) => {

    let target = question.locations[label]
    
    if (Math.abs(40 + 300 * target.x - gesture.moveX) < 50 && Math.abs(135 + 400 * target.y - gesture.moveY) < 50) {
      setSolved({ ...solved, [label]: true });
    } 
  };

  const checkAssignment = () => {
    if (Object.values(solved).includes(false)) {
      alert('Not all labels are placed correctly! Try again.');
      return;
    }
    onSolved(true);
  };

  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={imageMapping[imageUrl]} style={styles.image}>
        {Object.entries(question.locations).map(([key, { x, y }]) => (
          <View
            key={key}
            style={[
              styles.dropField,
              { left: x * 300 - 50, top: y * 400 - 10 }
            ]}
          />
        ))}
      </ImageBackground>
        
      {question.labels.map((label, index) => (
            <Draggable key={index} x={index*100} onDragRelease={(event, gesture) => handleDrop(label, gesture)}>
                <Text style={styles.card}>{label}</Text>
            </Draggable>
        ))}
      <Button title="Check Assignment" onPress={checkAssignment} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 400,
  },
  card: {
    padding: 10,
    backgroundColor: 'lightblue',
    margin: 10,
  },
  dropField: {
    position: 'absolute',
    width: 100,
    height: 40,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
});

export default AssignmentComponent;
