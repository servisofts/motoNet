import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatButtom from '../../Components/FloatButtom'
import { Grid, TextField } from '@material-ui/core';
import "./index.css";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


class TableNewMe2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {
                key: "descripcion",
                dir: "asc"
            },
            busqueda: {
                value: ""
            }
        }
    }

    renderTableHeader() {
        const isSelected = (obj, key) => {
            if (obj.id == this.state.order.key) {
                if (this.state.order.dir == "asc") {
                    return <ArrowDropDownIcon style={{ position: "absolute", transform: "rotate(180deg)" }} />
                } else {
                    return <ArrowDropDownIcon style={{ position: "absolute" }} />
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

    renderTableData() {

        var datito = this.props.data; /**sigo con duda */
        var keyOrder = this.state.order.key;
        var dirOrder = this.state.order.dir;
        const ordenador = (listaKeys) => {
            //hacer metodo de ordenamiento
            listaKeys.sort(function (a, b) {
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
                <tr onClick={() => {
                    if (!this.props.handleClick) {
                        return;
                    }
                    this.props.handleClick(usuario.key)
                }}>
                    {
                        this.props.head.map((obj2, key2) => {
                            var dato = usuario[obj2.id];
                            if (!dato) {
                                return <span>NULL</span>
                            }
                            return (
                                <td>
                                    {dato.dato}
                                </td>
                            )
                        })
                    }
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ overflow: 'auto', display: 'block' }}>
                <div className="tituloAndFloat">
                    <Grid container direction="row">
                        <Grid item xs={10}>
                            <h1 style={{
                                fontFamily: 'arial, sans-serif'
                            }}>
                                {this.props.title}
                            </h1>
                        </Grid>

                        <Grid item xs={2}>
                            <FloatButtom onClick={this.props.onAdd} />
                        </Grid>
                        <Grid xs={12}>
                            <div style={{
                                marginBottom: 30,
                                height: 55,
                                //borderRadius: 20,
                                //overflow: "hidden",
                                //border: "3px solid #aaa"
                            }}>
                                <TextField
                                    id="outlined-full-width"
                                    //label="Label"                                
                                    placeholder="Buscar"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
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
                    width: "100%"
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
