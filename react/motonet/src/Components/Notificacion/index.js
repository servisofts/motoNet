import React from 'react';
//import { Grid } from '@material-ui/core';

const Notificacion = (props) => {
    return (
        
        
        <div elevation={5} style={
            {
                padding: "20px",
                margin: "15px",
                borderRadius: "8px",
                fontFamily: "Arial",
                backgroundColor: '#e8e6ed',
                shadowColor: "#000000",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1,
                    width: 1
                }

            }
        }>
            <div style={
                {
                    fontSize: "20px",
                    fontWeight: 'bold',
                    color:"#000"
                }
            }>
                NOTI!!
        </div>


        </div>

        

    );
}

export default Notificacion;