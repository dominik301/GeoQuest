import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import ImageLabelAssignment from '../../components/ImageLabelAssignment';

import {sendRequest} from '../../api'

import MultipleChoiceQuiz from '../../components/MultipleChoiceAssignment';

const BASE_URL = ' http://192.168.188.26:3000'

interface IQuestion {
    question_text: string;
    question_type: string;
    image_url: string;
}

export default function Exercise() {
    const { id } = useLocalSearchParams();
    const [ completed, setCompleted ] = useState<Boolean>(false);
    const [questions, setQuestions] = useState<IQuestion[]|null>(null);
    const navigation = useNavigation();

    const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      alignItems: 'center',
    },
    text: {
      color: colorScheme === 'dark' ? 'white' : 'black',
    },
  });

    useEffect(() => {
        sendRequest(`level/${id}`)
          .then(result => {
            setQuestions(result.questions)
          })
          .catch(() => setQuestions(null))
      }, [id])

      useEffect(() => {
        if (id) {
          navigation.setOptions({ title: `Exercise ${id}` });
        }
      }, [id, navigation]);

      if (!id) return <Text>There was an error</Text>
    return ( questions ? (
        <SafeAreaView style={styles.container}>
            {questions.map((question: IQuestion, index: number) => (
                <View style={{flex: 1}} key={index}>
                    <Text style={styles.text}>{question.question_text}</Text>
                    {question.question_type === "image-label" && (
                        <ImageLabelAssignment imageUrl={`${question.image_url}`} question={question} onSolved={setCompleted}/>
                    )}
                    {question.question_type === "multiple-choice" && (
                        <MultipleChoiceQuiz question={question} onSolved={setCompleted} />
                    )}
                </View>
            ))}
            
            {completed ? (
                <Link href="/success" asChild>
                    <Button title="Continue" />
                </Link>
            ) : null
        }
        </SafeAreaView>
    ) : <Text>Loading...</Text>
    );
}
