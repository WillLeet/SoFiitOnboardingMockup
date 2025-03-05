import styles from "@/styles/stylesheet";
import { View,ScrollView, Text, StyleSheet, Modal } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';


type option = {
    label: string,
    value: string,
}

type fieldProps = {
    label: string
    options: option[]
    responseKey: string,
    onPress: Function,
    activeModal: string,
    modalToggle: Function,
    value: string,
    placeholder: string
};


export default function FormDropdown(field: fieldProps) {

    const handlePress = () => {
        field.modalToggle(field.responseKey)
    }

    const handleSelection = (value: string) => {
        setTimeout(() => {
            field.onPress(field.responseKey,value)
          }, 200);
    }

    let fieldLabel: string = field.placeholder
    for(const option of field.options){
        if(option['value'] == field.value){
            fieldLabel = option['label'];
            break;
        }
    }

    return (
        <View>
            <View style={[styles.formField, dropdownStyles.container]}>
                <Text style={styles.label}>{field.label}</Text>
                <View style={[styles.input, styles.featureWithIcon, dropdownStyles.dropdownContainer]} onTouchStart={handlePress}>
                    <Text style={{color: fieldLabel==field.placeholder ? "#7C7C7C" : "#000"}}>{fieldLabel}</Text>
                    <Entypo name="chevron-down" size={24} color="black" />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={field.activeModal==field.responseKey}
            >
          <View style={dropdownStyles.modalContainer}>
            <ScrollView style={dropdownStyles.modalView}>
                    {field.options.map((option,index) => {
                        return (
                        <View key={`${field.responseKey} ${index}`} style={dropdownStyles.container}>
                            <Text style={{fontWeight: 400}} onPress={(() => handleSelection(option.value))}>{option.label}</Text>
                            {index < field.options.length-1 ? <View style={dropdownStyles.border}/> : <View style={{padding: 20}}/>}
                        </View>
                        )
                    })}
            </ScrollView>
          </View>
            </Modal>
        </View>
    )
}

const dropdownStyles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    dropdownContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5
      },
    modalContainer: {
        position: 'fixed',
        top: '60%'
     },
    border: {
        borderBottomWidth: 1,
        width: '100%',
        borderColor: '#e2e2e2',
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16
    },
    modalView: {
        width: '100%',
        borderRadius: 15,
        borderColor: "#e2e2e2",
        borderBottomWidth: 0,
        backgroundColor: "#fff",
        borderWidth: 1,
        height: '40%',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
})
