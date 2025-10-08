import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Fonts = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
};
export const Colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  accent: '#e74c3c',
  background: '#f8f9fa',
  surface: '#ffffff',
  text: {
    primary: '#2c3e50',
    secondary: '#7f8c8d',
    light: '#ecf0f1',
  },
  border: '#dee2e6',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
export const GlobalStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  buttonText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  errorText: {
    color: Colors.accent,
    fontSize: Fonts.small,
    marginLeft: Spacing.sm,
    marginTop: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: Fonts.medium,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  inputError: {
    borderColor: Colors.accent,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
});
console.log('✅ [globalStyles] Fonts loaded =', Fonts);
