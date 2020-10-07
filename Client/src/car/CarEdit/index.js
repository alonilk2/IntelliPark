import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../navbar';
import './index.css';
function CarEdit(props) {
    const car = useSelector(state=>state.car);
    console.log(car);
    const {Editing, carObj, error} = car;

    return (
        <div>
            <NavBar />
            <div className="container">
                
            </div>
        </div>
    )
}
export default CarEdit;