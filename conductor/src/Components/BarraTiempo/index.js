
import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SText, STheme, SThread, SView } from 'servisofts-component'

type PropsType = {
    sdate: SDate,
    millis: Number,
    onEnd?: () => any
}
export default class BarraTiempo extends Component<PropsType> {
    constructor(props) {
        super(props);
        this.state = {
            time: new SDate(),
        }
        this.isRun = false;
    }

    componentDidMount() {
        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    hilo() {
        if (!this.isRun) return;
        // console.log("Run thread")
        this.setState({ time: new SDate() })
        new SThread(1000 / (1), "thread_barra" + this.props.pk, true).start(() => {
            this.hilo();
        })
    }
    handleEnd() {
        // if (!this.isRun) return;
        // this.isRun = false;
        if (this.props.onEnd) {
            this.props.onEnd();
        }

    }
    render() {
        // let difftime = this.props.sdate.diffTime(this.state.time);
        if (!this.props.sdate) return null;
        let difftime = this.props.sdate.diffTime(new SDate());
        // let diffSec = difftime / 1000;
        // console.log("OO",this.props.sdate);
        // console.log(this.props.sdate, this.state.time)
        // if(this.props.millis>)
        // const ajuste = (2 * 1000)
        const ajuste = 1000 * 2
        let porcent = 1 - ((difftime - ajuste) / (this.props.millis))
        // console.log(difftime, this.props.millis, this.props.millis - difftime)
        // console.log(porcent)
        // if (difftime > this.props.millis) {
        //     porcent = 0;
        // } else {
        //     porcent = 1 - parseFloat((difftime / this.props.millis))
        // }
        // if (porcent >= 1) {
        //     this.handleEnd();
        // }
        if (!porcent) porcent = 0;
        if (porcent >= 1) porcent = 0;
        if (porcent < 0) porcent = 0;

        // console.log(difftime, this.props.millis, porcent)
        return (
            <SView col={"xs-12"} height={8} card
                style={{
                    overflow: "hidden"
                }}
                onLayout={(e) => {
                    this.layout = e.nativeEvent.layout
                    this.width = this.layout.width;
                }} >
                <View
                    style={{
                        width: (this.width ?? 1) * ((porcent) + 0.001),
                        backgroundColor: porcent < 0.25 ? STheme.color.danger : STheme.color.warning,
                        height: "100%"
                    }} />

            </SView>
        )
    }
}