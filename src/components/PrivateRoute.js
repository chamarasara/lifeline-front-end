import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route  {...rest} render={props => (
        sessionStorage.getItem('user')
            ?
            <div>
                <Component {...props} />
            </div>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)