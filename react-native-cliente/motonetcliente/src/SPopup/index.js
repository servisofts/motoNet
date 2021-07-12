import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Svg from '../Svg';

var INSTANCE = false;


export const SPopupOpen = ({ key, content }) => {
    INSTANCE.open({ key, content });
}
export const SPopupClose = (key) => {
    INSTANCE.close(key);
}
export default class SPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            }
        };
        INSTANCE = this;
    }
    componentDidMount() {
        INSTANCE = this;
    }
    open({ key, content }) {
        // console.log(key);
        this.state.data[key] = content;
        this.setState({ ...this.state });
    }
    close(key) {
        delete this.state.data[key];
        this.setState({ ...this.state });
    }
    getPopups() {
        return Object.keys(this.state.data).map((key) => {
            var obj = this.state.data[key];
            return (
                <TouchableWithoutFeedback onPress={() => {
                    this.close(key);
                }}><View style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    backgroundColor: "#000000aa",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                        <TouchableWithoutFeedback onPress={() => {
                            // console.log("touch2")
                        }}>
                            <View style={{
                                width: "80%",
                                maxWidth: 600,
                                backgroundColor: "#fff",
                                borderRadius: 8,
                                padding: 8,
                                minHeight: 200,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                {obj}
                                <TouchableOpacity style={{
                                    width: 50,
                                    height: 30,
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }} onPress={() => {
                                    this.close(key);
                                }}>
                                   <Svg resource={require("../img/cerrar.svg")} style={{
                                        width: 25,
                                        height: 25,
                                        color:"#000",
                                        left:10,
                                        //top: -10
                                    }} />
                                   
                                    
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }
    render() {
        INSTANCE = this;
        return (
            <>
                {this.getPopups()}
            </>
        );
    }
}
