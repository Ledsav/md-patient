import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { usePatient } from '@/context/PatientContext';
import { Card, Title, SubTitle } from "@/style/StyledComponents";
import { theme } from "@/style/Theme";
import {getPatientImages} from "@/servicies/FirebaseStorage";
import CustomImage from "@/components/Images/CustomImage";

const { width } = Dimensions.get('window');
const imageSize = (width - theme.spacing.md * 4) / 3;

export default function Gallery() {
    const { patientId } = usePatient();
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadImages = async () => {
            if (!patientId) return;
            try {
                setLoading(true);
                const urls = await getPatientImages(patientId);
                setImages(urls);
            } catch (error) {
                console.error('Failed to load images:', error);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, [patientId]);

    return (
        <Card style={styles.card}>
            <Title>Gallery</Title>
            {loading ? (
                <ActivityIndicator size="large" color={theme.colors.light.primary} />
            ) : images.length === 0 ? (
                <SubTitle>No images found for this patient.</SubTitle>
            ) : (
                <View style={styles.imageContainer}>
                    {images.map((item, index) => (
                        <CustomImage
                            key={index}
                            source={{ uri: item }}
                            style={styles.image}
                            placeholderColor={theme.colors.light.border}
                        />
                    ))}
                </View>
            )}
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: theme.spacing.md,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    image: {
        width: imageSize,
        height: imageSize,
        margin: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
});