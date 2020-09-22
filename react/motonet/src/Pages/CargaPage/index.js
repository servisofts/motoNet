import React, { Component } from 'react'
import { connect } from 'react-redux';

//desde aqui se empieza a exportar los componentes
import Carga from '../../Components/Carga'

class CargaPage extends Component {
    constructor(props){
        super(false)
    }
    render() {
        return (
            <div>
                <Carga propsPadre={this.props} />
            </div>
        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(CargaPage);