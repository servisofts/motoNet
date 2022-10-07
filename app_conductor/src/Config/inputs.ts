import { SInputsCofig, STheme } from 'servisofts-component';
const inputs = (): SInputsCofig => {
    return {
        motonet: {
            LabelStyle: {
                position: "absolute",
                top: -12,
                left: 0,
                fontSize: 14,
                width: "100%",
                color: "#ffffff",
                // backgroundColor:STheme.color.primary+"22",
                // borderRadius:4,
                // padding:4,
                // backgroundColor: "#E0E0E0" + "55",
            },
            View: {
                borderWidth: 1,
                borderColor: "#ffffff",
                height: 50,
                borderRadius: 4,
                marginTop: 35,
                paddingStart: 4,
                // backgroundColor: STheme.color.card,
                // backgroundColor: '#E0E0E0' + '35'
            },
            InputText: {
                fontSize: 14,
                paddingStart: 8,
                color: STheme.color.secondary,

                // backgroundColor: "#E0E0E0" + "55",
                // height: 55,
                // borderRadius: 16,
                // backgroundColor: STheme.color.card,
                placeholderTextColor: "#ffffff"
            },
            error: {
                // borderRadius: 16,
                borderWidth: 1,
                // borderColor: "#F5BD02"
                borderColor: "#1C3057"
            },
            placeholder: {
                color: "#ffffff"
            }
        },
        default: {
            LabelStyle: {
                position: "absolute",
                top: -12,
                left: 0,
                fontSize: 14,
                width: "100%",
                color: "#000000",
                // backgroundColor:STheme.color.primary+"22",
                // borderRadius:4,
                // padding:4,
                // backgroundColor: "#E0E0E0" + "55",
            },
            View: {
                borderWidth: 1,
                borderColor: STheme.color.card,
                height: 40,
                borderRadius: 4,
                marginTop: 30,
                paddingStart: 4,
                // backgroundColor: STheme.color.card,
                // backgroundColor: '#E0E0E0' + '35'
            },
            InputText: {
                fontSize: 14,
                paddingStart: 8,
                color: STheme.color.text,

                // backgroundColor: "#E0E0E0" + "55",
                // height: 55,
                // borderRadius: 16,
                // backgroundColor: STheme.color.card,
                placeholderTextColor: STheme.color.text,
            },
            error: {
                // borderRadius: 16,
                borderWidth: 1,
                borderColor: "#FA8081"
            },
            placeholder: {
                color: STheme.color.text,
            }
        }
    }
}
export default inputs;
