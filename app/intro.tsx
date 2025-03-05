import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function IntroScreen() {
  return (
    <View style={introStyles.container}>
      <Text style={introStyles.text}>[Onboarding video goes here]</Text>
      <Link href="/onboarding" style={introStyles.text}>
        Go to onboarding
      </Link>    
    </View>
  );
}

const introStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});