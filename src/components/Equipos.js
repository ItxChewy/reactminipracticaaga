import React, { Component } from 'react'
import axios from 'axios';

export default class Equipos extends Component {
    cajaNombre = React.createRef();
    selectEquipo = React.createRef();
    urlEquipos = "https://apiejemplos.azurewebsites.net/"

    state = {
        equipos: [],
        jugadores: null,
        todosJugadores: []
    }

    cargarTodosJugadores = () => {
        let request = "api/Jugadores"
        axios.get(this.urlEquipos + request).then(response => {
            this.setState({
                todosJugadores: response.data

            })
        })
    }

    cargarEquipos = () => {
        let request = "api/Equipos"
        axios.get(this.urlEquipos + request).then(response => {
            this.setState({
                equipos: response.data
            })
        })
    }

    componentDidMount = () => {
        this.cargarEquipos();
        this.cargarTodosJugadores();
    }

    buscarJugadoresPorEquipo = (e) => {
        e.preventDefault();
        var idSeleccionado = this.selectEquipo.current.value;
        let request = "api/Jugadores/JugadoresEquipos/" + idSeleccionado
        axios.get(this.urlEquipos + request).then(response => {
            this.setState({
                jugadores: response.data
            })
        })
    }

    buscarJugadoresPorNombre = (e) => {
        e.preventDefault();
        var nombreSeleccionado = this.cajaNombre.current.value;
        var aux = [];
        for (var i = 0; i <= this.state.todosJugadores.length - 1; i++) {
            if ((this.state.todosJugadores[i].nombre.includes(nombreSeleccionado))) {
                aux.push(this.state.todosJugadores[i])
            }
        }
        this.setState({
            jugadores: aux
        })
    }

    render() {
        return (
            <div>
                <h1>Equipos</h1>
                <form onSubmit={this.buscarJugadoresPorNombre}>
                    <label>Nombre jugador: </label>
                    <input type='text' ref={this.cajaNombre}></input>
                    <button>Buscar por nombre</button>
                </form>
                <hr />
                <form onSubmit={this.buscarJugadoresPorEquipo}>
                    <label>Seleccione u equipo: </label>
                    <select ref={this.selectEquipo}>
                        {
                            this.state.equipos.map((equipo, index) => {
                                return (
                                    <option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>
                                )
                            })
                        }
                    </select>
                    <button>Buscar Jugadores</button>
                </form>
                {
                    this.state.jugadores &&
                    (
                        <table border={"1px"}>
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Posicion</th>
                                    <th>Pais</th>
                                    <th>Fecha Nacimiento</th>
                                </tr>
                            </thead>
                            <tbody>{
                                this.state.jugadores.map((jugador, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><img src={jugador.imagen}></img></td>
                                            <td>{jugador.nombre}</td>
                                            <td>{jugador.posicion}</td>
                                            <td>{jugador.pais}</td>
                                            <td>{jugador.fechaNacimiento}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    )
                }
            </div>
        )
    }
}
