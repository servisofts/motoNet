import React from "react";
import {  RefreshControl } from "react-native";


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


const Refresh = (prop) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);
    return (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    )
}
export default Refresh;
