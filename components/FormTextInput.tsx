import styles from "@/styles/stylesheet";
import { View,Text,TextInput } from "react-native";
import PhoneInput from 'react-native-phone-input';


type fieldProps = {
    value: string,
    label: string,
    responseKey: string,
    placeholder: string,
    inputType: string,
    onPress: Function
};


export default function FormTextInput(field: fieldProps) {

    const handleChange = (text: string) => {
        field.onPress(field.responseKey,text)
    }

    return (
        <View style={[styles.form, styles.formField]}>
            {field.inputType == 'phone' ? 
            <View>
                <PhoneInput style={styles.input} initialCountry={'us'} onChangePhoneNumber={(number) => handleChange(String(number))}/>
            </View>
             : 
             <View>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                style={[styles.input, field.inputType=='multiline' ? styles.textArea : ""]}
                onChangeText={handleChange}
                value={field.value ?? ""}
                placeholder={field.placeholder ?? ""}
                placeholderTextColor={"#7C7C7C"}
                keyboardType={field.inputType == 'number' ? 'numeric' : 'default'}
                multiline={field.inputType == 'multiline'}
                numberOfLines={field.inputType == 'multiline' ? 10 : 1}
                />
            </View>
        }
        </View>
            
    )
}

