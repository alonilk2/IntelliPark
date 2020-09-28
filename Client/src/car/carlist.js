
import React, { Component } from 'react';
import httpService from '../HttpService';
import Carblock from './carblock';
let self = 0;
const http = new httpService();
class CarList extends Component {
  constructor(props){
    super(props);
    this.state = {cars:[]};
    this.loadData = this.loadData.bind(this);
    this.carList = this.carList.bind(this);
    this.loadData();
  }
  loadData = () => {
    self = this;
    http.getCars().then((data) => {
      self.setState({cars: data});
    }, err => {

    });
  }
  carList = () => {
    const list = this.state.cars.map((car) =>
      <Carblock key={car.ID} ID={car.ID} Manufacturer={car.Manufacturer} imgurl={car.imgurl}/>
    );
    return (list);
  }
    render () {
        return (    
            <div className="row">
              <div className="card-deck">
                {this.carList()};
              </div>
            </div>
        );
    }
}
export default CarList;
