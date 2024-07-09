import React, { useState } from 'react';
import { Image, ImageProps, View, ActivityIndicator, StyleSheet } from 'react-native';

interface CustomImageProps extends ImageProps {
    placeholderColor?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ style, placeholderColor = '#ccc', ...props }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={[styles.container, style]}>
            {isLoading && (
                <View style={[styles.placeholder, { backgroundColor: placeholderColor }]}>
                    <ActivityIndicator size="small" color="#999" />
                </View>
            )}
            <Image
                {...props}
                style={[styles.image, style]}
                onLoad={() => setIsLoading(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    placeholder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default CustomImage;