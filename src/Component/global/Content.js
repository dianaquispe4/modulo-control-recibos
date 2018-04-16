import React, {Component} from 'react';
import Listardatos from './ListarComprobantes';
import './css/Content.css';
import './css/bootstrap.css';

class Content extends Component{


    constructor(){
        super();

        this.state = {
            lista:null,
            nombre_apellido:"",
            concepto:"",
            dni:"",
            recibo:"",
            dates:"",
            dates2:"",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSearchClick=this.handleSearchClick.bind(this);
        this.handleInputName=this.handleInputName.bind(this);
        this.handleInputConcepto=this.handleInputConcepto.bind(this);
        this.handleInputRecibo=this.handleInputRecibo.bind(this);
        this.handleInputDni=this.handleInputDni.bind(this);
    }
    // leer del input Concepto
    handleInputConcepto(data){
            this.setState({
                concepto:data.target.value
        });
    }

    //leer del input recibo
    handleInputRecibo(data){
        this.setState({
            recibo: data.target.value
        });
    }
    //leer del input DNI
    handleInputDni(data){
        this.setState({
            dni: data.target.value
        });
    }
    // funcion del calendario en date se almacena la fecha seleccionada
    handleChange(date) {
        this.setState({
            dates: date.target.value
        });
        console.log(date.target.value);
        console.log(this.state.dates);
    }
    handleChange2(date) {
        this.setState({
            dates2: date.target.value
        });
        console.log(this.state.dates2);
    }

    // ingresar texto
    handleInputName(e){
        if(e.target.id==="busca"){
            this.setState({
                nombre_apellido: e.target.value
            });
        }
    }

    //buscar
   handleSearchClick(e) {
        let url = 'https://api-modulocontrol.herokuapp.com/recaudaciones/';
                  url = url.concat('detallada/');
       if(this.state.nombre_apellido === "" && this.state.concepto === ""&& this.state.recibo === "" &&
           this.state.dates2 === "" && this.state.dates === "" && this.state.dni === ""){
           let varN="";
           this.setState({
               lista:varN
           });
       }else{

           let arra = {
               "nombre": this.state.nombre_apellido,
               "periodoI": this.state.dates,
               "id_concepto": this.state.concepto,
               "periodoF": this.state.dates2,
               "voucher":this.state.recibo,
               "dni":this.state.dni
           };
           fetch(url, {

               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(arra, null, 2)

           })
               .then((response) => {
                   return response.json()
               })
               .then(responseJson => {

                   this.setState({
                       lista: responseJson.data
                   })
               });



       }




    }


    render(){
        return(
            <div className="content">
                <div className="buscar">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Nombres y Apellidos</span>
                        </div>
                        <input id="busca" type="text" className="form-control" value={this.state.nombre_apellido} onChange={this.handleInputName} placeholder="nombre apellido" aria-label="Username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Concepto de Pago</span>
                        </div>
                        <input id="concepto" type="text" className="form-control" value={this.state.concepto} onChange={this.handleInputConcepto} placeholder="ejem:123,123,123" aria-label="Username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">DNI o Codigo</span>
                        </div>
                        <input id="dni" type="text" className="form-control" value={this.state.dni} onChange={this.handleInputDni} placeholder="codigo" aria-label="Username" aria-describedby="basic-addon1"></input>
                    </div>
                    {/*<div className="calendar">
			      <label className="periodo" id="periodo">Periodo</label>
			      <input type="date" className="calendario_1" onChange={this.handleChange}/>
			      <input type="date" className="calendario_2" onChange={this.handleChange2}/>
						<br />
					</div>
				*/}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Periodo</span>
                        </div>
                        <input type="date" className="form-control"  onChange={this.handleChange} aria-label="Username" aria-describedby="basic-addon1"></input>
                        <input type="date" className="form-control"  onChange={this.handleChange2} aria-label="Username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Recibo</span>
                        </div>
                        <input id="recibo" type="text" className="form-control" value={this.state.recibo} onChange={this.handleInputRecibo} placeholder="ejem:cod1,cod2,..." aria-label="Username" aria-describedby="basic-addon1"></input>
                    </div>
                    <button id="Buscar" onClick={this.handleSearchClick} className="btn btn-outline-success">Buscar</button>
                </div>
                <div className="listar">
                    <Listardatos listado={this.state.lista} />
                </div>
            </div>
        );

    }
}
export default Content;