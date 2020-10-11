
import React, { Component, useState } from 'react';
import httpService from '../HttpService';
import Carblock from './carblock';
import Axios from 'axios';
import './carlist.css';
import { ManuList } from '../Constants/carConst';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Base64 } from 'js-base64';
import Dropzone from "react-dropzone";
const http = new httpService();
class CarList extends Component {
  constructor(props){
    super(props);
    this.state = {cars:[], email:this.props.email, show:false};
  }
  async componentWillMount() {
    this.carList = this.carList.bind(this);
    var req = {
      "email": this.state.email
    }
    var carsToList = await Axios.post("http://localhost:3001/getCars", req);
    this.setState({cars: carsToList.data});
  }

  carList = () => {
      if(this.state.cars) {    
          const list = this.state.cars.map((car) =>
          <Carblock car={car} key={car.ID}/>
          )
          return (list);
      }
  }
  
  setShow = (bool) => {
    this.setState({show: bool});
  }

    render () {
        return (    
            <div className="row">
              {this.carList()}
              <div className="col-4 addcarbtn">
                <Button variant="primary" className="addBtn" onClick={()=>{this.setState({show: true})}}>Add New Car</Button>
              </div>
              <Modal
                show={this.state.show}
                onHide={() => this.setState({show: false})}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Add New Car
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <BodyHandler email={this.props.email} setShow={this.setShow}/>
                </Modal.Body>
            </Modal>
            </div>
        );
    } 
}

function BodyHandler(props) {
  const getManufacturers = () => {
    let i;
    let arr = Object.keys(ManuList).map((key)=> {
        return <option value={key}>{key}</option>
    });
    return arr;
  }
  const getYears = () => {
    var i = 1900;
    let year = new Date().getFullYear();
    let yearArr = [];
    for(i = 1900; i <= year; i++){
        yearArr.push(<option>{i}</option>);
    }
    return yearArr;
  }
  const [newMan, setNewMan] = useState(false);
  const [newModel, setNewModel] = useState(false);
  const [newYear, setNewYear] = useState(false);
  const [newID, setNewID] = useState(false);
  const [newColor, setNewColor] = useState(false);
  const [newfile, setFile] = useState([]);
  const [strTXT, setText] = useState([]);
  const [email, setEmail] = useState(props.email);
  const [displayState, setDisplayState] = useState(0);
  const [vaildated, setVaildated] = useState(false);
  const onDrop = acceptedFiles => {
    setFile(acceptedFiles[0]);
    setText(acceptedFiles[0].name);
  }
  const handleSaveEntries = async (e) => {
    const form = e.currentTarget;
    if(form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setVaildated(true);
    var fdata = new FormData()
    fdata.append('img', newfile);
    fdata.append('Manufacturer', newMan)
    fdata.append('Model', newModel)
    fdata.append('year', newYear)
    fdata.append('color', newColor)
    fdata.append('ID', newID)
    fdata.append('email', email)
    await Axios.post("http://localhost:3001/addNewCar", fdata)
        .then(res => {
            setDisplayState(1);
        })
        .catch(err => console.error(err));
  }
  switch(displayState) {
    case 0: {
      return (
        <Form validated={vaildated} onSubmit={handleSaveEntries}>
          <Form.Row>
            <Form.Group as={Col} controlId="formManufacturer">
              <Form.Label>Manufacturer:</Form.Label>
              <Form.Control   
                required                              
                as="select"
                defaultValue="Choose..."
                custom onChange={(e)=>{e.target.value!=="Choose..." ? setNewMan(e.target.value) : setNewMan(false)}}
              >
                  <option>Choose...</option>
                  {getManufacturers()}
              </Form.Control>
            </Form.Group>
      
            <Form.Group as={Col} controlId="Model">
              <Form.Label>Model:</Form.Label>
              <Form.Control placeholder="model" custom onChange={(e)=>{setNewModel(e.target.value)}} required/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress1">
              <Form.Label>Number Plate:</Form.Label>
              <Form.Control placeholder="numberplate" custom onChange={(e)=>{setNewID(e.target.value)}} required/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Label>Color:</Form.Label>
              <Form.Control placeholder="color" custom onChange={(e)=>{setNewColor(e.target.value)}} required/>
            </Form.Group>
            </Form.Row>
            <Form.Group controlId="modelyear">
                <Form.Label>Model Year:</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." onChange={(e)=>{setNewYear(e.target.value)}} required>
                    <option>Choose...</option>
                    {getYears()}
                </Form.Control>
            </Form.Group>
          <Form.Row>
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <img src="https://cdn.iconscout.com/icon/free/png-256/cloud-data-uploading-upload-ftp-file-backup-8-26058.png" class="upimg" alt="background-dropzone"></img>
                </div>
                )}
            </Dropzone>
            <ul className="uploader-ul">
                <div className="row">
                    <div className="col-8 leftcol">
                        <strong>File: </strong><li key={strTXT}>{strTXT}</li>
                    </div>
                </div>
            </ul>
          </Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )
    }
    case 1: {
      return (
        <div>
          <div className="success-body">
              <p>Car was added successfully.</p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Checkmark_green.svg/1180px-Checkmark_green.svg.png" alt="" className="confirm-sign"></img>
          </div>
          <div className="okay-btn">
              <Button className="cancelbtn" variant="secondary" onClick={()=>{props.setShow(false)}}>OK</Button>
          </div>
      </div>       
      )
      
    }
  }  
  
}
export default CarList;
