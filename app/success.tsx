import React from 'react'
import { Button, Text, View } from 'react-native'

import { useRouter } from 'expo-router';

export default function LevelFinishedView() {
    const router = useRouter();

    const handleDismiss = (count: number) => {
        router.dismiss(count)
    };

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>You have completed the level</Text>
            <Button title="Back to home screen" onPress={() => handleDismiss(3)}/>;
        </View>
    )
}
