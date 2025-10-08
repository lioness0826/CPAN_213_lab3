import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing} from '../../styles/globalStyles';

const CustomButton = ({title, onPress, style, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : {}, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.medium,
  },
  disabled: {
    backgroundColor: Colors.gray,
  },
  text: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
});

export default CustomButton;
