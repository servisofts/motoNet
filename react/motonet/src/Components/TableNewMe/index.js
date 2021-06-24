import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatButtom from '../../Components/FloatButtom'
import * as  cargarDatosPersonalesActions from '../../Actions/cargarDatosPersonalesActions';
import { Grid, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import "./index.css";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { DeleteOutline } from '@material-ui/icons';


class TableNewMe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {
                key: "fecha_on",
                dir: "desc"
            },
            busqueda: {
                value: ""
            }
        }
        if (props.order) {
            this.state.order = props.order;
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
        if (this.props.onDelete) {
            // header.push({ id: 'Delete', label: 'Eliminar' })
            var exist = false;
            header.map((obj) => {
                if (obj.id == "Delete") {
                    exist = true;
                }
            });
            if (!exist) {
                header.push({ id: 'Delete', label: 'Eliminar' })
            }
        }

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
                var textA = datito[a][keyOrder].dato.toLowerCase();
                var textB = datito[b][keyOrder].dato.toLowerCase();
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
                var expreg = new RegExp("dato.:.*?" + val + ".*?(,|})", "i");
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
                            if (obj2.id == "key" || obj2.id == "Key") {
                                return (<td style={{ maxWidth: 80, fontSize: 10, }}>
                                    {dato.dato}
                                </td>)
                            }
                            if (obj2.id == "Editar") {
                                return (
                                    <td style={{ maxWidth: 80, fontSize: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "center" }}
                                            onClick={(evt) => {
                                                this.props.editClick(usuario.key);
                                                evt.preventDefault()
                                                evt.stopPropagation();
                                            }}>
                                            <EditIcon style={{
                                                width: 35,
                                                height: 35,
                                                fill: '#FFBF36',
                                                textAlign: 'center'
                                            }} />
                                        </div>
                                    </td>)
                            }
                            if (obj2.id == "Delete") {
                                return (<td style={{ maxWidth: 80, fontSize: 10, alignItems: 'center', justifyContent: 'center', }}>
                                    <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "center" }}
                                        onClick={() => {
                                            this.props.onDelete(usuario.key);
                                        }}>

                                        <DeleteOutline style={{
                                            width: 35,
                                            height: 35,
                                            fill: '#f02',
                                            textAlign: 'center'
                                        }} />
                                    </div>
                                </td>)
                            }
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
                <div className="tituloAndFloat" >
                    <Grid container direction="row">
                        <Grid item xs={10}>
                            <h1 style={{
                                fontFamily: 'arial, sans-serif'
                            }}>
                                {this.props.title}
                            </h1>
                        </Grid>
                        {(this.props.onAdd) ?
                        <Grid item xs={2}>
                            <FloatButtom onClick={this.props.onAdd} />
                        </Grid> : ""}
                    </Grid>
                    <Grid container direction="row">
                        <Grid item xs={10}>
                            <div style={{
                                marginBottom: 30,
                                height: 55, 
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
                <table className="table">
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

const initActions = {
    ...cargarDatosPersonalesActions
};

export default connect(initStates, initActions)(TableNewMe);