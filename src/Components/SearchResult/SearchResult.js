import React from 'react';
import { useContext } from 'react';
import { UserDestinationContext } from '../../App';
import './SearchResult.css';
import map from '../../images/map.png';
import fakeData from '../../fakeData';
import Thumbnail from '../Thumbnail/Thumbnail';
import { Link } from 'react-router-dom';

const SearchResult = () => {
    const [userDestination, setUserDestination] = useContext(UserDestinationContext);

    const selectedVehicle = fakeData.find(vehicle=> vehicle.id == userDestination.id);
    


    return (
        <div className="container">
        <div className="row row-style">
            <div className="col-xl-4">
                <div className="desination-form">
                    <div className="search-result">
                        <h4>Pick From : <span className="high-light">{userDestination.pickFrom}</span></h4>
                        <h4>Pick To: <span className="high-light">{userDestination.pickTo}</span></h4>
                        <h4>Date :<span className="high-light">{userDestination.date}</span> </h4>
                    </div>
                   {
                      userDestination.id ? <Thumbnail selectedVehicle={selectedVehicle}></Thumbnail>
                       : <p style={{marginTop:"10px"}}>You did not Select Any Vehicle. Please Select <Link to ="/">Vehicle</Link></p>
                   }
                
                  
                   
                </div>
            </div>
            <div className="col-xl-8">
                <img className="google-map" src={map} alt="" />
            </div>
        
        </div>
    </div>
    );
};

export default SearchResult;