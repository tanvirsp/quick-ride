import React from 'react';
import './Thumbnail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserFriends } from '@fortawesome/free-solid-svg-icons'


const Thumbnail = (props) => {
    const {image, name, passenger, price} = props.selectedVehicle;


    return (
        <div className="thumbnail">
            <img src={image} alt="" />
            <h3>{name}</h3>
            <h3> <FontAwesomeIcon icon={faUserFriends} color="gray" style={{marginRight:"10px"}} />{passenger}</h3>
            <h3>$ {price}</h3>
          
        </div>
    );
};

export default Thumbnail;