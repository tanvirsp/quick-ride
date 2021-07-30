import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserDestinationContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [userDestination, setUserDestination] = useContext(UserDestinationContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                userDestination.isLoggedIn ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRoute;