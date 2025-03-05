import { Text,StyleProp, TextStyle } from "react-native";

type fieldProps = {
    style: StyleProp<TextStyle>
    content: string
    gapSize: number
};


export default function FormText(field: fieldProps){

    return (
        <Text style={[field.style,{marginLeft: '5%', marginBottom: field.gapSize ?? 0, padding: 10}]}>
            {field.content}
        </Text>
    )
}