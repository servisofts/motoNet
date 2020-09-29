import { Grid } from '@material-ui/core'
import React, { Component } from 'react'

export default class UsaruarioRecuperarPage extends Component {
    render() {

        var listaDeHumanos = [
            {
                nombre: "RRIcky",
                raza: "Camba",
                sexo: "Hombre",
                ci: "",
            },
            {
                nombre: "koki",
                raza: "Gaucho",
                sexo: "Mujer",
                ci: "https://scontent.fsrz1-1.fna.fbcdn.net/v/t1.0-9/68741811_2617031028321012_7851024913702846464_o.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=XG_CjB8PNF4AX8wHBdJ&_nc_ht=scontent.fsrz1-1.fna&oh=b321c85a27af5c1e10ff09f4c68c2927&oe=5F934BC9",
            },
        ];
        return (
            < Grid container justify="center" style={{ background: "#000", height: "100vh" }
            }>

                {listaDeHumanos.map((obj, key) => {
                    return (<Grid xs={10}
                        style={{ background: "#050", height: 100, borderRadius: 50, marginTop: 20 }}
                        container
                    >
                        <Grid xs={2} style={{ height: "100%" }}>
                            <img
                                style={{ width: 70, height: 70, borderRadius: 100, margin: 15 }}
                                src={obj.ci} />
                        </Grid>
                        <Grid xs={8}>
                            <h1 style={{
                                textAlign: "center",
                                color: "#000"
                            }}>
                                {obj.nombre}
                            </h1>
                        </Grid>
                    </Grid>
                    )
                })}
            </Grid >
        )
    }
}


