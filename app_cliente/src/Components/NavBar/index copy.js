import React from 'react';
import { Animated } from 'react-native';
import { SView, SImage, SNavigation, STheme, SIcon, SText, SScrollView2, SHr, SThread } from 'servisofts-component';
import { connect } from 'react-redux';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
// import CerrarSession from '../../Pages/Usuario/Page/Perfil/CerrarSession';

import { version as APPversion } from "../../../package.json";
class NavBar extends React.Component {
	static INSTACE = null;
	static open() {
		NavBar.INSTACE.fadeIn();
	}
	static close() {
		NavBar.INSTACE.fadeOut();
	}

	constructor(props) {
		super(props);
		this.state = {
			timeAnim: 350,
			isOpen: false,
		};
		NavBar.INSTACE = this;
		this.animSize = new Animated.Value(!this.state.isOpen ? 0 : 1);
	}


	fadeIn() {
		this.setState({ isOpen: true });
		new SThread(250, "ASdasd", true).start(() => {
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
			this.state.width = 0;
			this.setState({ isOpen: false, });
		});
	}

	renderUserData() {
		var usuario = Model.usuario.Action.getUsuarioLog();
		if (!usuario) return <SView col={"xs-12"} center height onPress={() => {
			SNavigation.navigate("/login")
			this.fadeOut();
		}}>
			<SText color={STheme.color.secondary} fontSize={18} center>{"Inicia sesión en DHM."}</SText>
			{/* <SText color={STheme.color.l} fontSize={12} center>{"Algunas funciones se encuentran desactivadas hasta que inicies session con un usuario."}</SText> */}
		</SView>;
		return <SView row col={"xs-12"}>
			<SView col={"xs-3"} center style={{ textAlign: "right" }} height>
				<SView style={{
					width: 50,
					height: 50, borderRadius: 30, overflow: "hidden", borderWidth: 1, borderColor: "#fff"
				}}>
					<SView style={{
						position: "absolute"
					}}>
						<SIcon name='InputUser' />
					</SView>
					<SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()} style={{
						width: "100%",
						height: "100%",
						resizeMode: "cover"
					}} />
				</SView>
			</SView>
			<SView col={"xs-9"} onPress={() => {
				SNavigation.navigate('perfil');
				this.fadeOut();
			}}>
				<SText
					style={{ color: "#fff", fontSize: 20, }}>{usuario?.Nombres}</SText>
				{/* style={{ color: "#fff", fontSize: 20, }}>Editar</SText> */}
				<SView height={22} onPress={() => {
					SNavigation.navigate('/perfil')
					this.fadeOut();
				}} style={{
					// paddingLeft: 6,
					alignItems: 'center',
				}} row>
					<SText fontSize={12} color={"#eee"} font='LondonTwo' style={{
						// textDecorationLine: 'underline',
					}}>Ver perfil </SText>
					<SIcon name="Ver" width={9} color="#fff" />
				</SView>
			</SView>
		</SView>
	}

	renderIcon({ label, path, icon, onPress, requireUser, noWithUser }) {
		if (requireUser) {
			if (!Model.usuario.Action.getKey()) {
				return null;
			}
		}
		if (noWithUser) {
			if (Model.usuario.Action.getKey()) {
				return null;
			}
		}
		return <SView col={"xs-11"} height={60} border={'transparent'} row onPress={() => {
			if (onPress) {
				onPress()
				return;
			}
			SNavigation.navigate(path); this.fadeOut();
		}}  >
			<SView col={"xs-10"} height style={{ justifyContent: 'flex-start', }} row center>
				<SIcon fill="#666666" name={icon} width={32} height={31} />
				<SText style={{ paddingLeft: 5, color: "#666666", fontSize: 16 }} >{label}</SText>
			</SView>
			<SView col={"xs-2"} height style={{ justifyContent: 'flex-end', }} row center>
				<SIcon fill={STheme.color.secondary} name={"Icon1"} width={20} height={20} />
			</SView>
		</SView>
	}
	getNav() {
		if (!this.state.width) return null;
		return <SView col={"xs-9 md-6 xl-4"} height animated backgroundColor={STheme.color.background} style={{
			position: "absolute",
			transform: [{ translateX: this.animSize.interpolate({ inputRange: [0, 1], outputRange: [this.state.width * -1, 0], }) }]
		}}>
			<SView col={"xs-12"} backgroundColor={STheme.color.primary} width="100%" height={105} center style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} >
				{this.renderUserData()}
			</SView>
			<SHr height={20} />
			<SScrollView2 disableHorizontal contentContainerStyle={{ width: "100%" }} >
				<SView col={"xs-12"} center  >
					{this.renderIcon({ label: "Inicio", icon: "Inicio", path: "/root" })}
					{this.renderIcon({ label: "Mis direcciones", icon: "Direccion", path: "/direccion", requireUser: true })}
					{this.renderIcon({ label: "Mis compras", icon: "Compras", path: "/misCompras", requireUser: true })}
					{this.renderIcon({ label: "Mis cupones", icon: "mCupon", path: "/cupones", requireUser: true })}
					{this.renderIcon({ label: "Mi billetera", icon: "Billetera", path: "/billetera", requireUser: true })}
					{this.renderIcon({ label: "Notificaciones", icon: "mNotification", path: "/notificaciones", requireUser: true })}

					{this.renderIcon({ label: "Novedades", icon: "Novedades", path: "/novedades" })}
					{this.renderIcon({ label: "Contactos", icon: "Contacto", path: "/contacto" })}
					{this.renderIcon({ label: "Soporte", icon: "AppAlert", path: "/ayuda" })}
					{this.renderIcon({
						label: "Salir", icon: "Exit", requireUser: true,
						onPress: () => {
							// Model._events.CLEAR();
							Model.usuario.Action.unlogin();
							SNavigation.reset("/");
							this.fadeOut();
						}
					})}
					{this.renderIcon({ label: "Login", icon: "Exit", path: "/login", noWithUser: true })}


					<SHr height={20} />

					<SView col={"xs-9.5 md-5.8 xl-3.8"} center style={{ bottom: 0, }}>
						<SIcon name={"Logo"} height={70} />
					</SView>
					<SView row >
						<SText style={{ paddingLeft: 5, paddingTop: 2, color: "#666666", fontSize: 18 }} font={"LondonMM"}>Version {APPversion}</SText>
					</SView>
				</SView>
				<SHr height={50} />
			</SScrollView2>
			<SView height={20} col={"xs-12"} backgroundColor={STheme.color.accent} />
		</SView>
	}

	render() {
		NavBar.INSTACE = this;
		if (!this.state.isOpen) return null;
		return (
			<SView style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				//backgroundColor: "#66000066",
				backgroundColor: STheme.color.card,
			}}
				onLayout={(event) => {
					if (this.state.width) return;
					this.state.width = event.nativeEvent.layout.width;
					new SThread(100, "sadads", false).start(() => {
						this.setState({ ...this.state });
					})

				}}
				activeOpacity={1}
				onPress={() => {
					if (this.state.isOpen) {
						this.fadeOut();
					} else {
						this.fadeIn();
					}
				}
				}>
				{this.getNav()}
			</SView>
		);
	}
}

const initStates = (state) => {
	return { state }
};
export default connect(initStates)(NavBar);