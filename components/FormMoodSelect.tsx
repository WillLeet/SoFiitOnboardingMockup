import styles from "@/styles/stylesheet";
import { View,Text, StyleSheet } from "react-native";

type fieldProps = {
    responseKey: string,
    onPress: Function,
    value: string
};

type option = {
    label: string,
    value: string
}


export default function FormMoodSelect(field: fieldProps) {

    const options: option[] = [
        {
            label: '😩',
            value: '0'
        },
        {
            label: '🙁',
            value: '1'
        },
        {
            label: '😐',
            value: '2'
        },
        {
            label: '🙂',
            value: '3'
        },
        {
            label: '😃',
            value: '4'
        }
    ]

    const handlePress = (value: string) => {
        field.onPress(field.responseKey,value)
    }
    return (
        <View style={[styles.formField, moodStyles.container]}>
            {options.map((option, index) => { return (
            <View key={`${field.responseKey} ${index}`} style={[moodStyles.option, option.value == field.value ? moodStyles.selected : '']} onTouchStart={() => handlePress(option.value)}>
                <Text style={{fontSize: 25}}>{option.label}</Text>
            </View>
            )})}
        </View>
    )
}

/*
            {field.options.map((option,index) => {
                return (
                    <View key={`${field.responseKey} ${index}`} style={optionStyles.optionField}>
                    { option.icon ?
                        <View style={[optionStyles.option, styles.featureWithIcon, index < field.options.length-1 ? optionStyles.notLastOption : optionStyles.lastOption, index > 0 ? optionStyles.notFirstOption : optionStyles.firstOption, field.value==option.value ? styles.selected : ""]} onTouchStart={() => handlePress(option.value)}>
                            <Text style={{fontWeight: 500}}>{option.label}</Text>
                            <Text>{option.icon}</Text>
                        </View> : 
                        <View style={[optionStyles.option, index < field.options.length-1 ? optionStyles.notLastOption : optionStyles.lastOption, , index > 0 ? optionStyles.notFirstOption : optionStyles.firstOption, field.value==option.value ? styles.selected : ""]} onTouchStart={() => handlePress(option.value)}>
                            <Text style={{fontWeight: 500}}>{option.label}</Text>
                        </View>
                    }
                    <View style={index < field.options.length-1 ? optionStyles.border : ''}/>
                    </View>
                )
            })}
*/

const moodStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
      },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderColor: "#E2E2E2",
        borderWidth: 1,
        borderRadius: 10,
        margin: 10
    },
    selected: {
        backgroundColor: "#EFF1FC",
        borderColor: "#656BFF"
    }
})