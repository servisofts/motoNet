import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import * as Pages from '../../Pages'
import { connect } from 'react-redux';

import Theme from '../../Styles/Theme.json'
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
                    backgroundColor: Theme.colors.fondo,
                    flex: 1,
                    alignItems: "center",
                }}>



                <Text style={{ color: "#fff" }}>Lista de paginas...</Text>
                {
                    this.arr.map((obj, key) => {

                        return (
                            <TouchableOpacity key={key} onPress={() => {
                                this.props.navigation.navigate(obj);
                            }}
                                style={{
                                    width: 200,
                                    height: 40,
                                    borderWidth: 3,
                                    borderColor: "#000",
                                    margin: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 10
                                }}
                            >
                                <Text style={{ color: Theme.colors.secondary }}>
                                    {obj}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>

        );
    }

};


// export default PagesPage;


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaPaginasPage);
