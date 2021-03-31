import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatButtom from '../FloatButtom'
import { Grid, TextField } from '@material-ui/core';
import "./index.css";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


class TableNewMe2 extends Component {
    constructor(props) {
        super(props)
        var order = {};
        if (!props.order) {
            order = {
                key: "nombre",
                dir: "asc"
            }
        } else {
            order = props.order;
        }
        this.state = {
            order: order,
            busqueda: {
                value: ""
            }
        }
    }

    renderTableHeader() {
        const isSelected = (obj, key) => {
            if (obj.id == this.state.order.key) {
                if (this.state.order.dir == "asc") {
                    return <ArrowDropDownIcon style={{
                        position: "absolute", transform: "rotate(180deg)",

                    }} />
                } else {
                    return <ArrowDropDownIcon style={{ position: "absolute", }} />
                }
            } else {
                return <div />
            }
        }

        let header = this.props.head;
        return header.map((obj, key) => {
            return <th key={key} onClick={() => {
                if (obj.id == this.state.order.key) {
                    if (this.state.order.dir == "asc") {
                        this.state.order.dir = "desc";
                    } else {
                        this.state.order.dir = "asc";
                    }
                } else {
                    this.state.order.key = obj.id;
                }
                this.setState({ ...this.state })
                return <div />
            }} >
                {obj.label}
                {isSelected(obj, key)}
            </th>
        })
    }
    modeloVacio() {
        return (
            <div style={{ textAlign: "center", fontSize: 22 }}>
                Sin datos
            </div>
        )
    }
    renderTableData() {
        if (!this.props.data) {
            return this.modeloVacio()
        }
        if (!this.props.data[0]) {
            return this.modeloVacio()
        }
        var datito = this.props.data; /**sigo con duda */
        var keyOrder = this.state.order.key;
        var dirOrder = this.state.order.dir;

        const ordenador = (listaKeys) => {
            //hacer metodo de ordenamiento
            listaKeys.sort(function (a, b) {
                if (keyOrder == "fecha_on") {
                    var dateA = new Date(datito[a][keyOrder]).getTime()
                    var dateB = new Date(datito[b][keyOrder]).getTime()
                    if (dirOrder == "asc") {
                        return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
                    } else {
                        return (dateA < dateB) ? 1 : (dateA > dateB) ? -1 : 0;
                    }
                }
                var textA = datito[a][keyOrder];
                var textB = datito[b][keyOrder];
                if (dirOrder == "asc") {
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                } else {
                    return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
                }

            });
            return listaKeys;
        }
        const buscar = (listaKeys) => {
            var val = this.state.busqueda.value || "";
            var arrPalabras = val.replaceAll(" ", "|");
            var arr2 = [];
            listaKeys.map((key) => {
                var obj = datito[key];
                var str = JSON.stringify(obj);
                var expreg = new RegExp(":.*?" + val + ".*?(,|})", "i");
                if (expreg.test(str)) {
                    arr2.push(key);
                }
            })
            return arr2;
        }
        return ordenador(buscar(Object.keys(datito))).map((key) => {
            var usuario = datito[key];
            return (
                <tr  onClick={() => {
                    if (!this.props.handleClick) {
                        return;
                    }
                    this.props.handleClick(usuario.key)
                }}>
                    {
                        this.props.head.map((obj2, key2) => {
                            var dato = usuario[obj2.id];
                            if (obj2.id == "fecha_on") {
                                dato = new Date(dato).toLocaleString()
                            }
                            if (obj2.id == "key" || obj2.id == "Key") {
                                return (
                                    <td style={{
                                        fontSize:10,
                                        width:100,
                                    }}>
                                        {dato}
                                    </td>
                                )
                            }
                            if (!dato) {
                                return (
                                    <td>
                                        0
                                    </td>
                                )
                            }
                            return (
                                <td style={{
                                    backgroundColor: '#fff',

                                }}>
                                    {dato}
                                </td>
                            )
                        })
                    }
                </tr>
            )
        })
    }

    getButtonAdd = () => {
        if (!this.props.onAdd) {
            return <div />
        }
        return <FloatButtom onClick={this.props.onAdd} />
    }
    render() {
        return (
            <div style={{ overflow: 'auto', display: 'block', width: "100%", }}>
                <div className="tituloAndFloat">
                    <Grid container direction="row" >
                        <Grid item xs={10} style={{
                        }}>
                            <h1 style={{
                                fontFamily: 'arial, sans-serif'
                            }}>
                                {this.props.title}
                            </h1>
                        </Grid>

                        <Grid item xs={2} style={{

                        }}>
                            {this.getButtonAdd()}
                        </Grid>
                        <Grid xs={10}>
                            <div style={{
                                marginBottom: 10,
                                height: 55,

                                borderRadius: 10,
                                overflow: "hidden",
                                border: "3px solid #aaa"
                            }}>
                                <input
                                    id="outlined-full-width"
                                    //label="Label"                                
                                    placeholder="Buscar"
                                    /*fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"*/
                                    /*InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}*/
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        fontSize: 18,
                                        border: 0,
                                        paddingLeft: 10,
                                    }}
                                    value={this.state.busqueda.value}
                                    onChange={(evt) => {
                                        this.state.busqueda.value = evt.currentTarget.value;
                                        this.setState({ ...this.state });
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <table className="table" style={{
                    width: "100%",
                }}>
                    <thead >
                        {this.renderTableHeader()}
                    </thead>
                    <tbody >
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const initStates = (state) => {
    return { state }
};



export default connect(initStates)(TableNewMe2);
