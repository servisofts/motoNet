import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LineHorizontal = () => {
    return (
        <View style={styles.linemodel} />
    )
}
const styles = StyleSheet.create({
    linemodel: {
        width:"100%",
        height: 1,
        backgroundColor: '#ccc'
    },
})

export default LineHorizontal


