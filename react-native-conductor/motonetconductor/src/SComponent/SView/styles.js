import { StyleSheet } from "react-native"
import { STheme } from "../STheme"

//------ESTILOS------
// En los estilos NO SE DEVE colocar
//Tamanhos y fomas


type Typesp = "default" | "primary" | "secondary" | "card"


export type TypeStyles = Typesp | [Typesp]

const getType = (type: TypeStyles) => {
    switch (type) {
        case "secondary":
            return StyleSheet.create({
                "View": {
                    backgroundColor: STheme().colorSecondary,
                }
            })
        case "primary":
            return StyleSheet.create({
                "View": {
                    backgroundColor: STheme().colorPrimary,
                }
            })
        case "card":
            return StyleSheet.create({
                "View": {
                    backgroundColor: "#66000066",
                    borderRadius: 4,
                    minHeight: 30,
                    padding: 4,
                }
            })
        default:
            return StyleSheet.create({
                "View": {
                }
            })
    }
}

export const CustomStyles = (type: TypeStyles) => {
    var arrStyles = type;
    if (typeof type == "string") {
        arrStyles = type.split(" ");
    }
    var styleTemp = []
    for (let i = 0; i < arrStyles.length; i++) {
        styleTemp.push(getType(arrStyles[i]));
    }
    return StyleSheet.flatten(styleTemp)
}

