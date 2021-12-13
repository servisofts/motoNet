import { Platform } from "react-native";

const initialState = {
    navigationOptions: {
        headerShown: false,
        title: "Default",
        headerTitleStyle: {
            color: '#fff',
        },
        isBack: false,

    },
    navigation: false,
    setParams: (nav, params) => {
        if (nav) {
            // if (!initialState.navigation) {
            initialState.navigation = nav;
            // }
            if (params) {
                initialState.navigationOptions = {
                    ...initialState.navigationOptions,
                    ...params,
                };

                initialState.navigation.state.prop = initialState.navigationOptions;
                initialState.navigation.setParams();
            }

            if (initialState.store) {
                initialState.store.dispatch({
                    component: "navigation",
                    type: "change",
                    estado: "cargando",
                    ...initialState
                })
            }
        }

    },
    navigate: (page) => {
        initialState.navigation.navigate(page);
        initialState.navigation.state.prop.isBack = true;
    },
    replace: (page) => {
            initialState.navigation.replace(page);
    }


}

export default (state = initialState, action) => {
    if (action.component === "navigation") {
        return {
            ...state,
            ...action
        }
    }
    return state
} 