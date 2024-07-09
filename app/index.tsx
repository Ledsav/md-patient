import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, FlatList, RefreshControl, ListRenderItem } from 'react-native';
import {PatientContextType, usePatient} from '@/context/PatientContext';
import TakePhoto from "@/components/features/photo/TakePhoto";
import Gallery from "@/components/features/gallery/Gallery";
import CustomSlider from "@/components/features/slider/Slider";
import { Container, Card, Title, SubTitle, StyledButton, ButtonText } from "@/style/StyledComponents";
import { theme } from "@/style/Theme";
import { useTheme } from 'styled-components/native';

interface PatientInfoProps {
    patientId: string;
    setPatientId: (id: string) => void;
}

interface SectionItem {
    key: string;
    component: React.ComponentType<any>;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patientId, setPatientId }) => (
    <Card style={styles.card}>
        <Title>Patient ID: {patientId}</Title>
        <StyledButton onPress={() => setPatientId('')}>
            <ButtonText>Change ID</ButtonText>
        </StyledButton>
    </Card>
);

const sections: SectionItem[] = [
    { key: 'patientInfo', component: PatientInfo },
    { key: 'takePhoto', component: TakePhoto },
    { key: 'gallery', component: Gallery },
    { key: 'slider', component: CustomSlider },
];

export default function Index() {
    const { patientId, setPatientId } = usePatient() as PatientContextType;
    const [tempId, setTempId] = useState<string>('');
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [galleryKey, setGalleryKey] = useState<number>(0);
    const currentTheme = useTheme();

    const handleSetPatientId = () => {
        if (tempId.trim() !== '') {
            setPatientId(tempId);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setGalleryKey(prevKey => prevKey + 1);
        setRefreshing(false);
    }, []);

    const handlePhotoTaken = () => {
        onRefresh();
    };

    const renderItem: ListRenderItem<SectionItem> = ({ item }) => {
        if (item.key === 'patientInfo') {
            return <PatientInfo patientId={patientId} setPatientId={setPatientId} />;
        }
        if (item.key === 'takePhoto') {
            return <TakePhoto onPhotoTaken={handlePhotoTaken} />;
        }
        if (item.key === 'gallery') {
            return <Gallery key={galleryKey} />;
        }
        const Component = item.component;
        return <Component />;
    };

    if (!patientId) {
        return (
            <Container>
                <Card>
                    <Title>Enter Patient ID</Title>
                    <SubTitle>Please enter a patient ID to continue</SubTitle>
                    <TextInput
                        style={[styles.input, { color: currentTheme.colors[currentTheme.themeMode].text }]}
                        value={tempId}
                        onChangeText={setTempId}
                        placeholder="Enter Patient ID"
                        placeholderTextColor={currentTheme.colors[currentTheme.themeMode].subText}
                    />
                    <StyledButton onPress={handleSetPatientId}>
                        <ButtonText>Set Patient ID</ButtonText>
                    </StyledButton>
                </Card>
            </Container>
        );
    }

    return (
        <Container>
            <FlatList<SectionItem>
                data={sections}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    card: {
        marginBottom: theme.spacing.md,
    },
    input: {
        borderWidth: 1,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
});