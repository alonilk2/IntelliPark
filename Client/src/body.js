import React, { Component } from 'react';
import './body.css';
class Body extends Component {
    render() {
        return(
            <div>
                <div className="row about">
                    <div className="col-6 midtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor bibendum ligula vel varius. Sed consectetur tellus at massa aliquet ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum vel gravida massa, id convallis nunc. Proin vitae lacinia eros. Quisque quis risus vitae ex efficitur auctor eget nec tellus. Phasellus sit amet mi quis odio egestas consectetur.
                    </div>
                    <div className="col-6">
                        <img src="https://geektech.me/wp-content/uploads/2019/10/883ce7a7352449cf993c04dfad7c0a8c.jpg"></img>
                    </div>
                </div>

                <div className="row contact">
                    <div className="col">
                    </div>
                    <div className="col">

                    </div>
                </div>

                <div className="row lowsection">
                    <div className="col">
                    </div>
                </div>
            </div>
        )
    }
}

export default Body;