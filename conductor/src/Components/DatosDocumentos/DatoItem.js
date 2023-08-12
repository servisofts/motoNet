import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native'
import { SForm, SHr, SImage, SInput, SList, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../Model';
import FileItem from './FileItem'
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: 14,
            defaultValue: "--"
        };
    }

    type_text() {
        const { obj, dto } = this.props
        return <SText flex fontSize={this.state.fontSize} >{dto?.descripcion ?? this.state.defaultValue}</SText>
    }
    type_number() {
        const { obj, dto } = this.props
        return <SText flex fontSize={this.state.fontSize}>{dto?.descripcion ?? this.state.defaultValue}</SText>
    }
    type_money() {
        const { obj, dto } = this.props
        return <SText flex fontSize={this.state.fontSize}>Bs. {SMath.formatMoney(dto?.descripcion ?? 0)}</SText>
    }
    type_date() {
        const { obj, dto } = this.props
        return <SText flex fontSize={this.state.fontSize}>{dto?.descripcion ?? this.state.defaultValue}</SText>
    }
    type_image() {
        const { obj, dto } = this.props
        if (!dto) return;
        var filePath = SSocket.api.root + "usuario_dato/" + dto.key_usuario_perfil + "/" + obj.key + "/";
        return <SView col={"xs-12"} >
            <SView width={100} height={100} card>
                <SImage src={filePath + dto.descripcion} enablePreview />
            </SView>
        </SView>
    }

    type_file() {
        const { obj, dto } = this.props
        if (!dto) return <SText>{this.state.defaultValue}</SText>;
        var filePath = SSocket.api.root + "usuario_dato/" + dto.key_usuario_perfil + "/" + obj.key + "/";
        return <SView col={"xs-12"} center>
            <SHr />
            <FileItem name={dto.descripcion} path={filePath} />
        </SView>
    }
    type_files() {
        const { obj, dto } = this.props
        if (!dto) return <SText>{this.state.defaultValue}</SText>;
        var arr = JSON.parse(dto.descripcion);
        if (!arr) return <SText>{this.state.defaultValue}</SText>;
        var filePath = SSocket.api.root + "usuario_dato/" + dto.key_usuario_perfil + "/" + obj.key + "/";
        return <SView col={"xs-12"} center>
            <SHr />
            <SList
                horizontal
                center
                data={arr}
                render={(fil) => {
                    return <FileItem name={fil} path={filePath} />
                }} />
        </SView>

    }
    type_checkBox() {
        const { obj, dto } = this.props
        return <SView>
            <SInput type={"checkBox"} value={dto?.descripcion} disabled={true} />
        </SView>
    }
    type_link() {
        const { obj, dto } = this.props
        return <SText fontSize={this.state.fontSize} color={"#00A"} onPress={() => {
            Linking.openURL(dto?.descripcion)
        }}>{dto?.descripcion ?? this.state.defaultValue}</SText>
    }
    type_default() {
        const { obj, dto } = this.props
        return <SText fontSize={this.state.fontSize}>{dto?.descripcion ?? this.state.defaultValue}</SText>
    }
    getData() {
        switch (this.props.obj.tipo) {
            case "text":
                return this.type_text();
            case "number":
                return this.type_number();
            case "money":
                return this.type_money();
            case "date":
                return this.type_date();
            case "image":
                return this.type_image();
            case "file":
                return this.type_file();
            case "files":
                return this.type_files();
            case "checkBox":
                return this.type_checkBox();
            case "link":
                return this.type_link();
            default:
                return this.type_default();
        }

    }

    getData2() {
        switch (this.props.obj.tipo) {
            case "text":
                return this.type_text();
            case "number":
                return this.type_number();
            case "money":
                return this.type_money();
            case "date":
                return this.type_date();
            case "image":
                return this.type_image();
            case "file":
                return this.type_file();
            case "files":
                return this.type_files();
            case "checkBox":
                return this.type_checkBox();
            case "link":
                return this.type_link();
            default:
                return this.type_default();
        }

    }

    render() {
        const { obj, dto } = this.props
        // const objFiles = obj;
        // delete obj.telefono;

        // if (objFiles["tipo"] === "file") {
        //     delete data.obj;
        //     // console.log(objFiles)
        //     // console.log("ggg")
        //     // console.log(data)
        // }

      
        // Object.values(data).map(obje => {
        //     console.log(obje + "ss")
        // })
        // if(Object.values(data).find(o => o.tipo == "file")) 
        // if (objFiles["tipo"] === "files") {
        //     delete objFiles["tipo"];
        // }
        
        // console.log(this.props)
        return (
            <SView col={"xs-12"} card style={{
                padding: 4,
                borderRadius: 0,
            }} center>
                <SView col={"xs-12"} row style={{
                    overflow: "hidden",
                }} center>
                    <SView col={"xs-4"} center row>
                        <SView width={4} />
                        <SText fontSize={this.state.fontSize - 2} color={STheme.color.gray}>{obj.descripcion} {obj.required ? "*" : ""}</SText>
                        <SView width={4} />
                        {this.getData()}
                        <SView flex />
                    </SView>

                </SView>
                {/* <SText>{obj.tipo}</SText> */}
            </SView>
        );
    }
}
export default (index);