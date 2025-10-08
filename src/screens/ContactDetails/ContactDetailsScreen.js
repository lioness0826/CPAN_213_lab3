import React from 'react';
import {View, Text, Button} from 'react-native';

const ContactDetailsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Contact Details Screen</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ContactDetailsScreen;
