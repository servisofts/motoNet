import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatButtom from '../../Components/FloatButtom'
import * as  cargarDatosPersonalesActions from '../../Actions/cargarDatosPersonalesActions';
import { Grid } from '@material-ui/core';
import "./index.css";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';



class TableNewMe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {
                key: "Nombres",
                dir: "asc"
            }
        }
    }

    renderTableHeader() {
        const isSelected = (obj, key) => {
            if (key == this.state.order.key) {
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
                this.state.order.key = key;
                if (key == this.state.order.key) {
                    if (this.state.order.dir == "asc") {
                        this.state.order.dir = "desc";
                    } else {
                        this.state.order.dir = "asc";
                    }
                } else {
                    this.state.order.key = key;
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
        const ordenador = (listaKeys) => {
            //hacer metodo de ordenamiento
            
            return listaKeys;
        }
        return ordenador(Object.keys(datito)).map((key) => {
            var usuario = datito[key];
            return (
                <tr onClick={() => {
                    if(!this.props.handleClick){
                        return;
                    }
                     this.props.handleClick(usuario.key) 
                    }}>
                    {
                        this.props.head.map((obj2, key2) => {
                            var dato = usuario[obj2.id];
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