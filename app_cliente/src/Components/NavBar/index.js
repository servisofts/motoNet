import React from 'react';
import { Animated } from 'react-native';
import { SView, SImage, SNavigation, STheme, SIcon, SText, SScrollView2, SThread } from 'servisofts-component';
import { connect } from 'react-redux';
// import CerrarSession from '../../Pages/Usuario/Page/Perfil/CerrarSession';
import Body from "./body"

class NavBar extends React.Component {
	static INSTACE;
	static open() {
		if (!NavBar.INSTACE) return;
		NavBar.INSTACE.fadeIn();
	}
	static close() {
		if (!NavBar.INSTACE) return;
		NavBar.INSTACE.fadeOut();
	}

	constructor(props) {
		super(props);
		this.state = {
			timeAnim: 350,
			isOpen: false,
			width: 0,
		};
		NavBar.INSTACE = this;
		this.animSize = new Animated.Value(!this.state.isOpen ? 0 : 1);
	}
	componentDidMount() {
		NavBar.INSTACE = this;
	}
	fadeIn() {
		this.setState({ isOpen: true });
		new SThread(100, "fadein NavNar", true).start(() => {
			Animated.timing(this.animSize, {
				toValue: 1,
				duration: this.state.timeAnim,
				useNativeDriver: true
			}).start();
		})

	}

	fadeOut() {
		Animated.timing(this.animSize, {
			toValue: 0,
			duration: 0,
			useNativeDriver: true
		}).start(() => {
			this.setState({ isOpen: false });
		});
	}

	render() {
		NavBar.INSTACE = this;
		if (!this.state.isOpen) return null;
		return (
			<>
				<SView style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					//backgroundColor: "#66000066",
					backgroundColor: STheme.color.card,
				}}
					onLayout={(event) => { this.state.width = event.nativeEvent.layout.width }}
					activeOpacity={1}
					onPress={() => {
						if (this.state.isOpen) {
							this.fadeOut();
						} else {
							this.fadeIn();
						}
					}}>
				</SView>
				<SView col={"xs-9 md-6 xl-4"} height animated backgroundColor={STheme.color.background}
					style={{
						position: "absolute",
						// left: this.animSize.interpolate({
						// 	inputRange: [0, 1],
						// 	outputRange: ["-70%", "0%"],
						// }),
						transform: [{
							translateX: this.animSize.interpolate({
								inputRange: [0, 1],
								outputRange: [this.state.width*-1, 0],
							})
						}],
					}}>
					<Body {...this.props} />
				</SView>
			</>
		);
	}
}

const initStates = (state) => {
	return { state }
};
export default connect(initStates)(NavBar);