import { Text, View, StyleSheet, Animated } from "react-native";
import styles  from "@/styles/stylesheet";
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { useEffect } from "react";

const logo = require('@/assets/images/LOGO.png');


export default function Index() {

  const router = useRouter();

  const fadeAnim = new Animated.Value(1)

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      delay: 1200,
      useNativeDriver: true
    }).start();
    setTimeout(() => {
      router.replace('/intro')
    }, 2400);
  }, [fadeAnim])

  return (
    <View style={[styles.bgContainer,{backgroundColor: '#000'}]}>
      <Animated.View style={[styles.logoContainer, 
      {
        opacity: fadeAnim
      }]}>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image}/>
        </View>
      </Animated.View>
    </View>
  );
}