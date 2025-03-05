import { validatePathConfig } from "expo-router/build/fork/getPathFromState-forks";
import { StyleSheet } from "react-native"
import { Dimensions } from "react-native";


const screenWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
    logoContainer: {
      flex: 1,
      backgroundColor: '#3F0835',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 1
    },
    bgContainer: {
      flex: 1,
      backgroundColor: '#fff',
      marginLeft: 0
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    image: {
      width: 130,
      height: 40,
      borderRadius: 0,
    },
    header: {
        alignSelf: 'flex-start',
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    footer: {
        alignSelf: 'flex-end'
    },
    barContainer: {
        flex: 2,
        maxWidth: screenWidth * 0.5
    },
    placeholder: {
        width: 10,
        height: 10
    },
    form: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '100%'
    },
    formField: {
      margin: 10,
      alignSelf: 'center'
    },
    input: {
      fontSize: 14,
      padding: 10,
      borderRadius: 15,
      borderColor: "#e2e2e2",
      borderWidth: 1,
      width: screenWidth * 0.9
    },
    textArea: {
      height: 180
    },
    label: {
      fontSize: 12,
      alignSelf: 'flex-start',
      marginLeft: 10,
      marginBottom: 10
    },
    selected: {
      backgroundColor: "#DFE4F7",
    },
    featureWithIcon: {
      justifyContent: 'space-between'
    },
})

export default styles;