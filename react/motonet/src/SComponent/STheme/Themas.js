import { StyleSheet, View, ColorPropType } from 'react-native';
export type propsTypeText = {
    colorPrimary: String,
    colorSecondary: Stirng,
}
export type propsType = {
    colorPrimary: ColorPropType,
    colorSecondary: ColorPropType,
    colorTextPrimary: ColorPropType,
    colorTextSecondary: ColorPropType,
    backgroundColor: ColorPropType,
    colorDanger: ColorPropType,
    colorOpaque: ColorPropType,

}
// const Themas = {
//     default: {
//         colorPrimary: "#ffffff",
//         colorSecondary: "#000000",
//         backgroundColor: "#222222",
//         colorDanger: "#C31C37",
//         colorOpaque:"#aaaaaa"
//     },
//     dark: {
//         colorPrimary: "#000000",
//         colorSecondary: "#ffffff",
//         backgroundColor: "#dddddd",
//         colorDanger: "#C31C37",
//         colorOpaque:"#884444"

//     }
// };
const Themas = {
    default: {
        colorPrimary: "#F7001D",
        colorSecondary: "#000000",
        colorTextPrimary: "#ffffff",
        backgroundColor: "#dddddd",
        colorDanger: "#C31C37",
        colorOpaque: "#666666"
    },
    dark: {
        colorPrimary: "#660000",
        colorSecondary: "#ffffff",
        colorTextPrimary: "#aaaaaa",
        backgroundColor: "#000000",
        colorDanger: "#C31C37",
        colorOpaque: "#999999"

    }
};
export default Themas;