
import React, { useEffect, useState } from 'react';
import './carblock.css';
import {useDispatch } from 'react-redux';
import { editCar } from '../actions/carActions'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { ManuList } from '../Constants/carConst';
import { Base64 } from 'js-base64';
import Dropzone from "react-dropzone";
import Axios from 'axios';

function Carblock(props) {
	const dispatch = useDispatch();
	const handleEditClick = () => {
		dispatch(editCar(props.car));
    }
    const [blockShow, setBlockShow] = useState(true);
    const [show, setShow] = useState(false);
    const [imgString, setImage] = useState('');
    useEffect(() => {
        if(imgString === '') f1();
    })
    function f1() {
        let u8s = new Uint8Array(props.car.imgurl.image.data);
        setImage("data:"+props.car.imgurl.contentType+";base64,"+Base64.fromUint8Array(u8s));
    }
    function updateImg(imgStr) {
        setImage(imgStr);
        this.forceUpdate();
    }
	if(blockShow) return (
		<div className="col cardblock-container">
			<div className="card cardblock">
                <div className="shaper-gradient">
                    <div className="shaper">
                        <img src={imgString} className="card-img-top" alt=""></img>
                    </div>
                </div>

				<div className="body-card">
					<h5 className="card-title">{props.car.Manufacturer}</h5>
					<p className="card-text">ID: {props.car.ID}</p>
					<button className="edit-btn" onClick={()=>setShow(true)}>Edit</button>
				</div>
			</div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {props.car.Manufacturer}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BodyHandler car={props.car} imgStr={imgString} setRootImg={updateImg} onEntriesChange={setShow} carBlockShow={setBlockShow}></BodyHandler>
                </Modal.Body>
            </Modal>
		</div>
    )
    return null;
}

