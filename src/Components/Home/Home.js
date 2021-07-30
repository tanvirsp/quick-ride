import React from 'react';
import fakeData from '../../fakeData';
import Vehicle from '../Vehicle/Vehicle'
import './Home.css';

const Home = () => {
    return (
        <div className="main-section">
            <div className="container custom-row ">
                <div className="row ">
                    {
                        fakeData.map(vehicle => <Vehicle key={vehicle.id} vehicle ={vehicle}></Vehicle>)
                    }
                </div>
            
            </div>
        </div>
    );
};

export default Home;