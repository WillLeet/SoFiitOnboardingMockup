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
    value: string,
    selectedColors?: string[]
};


export default function FormMultiselect(field: fieldProps) {

    const selectedStyle = field.selectedColors ? {
        backgroundColor: field.selectedColors[0],
        borderColor: field.selectedColors[1]
    } : styles.selected

    const currentlySelected: string[] = (field.value ?? "").length>0 ?  field.value.split(',') : []
    const handlePress = (value: string) => {
        const newSelected = currentlySelected.filter(element=>element!=value)
        if(newSelected.length == currentlySelected.length){
            newSelected.push(value)
        }
        field.onPress(field.responseKey,newSelected.join(','));

    }

    return (
        <View style={[multiselectStyles.multiselectContainer,styles.formField]}>
            {field.options.map((option,index) => {
                return (
                    <View key={`${field.responseKey} ${index}`} style={[multiselectStyles.option, styles.featureWithIcon, currentlySelected.includes(option.value) ? selectedStyle : '']} onTouchStart={() => handlePress(option.value)}>
                        <Text style={[multiselectStyles.optionText,multiselectStyles.optionLabel]}>{option.label}</Text>
                        <Text style={multiselectStyles.optionText}>{option.icon}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const multiselectStyles = StyleSheet.create({
    multiselectContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '90%',
      },
      option: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        height: 30,
        borderRadius: 30,
        marginRight: 20,
        marginBottom: 10,
        backgroundColor: "#F8F8F8",
        borderColor: "#e2e2e2",
        borderWidth: 1,
      },
      optionText: {
          fontSize: 12,
          fontWeight: 400
      },
      optionLabel: {
          marginRight: 5
      }
})