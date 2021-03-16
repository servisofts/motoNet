import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import * as Pages from '../../Pages'
import { connect } from 'react-redux';
import Styles from '../../Styles';

class ListaPaginasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            y: 0
        };
    }
    componentDidMount() {

    }

    componentWillUnmount() {
    }
    arr = Object.keys(Pages.getPages());
    render() {
        return (

            <View
                style={{
                    backgroundColor: Styles.colors.fondo,
                    flex: 1,
                    alignItems: "center",

                }}>

                <Text style={{ color: "#CBD8D8", fontSize: 30, fontWeight: 'bold' }}>Lista de paginas...</Text>

                <ScrollView style={{ width: "100%" }}>
                    {
                        this.arr.map((obj, key) => {

                            return (

                                <TouchableOpacity key={key} onPress={() => {
                                    this.props.navigation.navigate(obj);
                                }}
                                    style={{
                                        width: "90%",
                                        height: 50,
                                        borderWidth: 3,
                                        borderColor: "#CAC6AC",
                                        margin: 15,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 20
                                    }}
                                >
                                    <Text style={{ color: Theme.colors.secondary, fontSize: 19 }}>
                                        {obj}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }

};


// export default PagesPage;


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaPaginasPage);
