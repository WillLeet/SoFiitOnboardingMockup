import { Text, View, StyleSheet } from 'react-native';

export default function OnboardingCompleteScreen() {
  return (
    <View style={doneStyles.container}>
      <Text style={doneStyles.text}>
        Onboarding complete. Welcome to SoFiiT!
      </Text>    
    </View>
  );
}

const doneStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
  },
});