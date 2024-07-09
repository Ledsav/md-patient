import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { usePatient } from '@/context/PatientContext';
import { Card, StyledButton, ButtonText, Title, SubTitle, Row } from "@/style/StyledComponents";
import { theme } from "@/style/Theme";
import {uploadImage} from "@/servicies/FirebaseStorage";

interface TakePhotoProps {
    onPhotoTaken: () => void;
}

export default function TakePhoto({ onPhotoTaken }: TakePhotoProps) {
    const { patientId } = usePatient();
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (image) {
            try {
                setUploading(true);
                setError(null);
                const uploadedUrl = await uploadImage(patientId, image, `photo_${Date.now()}.jpg`);
                console.log('Image uploaded:', uploadedUrl);
                setImage(null);
                onPhotoTaken(); // Call the callback to refresh the Gallery
            } catch (error) {
                console.error('Upload failed:', error);
                setError('Failed to upload image. Please try again.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <Card style={styles.card}>
            <Title>Take Photo</Title>
            <Row style={styles.buttonRow}>
                <StyledButton onPress={takePhoto} disabled={uploading} style={styles.button}>
                    <ButtonText>{uploading ? 'Processing...' : 'Take Photo'}</ButtonText>
                </StyledButton>
                {image && (
                    <StyledButton onPress={handleUpload} disabled={uploading} style={styles.button}>
                        <ButtonText>{uploading ? 'Uploading...' : 'Upload Photo'}</ButtonText>
                    </StyledButton>
                )}
            </Row>
            {image && (
                <Image source={{ uri: image }} style={styles.image} />
            )}
            {error && <SubTitle style={styles.errorText}>{error}</SubTitle>}
        </Card>
    );
}

const styles = StyleSheet.create({
    buttonRow: {
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
    },
    button: {
        flex: 1,
        marginHorizontal: theme.spacing.xs,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: theme.borderRadius.md,
        marginTop: theme.spacing.md,
    },
    errorText: {
        color: 'red',
        marginTop: theme.spacing.sm,
    },
    card: {
        marginBottom: theme.spacing.md,
    },
});