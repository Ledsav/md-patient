import styled from 'styled-components/native';
import { ViewProps, TextProps, TouchableOpacityProps } from 'react-native';
import {Theme, ThemeMode} from "@/style/Theme";


type ThemedProps<P> = P & { theme: Theme & { themeMode: ThemeMode } };

export const Card = styled.View<ViewProps>`
  background-color: ${(props: ThemedProps<ViewProps>) => props.theme.colors[props.theme.themeMode]?.card || '#ffffff'};
  border-radius: ${(props: ThemedProps<ViewProps>) => props.theme.borderRadius?.md || 8}px;
  padding: ${(props: ThemedProps<ViewProps>) => props.theme.spacing?.md || 16}px;
  border: 1px solid ${(props: ThemedProps<ViewProps>) => props.theme.colors[props.theme.themeMode]?.border || '#e2e8f0'};
`;

export const StyledButton = styled.TouchableOpacity<TouchableOpacityProps>`
  background-color: ${(props: ThemedProps<TouchableOpacityProps>) => props.theme.colors[props.theme.themeMode]?.primary || '#0a7ea4'};
  padding: ${(props: ThemedProps<TouchableOpacityProps>) => props.theme.spacing?.md || 16}px;
  border-radius: ${(props: ThemedProps<TouchableOpacityProps>) => props.theme.borderRadius?.md || 8}px;
  align-items: center;
`;

export const ButtonText = styled.Text<TextProps>`
  color: ${(props: ThemedProps<TextProps>) => props.theme.colors[props.theme.themeMode]?.background || '#ffffff'};
  font-size: ${(props: ThemedProps<TextProps>) => props.theme.fontSize?.md || 16}px;
  font-weight: ${(props: ThemedProps<TextProps>) => props.theme.fontWeight?.medium || '500'};
`;

export const Title = styled.Text<TextProps>`
  font-size: ${(props: ThemedProps<TextProps>) => props.theme.fontSize?.xl || 24}px;
  font-weight: ${(props: ThemedProps<TextProps>) => props.theme.fontWeight?.bold || '700'};
  color: ${(props: ThemedProps<TextProps>) => props.theme.colors[props.theme.themeMode]?.text || '#1e293b'};
  margin-bottom: ${(props: ThemedProps<TextProps>) => props.theme.spacing?.sm || 8}px;
`;

export const SubTitle = styled.Text<TextProps>`
  font-size: ${(props: ThemedProps<TextProps>) => props.theme.fontSize?.md || 16}px;
  color: ${(props: ThemedProps<TextProps>) => props.theme.colors[props.theme.themeMode]?.subText || '#64748b'};
  margin-bottom: ${(props: ThemedProps<TextProps>) => props.theme.spacing?.xs || 4}px;
`;

export const Container = styled.View<ViewProps>`
  flex: 1;
  padding: ${(props: ThemedProps<ViewProps>) => props.theme.spacing?.md || 16}px;
  background-color: ${(props: ThemedProps<ViewProps>) => props.theme.colors[props.theme.themeMode]?.background || '#ffffff'};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.View`
  flex-direction: column;
`;