function BodyHandler(props) {
    const [editState, setEditState] = useState(0);
    const [newMan, setNewMan] = useState(false);
    const [newModel, setNewModel] = useState(false);
    const [newYear, setNewYear] = useState(false);
    const [newImage, setImage] = useState(props.imgStr);
    const [newID, setNewID] = useState(false);
    const [newColor, setNewColor] = useState(false);
    const [newfile, setFile] = useState([]);
    const [strTXT, setText] = useState([]);
    const [showErr, setShowErr]= useState(false); 
    const [errorMsg, setErrorMsg] = useState('');
    const getManufacturers = () => {
        let i;
        let arr = Object.keys(ManuList).map((key)=> {
            return <option value={key}>{key}</option>
        });
        return arr;
    }
    const handleSaveEntries = (e) => {
        e.preventDefault();
        const data = {
            Manufacturer: newMan!==false ? newMan : props.car.Manufacturer,
            Model: newModel!==false ? newModel : props.car.Model,
            year: newYear!==false ? newYear : props.car.year,
            color: newColor!==false ? newColor : props.car.color,
            ID: newID!==false ? newID : props.car.ID,
            carObj: props.car
        }
        Axios.post("http://localhost:3001/updateCar", data).then(res => {
                console.log(res);
            }).catch(err => {
                setShowErr(true);
                setErrorMsg(err);
            });
    }

    const onDrop = acceptedFiles => {
        setFile(acceptedFiles[0]);
        setText(acceptedFiles[0].name);
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
    const onModalClose = () => {
        props.onEntriesChange(false);
        setNewColor(false); 
        setNewMan(false);
        setNewModel(false);
        setNewID(false);
    }
    function ImgSection() {
        return (
            <div className="img-container">
                <img src={newImage} className="modal-img-top" alt=""></img>
                <i class="fas fa-camera" onClick={()=>{setEditState(6)}}></i>
            </div>
        )
    }
    const handleNewImageUpload = (e) => {
        if(newfile){
            e.preventDefault();
            var fdata = new FormData()
            fdata.append('img', newfile);
            fdata.append('carid', props.car._id);
            Axios.post("http://localhost:3001/updateImg", fdata).then(res => {
                console.log(res);
                let u8s = new Uint8Array(res.data.imgurl.image.data);
                setImage("data:"+res.data.imgurl.contentType+";base64,"+Base64.fromUint8Array(u8s));
                props.setRootImg("data:"+res.data.imgurl.contentType+";base64,"+Base64.fromUint8Array(u8s));
                }).catch(err => {
                    setShowErr(true);
                    setErrorMsg(err);
                });
        }
    }
    const handleDeleteCarRequest = async (e, car) => {
        e.preventDefault();
        console.log("id:" + car.ID)
        const url = `http://localhost:3001/car/delete/${car.ID}`;
        try {
            const res = await Axios.delete(url);
            if(res.data===true)
                setEditState(8);
        }
        catch (err) {
            console.log(err);
        }
    }
    switch(editState) {
        case 1: {
            return (
                <div>
                    <ImgSection />
                    <div className="row field-row">                    
                        <div className="col-9"><h5 for="man">Manufacturer:</h5><p>{props.car.Manufacturer}</p></div>
                    </div>
                    <div className="row entries">
                        <Form.Group controlId="changemanufacturer">
                            <Form.Label>Choose Manufacturer:</Form.Label>
                            <Form.Control 
                                as="select"
                                defaultValue="Choose..."
                                custom onChange={(e)=>{e.target.value!=="Choose..." ? setNewMan(e.target.value) : setNewMan(false)}}
                            >
                                <option>Choose...</option>
                                {getManufacturers()}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="row">
                        <div className="col-6 savebtn">
                            <Button variant="primary" type="submit" onClick={(e)=>{
                                setEditState(0);
                            }}>Save</Button></div>
                        <div className="col-6"><Button className="cancelbtn" variant="secondary" onClick={()=>{setEditState(0); setNewMan(false)}} type="submit">Cancel</Button></div>
                    </div>
                </div>
            );
        }
        case 2: {
            return (
                <div>
                    <ImgSection />
                    <div className="row field-row">                    
                        <div className="col-9"><h5 for="man">Model:</h5><p>{props.car.model}</p></div>
                    </div>
                    <div className="row">
                        <Form.Group controlId="changemodel">
                            <Form.Label>Write Model Name:</Form.Label>
                            <Form.Control custom onChange={(e)=>{setNewModel(e.target.value)}}></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="row">
                        <div className="col-6 savebtn"><Button variant="primary" type="submit" onClick={(e)=>{setEditState(0)}}>Save</Button></div>
                        <div className="col-6"><Button className="cancelbtn" variant="secondary" onClick={()=>{setEditState(0); setNewModel(false)}} type="submit">Cancel</Button></div>
                    </div>
                </div>
            );
        }
        case 3: {
            return (
                <div>
                    <ImgSection />
                    <div className="row field-row">                    
                        <div className="col-9"><h5 for="ID">ID:</h5><p>{props.car.ID}</p></div>
                    </div>
                    <div className="row">
                        <Form.Group controlId="changemodel">
                            <Form.Label>New ID:</Form.Label>
                            <Form.Control type="text" onChange={(e)=>{setNewID(e.target.value)}}></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="row">
                        <div className="col-6 savebtn"><Button variant="primary" type="submit" onClick={()=>{setEditState(0)}}>Save</Button></div>
                        <div className="col-6"><Button className="cancelbtn" variant="secondary" onClick={()=>{setNewID(false); setEditState(0)}} type="submit">Cancel</Button></div>
                    </div>
                </div>
            );
        }
        case 4: {
            return (
                <div>
                    <ImgSection />
                    <div className="row field-row">                    
                        <div className="col-9"><h5 for="ID">Color:</h5><p>{props.car.ID}</p></div>
                    </div>
                    <div className="row">
                        <Form.Group controlId="changemodel">
                            <Form.Label>New Color:</Form.Label>
                            <Form.Control type="text" onChange={(e)=>{setNewColor(e.target.value)}}></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="row">
                        <div className="col-6 savebtn"><Button variant="primary" type="submit" onClick={()=>{setEditState(0)}}>Save</Button></div>
                        <div className="col-6"><Button className="cancelbtn" variant="secondary" onClick={()=>{setNewColor(false); setEditState(0)}} type="submit">Cancel</Button></div>
                    </div>
                </div>
            );
        }
        case 5: {
            return (
                <div>
                    <ImgSection />
                    <div className="row field-row">                    
                        <div className="col-9"><h5 for="ID">Model Year:</h5><p>{props.car.ID}</p></div>
                    </div>
                    <div className="row">
                        <Form.Group controlId="changemodel">
                            <Form.Label>Choose Model Year:</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onChange={(e)=>{setNewYear(e.target.value)}}>
                                <option>Choose...</option>
                                {getYears()}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="row">
                        <div className="col-6 savebtn"><Button variant="primary" type="submit" onClick={()=>{setEditState(0)}}>Save</Button></div>
                        <div className="col-6"><Button className="cancelbtn" variant="secondary" onClick={()=>{setNewYear(false); setEditState(0)}} type="submit">Cancel</Button></div>
                    </div>
                </div>
            );
        }
        case 6: {
            return (
                <div>
                    <ImgSection />
                    <div className="row field-row">                    
                        <div className="col-9"><h5 for="ID">Change Image:</h5><p>{props.car.ID}</p></div>
                    </div>
                    <div className="row">
                        <Dropzone onDrop={onDrop}>
                            {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <img src="https://cdn.iconscout.com/icon/free/png-256/cloud-data-uploading-upload-ftp-file-backup-8-26058.png" class="upimg" alt="background-dropzone"></img>
                            </div>
                            )}
                        </Dropzone>
                    </div>
                    <ul className="uploader-ul">
                        <div className="row">
                            <div className="col-8 leftcol">
                                <strong>File: </strong><li key={strTXT}>{strTXT}</li>
                            </div>
                        </div>
                    </ul>
                    <div className="row">
                        <div className="col-6 savebtn"><Button variant="primary" type="submit" onClick={(e)=>{handleNewImageUpload(e)}}>Save</Button></div>
                        <div className="col-6"><Button className="cancelbtn" variant="secondary" onClick={()=>{setNewYear(false); setEditState(0)}} type="submit">Cancel</Button></div>
                    </div>
                </div>
            );
        }
        case 7: {
            if (showErr) {
                return (
                  <Alert variant="danger" onClose={() => setShowErr(false)} dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{errorMsg}</p>
                  </Alert>
                );
            }
        }
        case 8: {
            return (
                <div>
                    <div className="success-body">
                        <p>Car was deleted successfully.</p>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Checkmark_green.svg/1180px-Checkmark_green.svg.png" alt="" className="confirm-sign"></img>
                    </div>
                    <div className="okay-btn">
                        <Button className="cancelbtn" variant="secondary" onClick={()=>{props.carBlockShow(false); props.onEntriesChange(false);}}>OK</Button>
                    </div>
                </div>             
            )
        }
        default: {
            return (
                <div>
                    <ImgSection />
                    <Accordion>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Edit Profile
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="row field-row">                    
                                    <div className="col-9"><h5 for="man">Manufacturer:</h5><p>{newMan===false ? props.car.Manufacturer : newMan}</p></div>
                                    <div className="col-3"><button class="fas fa-edit" onClick={()=>setEditState(1)}></button></div>
                                </div>
                                <div className="row field-row">                    
                                    <div className="col-9"><h5 for="man">Model:</h5><p>{newModel===false ? props.car.Model : newModel}</p></div>
                                    <div className="col-3"><button class="fas fa-edit" onClick={()=>setEditState(2)}></button></div>
                                </div>
                                <div className="row field-row">                    
                                    <div className="col-9"><h5 for="ID">ID:</h5><p>{newID===false ? props.car.ID : newID}</p></div>
                                    <div className="col-3"><button class="fas fa-edit" onClick={()=>setEditState(3)}></button></div>
                                </div>
                                <div className="row field-row">                    
                                    <div className="col-9"><h5 for="COLOR">Color:</h5><p>{newColor===false ? props.car.color : newColor}</p></div>
                                    <div className="col-3"><button class="fas fa-edit" onClick={()=>setEditState(4)}></button></div>
                                </div>
                                <div className="row field-row">                    
                                    <div className="col-9"><h5 for="COLOR">Model Year:</h5><p>{newYear===false ? props.car.year : newYear}</p></div>
                                    <div className="col-3"><button class="fas fa-edit" onClick={()=>setEditState(5)}></button></div>
                                </div>
                                <div className="row">
                                    <div className="col-6 savebtn"><Button variant="primary" type="submit" onClick={(e)=>{handleSaveEntries(e)}}>Save</Button></div>
                                    <div className="col-6"><Button className="cancelbtn" variant="secondary" onClick={()=>{onModalClose()}} type="submit">Cancel</Button></div>
                                </div>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Delete Car
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <p>Are you sure you want to delete this car ?</p>
                                <p className="warn-txt">This Can't Be Undone!</p>
                                <button className="del-btn" onClick={(e)=>{handleDeleteCarRequest(e, props.car)}}>Delete Car</button>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                </div>
            );
        }
    }
}
export default Carblock;