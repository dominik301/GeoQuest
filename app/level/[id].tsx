import React, { useEffect, useState } from 'react'
import { Text, View , Pressable, Button } from 'react-native'

import {sendRequest} from '../../api'
import { Link, useLocalSearchParams } from 'expo-router';

interface ILevel {
  intro_text: string;
}

export default function LevelWrapper() {
  const { id } = useLocalSearchParams();
  const [level, setLevel] = useState<ILevel | null>(null);

  useEffect(() => {
    sendRequest(`level/${id}`)
      .then(result => {
        setLevel(result)
      })
      .catch(() => setLevel(null))
  }, [id])

    if (!id) return <Text>There was an error</Text>
    return (level
      ? (<View>
            <Text>{level.intro_text}</Text>
            <Link href={{
                pathname: "/exercise/[id]", 
                params: {id: id}
            }} asChild>
              <Button title="Go to exercise" />
            </Link>;
        </View>)
      : <Text>Loading...</Text>
          )
}