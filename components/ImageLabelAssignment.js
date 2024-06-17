import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import Draggable from 'react-native-draggable';

const AssignmentComponent = ({imageUrl, question}) => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
  ]);

  const [dropFields, setDropFields] = useState([
    { id: 1, text: 'Drop Field 1', assigned: null },
    { id: 2, text: 'Drop Field 2', assigned: null },
    { id: 3, text: 'Drop Field 3', assigned: null },
  ]);

  const handleDrop = (cardId, fieldId) => {
    const updatedDropFields = dropFields.map(field => {
      if (field.id === fieldId) {
        return { ...field, assigned: cards.find(card => card.id === cardId) };
      }
      return field;
    });
    setDropFields(updatedDropFields);
  };

  const checkAssignment = () => {
    // Implement your logic to check whether the assignment is correct
    const correctAssignment = dropFields.every(field => field.assigned && field.assigned.id === field.id);
    alert(correctAssignment ? 'Correct Assignment!' : 'Incorrect Assignment');
  };

  return (
    <View style={styles.container}>
        <ImageBackground source={imageUrl} style={styles.image}>
        {Object.entries(question.locations).map(([key, { x, y }]) => (
          <View
            key={key}
            style={[
              styles.dropField,
              { left: `${x * 100}%`, top: `${y * 100}%` }
            ]}
          />
        ))}
      </ImageBackground>
        
      {question.labels.map((label, index) => (
            <Draggable key={index} x={index*100} style={styles.dropField}>
                <Text>{label}</Text>
            </Draggable>
        ))}
      <Text style={styles.checkButton} onPress={checkAssignment}>Check Assignment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: '100%',
    height: '300px',
    resizeMode: 'cover',
  },
  card: {
    padding: 10,
    backgroundColor: 'lightblue',
    margin: 10,
  },
  dropField: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  checkButton: {
    padding: 10,
    backgroundColor: 'lightgreen',
    textAlign: 'center',
    width: 200,
    marginTop: 20,
  },
});

export default AssignmentComponent;
