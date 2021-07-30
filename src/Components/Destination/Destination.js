import React from 'react';
import { Link, useHistory, useParams} from 'react-router-dom';
import './Destination.css';
import map from '../../images/map.png';
import { useState } from 'react';

import { UserDestinationContext } from '../../App';
import { useContext } from 'react';

const Destination = () => {
    const [userDestination, setUserDestination] = useContext(UserDestinationContext);

    const {id} = useParams();
    
    const [destinationInfo, setDestinationInfo] = useState({});



    const history = useHistory();


    const handleOnBlur = (e)=>{
        let deatination = true;
        if(e.target.name ==="pickFrom"){
            deatination = e.target.value;
        }
        if(e.target.name ==="pickTo"){
            deatination = e.target.value;
        }
        if(e.target.name ==="date"){
            deatination = e.target.value;
        }

        if(deatination){
            const newDestination = {...destinationInfo};
            newDestination[e.target.name] = e.target.value;
            newDestination.id =id
            setDestinationInfo(newDestination);
        }
    }
    
 


    const handleSearchResult = (e)=>{  
        const updateDestinationInfo = {...destinationInfo};
        setDestinationInfo(updateDestinationInfo);

        //update Context Api
        const allInfo = {...userDestination, ...updateDestinationInfo }
        setUserDestination( allInfo);

        history.push('/search');
        e.preventDefault();  
    }


    return (
        <div className="container">
            <div className="row row-style">
                <div className="col-xl-4">
                    <div className="desination-form">
                        <form>
                                <label className="form-label" htmlFor="pick-from">Pick From</label>
                                <input onBlur={handleOnBlur} className="form-control" type="text" name="pickFrom" id="pick-from" />

                                <label className="form-label" htmlFor="pick-to">Pick To</label>
                                <input onBlur={handleOnBlur} className="form-control" type="text" name="pickTo" id="pick-to" />
                                
                                <label className="form-labe" htmlFor="date">Select Date</label>
                                <input onBlur={handleOnBlur} className="form-control"  type="date" name="date" id="date"  />
                              
                                <button onClick={handleSearchResult} className="search-btn">Search </button>
                             
                        </form>
                       
                    </div>
                </div>
                <div className="col-xl-8">
                    <img className="google-map" src={map} alt="" />
                </div>
            
            </div>
        </div>
    );
};

export default Destination;