import styles from "@/styles/stylesheet";
import { View,Text, StyleSheet } from "react-native";

type option = {
    label: string,
    icon?: string,
    value: string,
}

type fieldProps = {
    options: option[]
    responseKey: string,
    onPress: Function,
    value: string
};


export default function FormOptionSelect(field: fieldProps) {

    const handlePress = (value: string) => {
        field.onPress(field.responseKey,value)
    }
    return (
        <View style={[styles.input, optionStyles.optionContainer, styles.formField]}>
            {field.options.map((option,index) => {
                return (
                    <View key={`${field.responseKey} ${index}`} style={optionStyles.optionField}>
                    { option.icon ?
                        <View style={[optionStyles.option, styles.featureWithIcon, index < field.options.length-1 ? optionStyles.notLastOption : optionStyles.lastOption, index > 0 ? optionStyles.notFirstOption : optionStyles.firstOption, field.value==option.value ? styles.selected : ""]} onTouchStart={() => handlePress(option.value)}>
                            <Text style={optionStyles.label}>{option.label}</Text>
                            <Text style={optionStyles.label}>{option.icon}</Text>
                        </View> : 
                        <View style={[optionStyles.option, index < field.options.length-1 ? optionStyles.notLastOption : optionStyles.lastOption, , index > 0 ? optionStyles.notFirstOption : optionStyles.firstOption, field.value==option.value ? styles.selected : ""]} onTouchStart={() => handlePress(option.value)}>
                            <Text style={optionStyles.label}>{option.label}</Text>
                        </View>
                    }
                    <View style={index < field.options.length-1 ? optionStyles.border : ''}/>
                    </View>
                )
            })}
        </View>
    )
}

const optionStyles = StyleSheet.create({
    optionContainer: {
        padding: 0,
      },
      option: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
      },
      optionField: {
        width: '100%'
      },
      border: {
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
        alignSelf: 'center'
      },
      notLastOption: {
        paddingBottom: 20,
      },
      firstOption: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      },
      lastOption: {
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14
      },
      notFirstOption: {
        paddingTop: 20
      },
      label: {
        fontWeight: 500, 
        fontSize: 16
      }
})