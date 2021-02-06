import React, { useState } from 'react';
import './body.css';
import tunn from './tunn.jpg';
function Body(props) {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [text, setText] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();

    }
    return(
        <div>
            <div className="row bodyhead">
                <div className="col leftcol">
                    ABCDEFH
                </div>
                <div className="col rightcol">

                </div>
            </div>
            <div className="row about">
                <div className="col-6 midtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor bibendum ligula vel varius. Sed consectetur tellus at massa aliquet ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum vel gravida massa, id convallis nunc. Proin vitae lacinia eros. Quisque quis risus vitae ex efficitur auctor eget nec tellus. Phasellus sit amet mi quis odio egestas consectetur.
                </div>
                <div className="col-6">
                    <img src="https://geektech.me/wp-content/uploads/2019/10/883ce7a7352449cf993c04dfad7c0a8c.jpg" alt=""></img>
                </div>
            </div>
            <div className="contact">
                <div className="background-img">
                    <div className="row">
                        <div className="col formcol">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="Fullname" placeholder="Fullname" onChange={(e) => setFullname(e)}></input>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e)}></input>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="phonenum" aria-describedby="phone" placeholder="Enter phone number" onChange={(e) => setPhone(e)}></input>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email or phone number with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Textarea">Write your thoughts...</label>
                                    <textarea className="form-control" id="Textarea" rows="3" onChange={(e)=>setText(e)}></textarea>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Accept recieving Newsletters and sale announcements</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="col contact-title-col">
                            <h1 className="contact-title">Contact Us</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body;