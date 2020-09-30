import Axios from "axios";

import React, { Component } from 'react';
import './index.css';
import NavBar from '../../navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getavatar } from '../../actions/authActions';
import { Base64 } from 'js-base64';
import {useDropzone} from 'react-dropzone';
import cookie from 'js-cookie';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state={newfile: "", imgString: "", strTXT: "", data: ""};
    }
    LoadAvatar = () => {
        const userInstance = cookie.get('userInstance');
        const dispatch = useDispatch();
        const user = JSON.parse(userInstance);
        const img = dispatch(getavatar({'email':user.data.email}));
        var imgstr = img.then((res) => {
            let u8s = new Uint8Array(res.data.image.data);
            this.setState({imgString: "data:"+res.data.contentType+";base64,"+Base64.fromUint8Array(u8s), data: user.data});
        })
        return (
        <div>
            <div className="row">
            <div className="col avatarcontainer">
                <img className="avatarimg" src={this.state.imgString} alt="profile img"></img>
            </div>
            </div>
            <div className="row">
                <div className="col">
                    <h1>{user.data.firstname} {user.data.lastname}</h1>
                </div>
            </div>
        </div>
        )
    }
    handleChange = (e) => {
        this.setState({newfile: e.target.files[0]});
        this.setState({strTXT: JSON.stringify(this.state.newfile.name)});
        this.forceUpdate();

    }
    handleUpload = (e) => {
        e.preventDefault();
        const fdata = new FormData()
        fdata.append('avatar', this.state.newfile);
        fdata.append('user', this.state.data.email);
        Axios.post("http://localhost:3001/upload-file", fdata).then(res => {
            let u8s = new Uint8Array(res.image);
            this.setState({imgString: "data:"+res.data.contentType+";base64,"+Base64.fromUint8Array(u8s)});
            }).catch(err => console.error(err));
        this.forceUpdate();

    }
    fileTexter = () => (<div className="filename">File: {this.state.strTXT}</div>)
    render() {
        return (   
            <div>
                <NavBar />
                <div className="container">
                    <this.LoadAvatar />
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
                                    <form onSubmit={(e) => this.handleUpload(e)}>
                                        <div class="form-group">
                                            <div className="row">
                                                <div className="col-6 leftcol">
                                                    <h1 className="dragdroptxt">Drag&Drop File</h1>
                                                    <span class="btn btn-default btn-file">Browse<input type="file" name="avatar" onChange={(e) => this.handleChange(e)}></input></span>
                                                </div>
                                                <div className="col-6">
                                                    <button type="submit" class="card-image-top upimg"><img className="upimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-GMSCFylgaLjbb7D9CM4x0O5AByXXnHIfPg&usqp=CAU" alt=""></img></button> 
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {this.fileTexter()}
                                </div>
    
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Collapsible Group Item #3
                                </button>
                            </h2>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionProfile">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        );
    }
    
}
export default UserProfile;
