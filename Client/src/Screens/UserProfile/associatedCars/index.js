import React from 'react';
import CarList from '../../../car/carlist'
import cookie from 'js-cookie'
function AssociatedCars() {
    const userInstance = cookie.get('userInstance');
    const user = JSON.parse(userInstance);
    return (
        <div className="associatedCars-root">
            <CarList email={user.data.email}/>
        </div>
    )
}

export default AssociatedCars;