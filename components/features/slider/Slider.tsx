import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';

export default function CustomSlider() {
    const [value, setValue] = useState(0);

    return (
        <View style={styles.container}>
            <Slider
                style={styles.slider}
                value={value}
                onValueChange={setValue}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#2196F3"
                maximumTrackTintColor="#000000"
                thumbTintColor="#2196F3"
            />
            <Text style={styles.text}>Value: {Math.round(value)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    text: {
        textAlign: 'center',
        marginTop: 10,
    },
});