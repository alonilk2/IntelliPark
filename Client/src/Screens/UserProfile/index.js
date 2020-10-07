import Axios from "axios";

import React, { useEffect, useState ,useCallback} from 'react';
import './index.css';
import NavBar from '../../navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getavatar } from '../../actions/authActions';
import { Base64 } from 'js-base64';
import Dropzone from "react-dropzone";
import AssociatedCars from './associatedCars';


function UserProfile(props) {
    const dispatch = useDispatch();
    const userInstance = useSelector(state=>state.user);
    const { data } = userInstance;
    const [newfile, setFile] = useState([]);
    const [imgString, setImage] = useState('');
    const [strTXT, setText] = useState([]);
    const [carCount, setCarCount] = useState('');
    const img = dispatch(getavatar({'email':data.email}));
    var imgstr = img.then((res) => {
        let u8s = new Uint8Array(res.data.image.data);
        setImage("data:"+res.data.contentType+";base64,"+Base64.fromUint8Array(u8s));
    }).catch((err) => {
        console.log(err);
    })
    const handleUpload = (e) => {
        e.preventDefault();
        const fdata = new FormData()
        fdata.append('avatar', newfile);
        fdata.append('user', data.email);
        Axios.post("http://localhost:3001/upload-file", fdata).then(res => {
            let u8s = new Uint8Array(res.image);
            setImage("data:"+res.contentType+";base64,"+Base64.fromUint8Array(u8s))
            }).catch(err => console.error(err));
    }
    const onDrop = acceptedFiles => {
        setFile(acceptedFiles[0]);
        setText(acceptedFiles[0].name);
    }

    return (   
        <div>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col avatarcontainer">
                        <img className="avatarimg" src={imgString} alt="profile img"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h1>{data.firstname} {data.lastname}</h1>
                    </div>
                </div>
                <div class="accordion" id="accordionProfile">
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Edit Profile Picture
                            </button>
                        </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionProfile">
                        <div class="card-body">
                            <div className="upcontainer">
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
                                                <strong>Files: </strong><li key={strTXT}>{strTXT}</li>
                                            </div>
                                            <div className="col-4 rightcol">
                                                <button type="button" class="upbtn" onClick={handleUpload}>Upload</button>
                                            </div>
                                        </div>
                                </ul>
                       
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Edit Associated Cars
                                </button>
                            </h2>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionProfile">
                            <div class="card-body">
                                    <AssociatedCars />
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
}
export default UserProfile;
