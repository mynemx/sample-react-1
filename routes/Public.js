import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({ component: Component, ...rest }) => {
    return rest.redirect ? (
        <Redirect to={rest.to} from={rest.path} />
    ) : (
        <Route {...rest} render={props => <Component {...props} />} />
    );
};

PublicRoutes.propTypes = {
    location: PropTypes.object
};

export default PublicRoutes;
