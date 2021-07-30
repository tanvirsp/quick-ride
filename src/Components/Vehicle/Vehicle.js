import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Vehicle.css';

const Vehicle = (props) => {
    const {name, image, id } = props.vehicle;
    const history = useHistory();


    const handleDestination = (id)=> {
        history.push (`/destination/${id}`);
    }

    return (
        <div className="col-sm-12 col-md-6 col-lg-4  col-xl-3 text-center">
            <div className="custom-card" onClick={()=>handleDestination(id)}>
                <img src={image} alt="" />
                <h2 >{name}</h2>
            </div>
        </div>
    );
};

export default Vehicle;