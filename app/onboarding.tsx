import { View, ScrollView, Keyboard, Animated, Modal } from "react-native";
import ProgressBar from "@/components/ProgressBar";
import onboardingForm from "@/lib/onboardingForm";
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "@/styles/stylesheet";
import { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { useRouter } from 'expo-router'

export default function OnboardingFormPage() {

    const router = useRouter();

    const [formResponses, setFormResponses] = useState<{[fieldName: string]: string}> ({});
    const [activeModal,setActiveModal] = useState('');
    const [currentPage,setCurrentPage] = useState(0)
    
    const screenWidth = Dimensions.get('screen').width
    const screenHeight = Dimensions.get('screen').height

    const nextPageButtonAnim = useRef(new Animated.ValueXY({x: Math.floor(screenWidth*0.8), y: Math.floor(screenHeight*0.75)})).current;

    let keyboardInUse = false

    const currentResponsesFilled = onboardingForm[currentPage].validateInputCompletion(formResponses)

    useEffect(() => {
        Keyboard.addListener('keyboardWillShow', () => {
            if(!keyboardInUse){
                keyboardInUse = true
                Animated.spring(nextPageButtonAnim, {
                    toValue: {x: Math.floor(screenWidth*0.8), y: Math.floor(screenHeight*0.4)},
                    useNativeDriver: false,
                    friction: 15,
                    tension: 65
                }).start()
            }
        });
        Keyboard.addListener('keyboardWillHide', () => {
            if(keyboardInUse){
                keyboardInUse = false
                Animated.spring(nextPageButtonAnim, {
                    toValue: {x: Math.floor(screenWidth*0.8), y: Math.floor(screenHeight*0.75)},
                    useNativeDriver: false,
                    friction: 15,
                    tension: 65
                }).start()
            }
        });
    },[nextPageButtonAnim])

    const onChange = (key: string, value: string) => {
        setActiveModal('')
        setFormResponses({ ...formResponses, [key]: value });
    }

    const toggleModal = (modal: string) => {
        setActiveModal(modal)
    }

    const handleNextPage = () => {
        if(currentPage<onboardingForm.length-1){
            setCurrentPage(currentPage+1)
        } else {
            router.replace('/done')
        }
    }

  return (
    <View style={styles.bgContainer}>
        <View style={[styles.header]}>
            {currentPage>0 ? 
            <AntDesign name="left" size={24} color="black" onPress={()=>setCurrentPage(currentPage-1)}/>
            :
            <AntDesign name="left" size={24} color="#CDCDCD"/>
            }
            <View style={styles.barContainer}>
                <ProgressBar stage={onboardingForm[currentPage].progressStage}/>
            </View>
            <View/>
        </View>
        <View style={{height: '100%', flex: 1}}>
            <ScrollView>
               {onboardingForm[currentPage].render(formResponses,onChange,toggleModal,activeModal)}
                <View style={{marginTop: 20}}/>
            </ScrollView>
        </View>
        <Animated.View style={[{position: 'absolute'},nextPageButtonAnim.getLayout()]}>
            {currentResponsesFilled ? 
            <AntDesign name="rightcircle" size={50} color="#F1301B" onPress={handleNextPage} style={{backgroundColor: 'white', borderRadius: 50}}/>
            :
            <AntDesign name="rightcircle" size={50} color="#CDCDCD" style={{backgroundColor: 'white', borderRadius: 50}}/>
            }
        </Animated.View>
    </View>
  );
}