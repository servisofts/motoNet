import React, { Component } from 'react';
import { View, Text, Dimensions, Image, InteractionManager, StyleSheet, ScrollView, } from 'react-native';

const DEVICE_WIDTH = Dimensions.get("window").width;

var images = [];

class CaruselImage extends Component {

    scrollRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
        };
        images = props.images
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(
                prev => ({
                    selectIndex: prev.selectIndex === images.length - 1 ? 0 : prev.selectIndex + 1
                }),
                () => {
                    this.scrollRef.current.scrollTo({
                        animated: true,
                        y: 0,
                        x: DEVICE_WIDTH * this.state.selectIndex
                    })
                }
            )
        }, 3000)
    }

    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layouMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectIndex = Math.floor(contentOffset / viewSize);
        this.setState({ selectIndex })
    }

    render() {

        const { selectIndex } = this.state
        const images = this.props.images

        return (
            <View style={{
                'height': Dimensions.get('window').height * 0.35,
            }}>
                <View style={{
                    width: "100%",
                    // 'height': Dimensions.get('window').height * 0.35,
                    height: "100%"
                }}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        // onMomentumScrollEnd={this.setSelectedIndex}
                        ref={this.scrollRef}>
                        {
                            images.map(image => {
                                return (
                                    <Image
                                        key={image}
                                        source={{ uri: image }}
                                        style={{
                                            resizeMode: "stretch",
                                            height: "100%",
                                            width: DEVICE_WIDTH
                                        }}
                                    />
                                )
                            })
                        }
                        {/* <View style={{
                            position: "absolute",
                            bottom: 5,
                            width: "100%",
                            height: 10,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            // backgroundColor: "#ccc"
                        }}>
                            {images.map((image, i) => {
                                <View
                                    key={image}
                                    style={[styles.circule,
                                    { opacity: i === selectIndex ? 1 : 0.5 }
                                    ]}>
                                </View>
                            })}
                        </View> */}
                    </ScrollView>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    circule: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: "#fff",
    }
})

export default CaruselImage;