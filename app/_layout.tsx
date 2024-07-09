import React, { useState } from 'react';
import { useColorScheme, Button } from 'react-native';
import { Stack } from "expo-router";
import { ThemeProvider } from 'styled-components/native';
import { PaperProvider } from 'react-native-paper';
import { PatientProvider } from '@/context/PatientContext';
import {theme, ThemeMode} from "@/style/Theme"; // Make sure this import path is correct

export default function RootLayout() {
    const deviceColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState<ThemeMode>(deviceColorScheme || 'light');

    const toggleTheme = () => {
        setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    const fullTheme = {
        ...theme,
        themeMode,
    };

    return (
        <ThemeProvider theme={fullTheme}>
            <PaperProvider>
                <PatientProvider>
                    <Stack>
                        <Stack.Screen
                            name="index"
                            options={{
                                title: 'Patient Portal',
                                headerRight: () => (
                                    <Button onPress={toggleTheme} title={themeMode === 'light' ? '🌙' : '☀️'} />
                                ),
                            }}
                        />
                    </Stack>
                </PatientProvider>
            </PaperProvider>
        </ThemeProvider>
    );
}