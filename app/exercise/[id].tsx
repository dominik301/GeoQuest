import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';

import ImageLabelAssignment from '../../components/ImageLabelAssignment';

import {sendRequest} from '../../api'

const BASE_URL = ' http://192.168.188.26:5000'

interface IQuestion {
    question_text: string;
    question_type: string;
    image_url: string;
}

export default function Exercise() {
    const { id } = useLocalSearchParams();
    const [ completed, setCompleted ] = useState<Boolean>(false);
    const [questions, setQuestions] = useState<IQuestion[]|null>(null);
    useEffect(() => {
        sendRequest(`level/${id}`)
          .then(result => {
            setQuestions(result.questions)
          })
          .catch(() => setQuestions(null))
      }, [id])

      if (!id) return <Text>There was an error</Text>
    return ( questions ? (
        <View>
            <Text>Exercise {id}</Text>
            {questions.map((question: IQuestion, index: number) => (
                <View key={index}>
                    <Text>{question.question_text}</Text>
                    {question.question_type === "image-label" && (
                        <View>
                        {/*<Image source={{uri: `${BASE_URL}${question.image_url}`}}
                        style={{width: 200, height: 200}} />*/}
                        <ImageLabelAssignment imageUrl={`${BASE_URL}${question.image_url}`} question={question}/>
                        </View>
                    )}
                    <Button title="Check answers" onPress={() => setCompleted(true)} />
                </View>
            ))}
            
            {completed ? (
                <Link href="/success">Continue</Link>
            ) : null
        }
        </View>
    ) : <Text>Loading...</Text>
    );
}
