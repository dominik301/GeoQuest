import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MultipleChoiceQuiz = ({question, onSolved}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option === question.correct_answer) {
      setIsCorrect(true);
      console.log("Correct!")
      onSolved(true);
    } else {
      setIsCorrect(false);
    }

    setShowFeedback(true);
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  return (
    <View style={styles.container}>

      {/* Options */}
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, selectedOption === option && styles.selectedOption]}
          onPress={() => handleOptionSelect(option)}
          disabled={showFeedback}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* Feedback */}
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>
            {isCorrect ? "Correct!" : "Incorrect. Please try again."}
          </Text>
          {!isCorrect && (
            <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  feedbackContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 18,
    marginBottom: 10,
  },
  tryAgainButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  tryAgainText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MultipleChoiceQuiz;
