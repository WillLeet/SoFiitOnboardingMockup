import { View, StyleSheet } from "react-native";

export default function ProgressBar({ stage }: { stage: number }){

    const barStyles = [[styles.bar,styles.hasNext,(stage>=1 ? styles.currentStage : styles.notCurrentStage)],[styles.bar,styles.hasNext, (stage>=2 ? styles.currentStage : styles.notCurrentStage)],[styles.bar, (stage>=3 ? styles.currentStage : styles.notCurrentStage)]];

    return (
        <View style={styles.container}>
            {barStyles.map((style, index) => {
                return (
                    <View style={style} key={index}/>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    bar: {
        flex: 1,
        height: 10,
        borderRadius: 4
    },
    hasNext: {
        marginRight: 20
    },
    currentStage: {
        backgroundColor: "#97578C"
    },
    notCurrentStage: {
        backgroundColor: "#E2E2E2"
    }
  });