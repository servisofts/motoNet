import React from 'react';
import { Document, Page, Text, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { TouchableOpacity,  } from 'react-native';

const styles = StyleSheet.create({
    text: {
        width: "100%",
        backgroundColor: "#f0f0f0",
        color: "#212121"
    }
});


const Descargar = () => {
    return (
        <Document>
            <Page style={styles.page} size="A4">
                <Text style={styles.text}>Some text...</Text>
                <Text style={styles.text}>Some more text...</Text>
                <Text style={styles.text}>
                    Learn more at <Text>pspdfkit.com</Text>
                </Text>
            </Page>
        </Document>
    )
}

const Pdf = () => {

    return (
        <TouchableOpacity onPress={() => {
            return <PDFDownloadLink document={<Descargar />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        }}>
            Descargar
        </TouchableOpacity>


    )
};


export default Pdf;