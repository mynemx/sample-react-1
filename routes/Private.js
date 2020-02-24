import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
    module: Module,
    component: Component,
    isAuthenticated,
    user,
    ...rest
}) => {
    function checkPermission() {
        let permissions = rest.permissions || [];
        if (permissions.length < 1) {
            return true;
        }

        for (const element of permissions) {
            let role = user.roles.find(
                obj => obj.name.toLowerCase() === element.toLowerCase()
            );
            if (role) {
                return true;
            }
        }

        return false;
    }

    return rest.redirect ? (
        <Redirect to={rest.to} from={rest.path} />
    ) : (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Module {...props}>
                        {checkPermission() ? (
                            <Component {...props} />
                        ) : (
                            <div className="h4 text-center p-4">
                                {" "}
                                Access Denied !!!
                            </div>
                        )}
                    </Module>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    location: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        user: store.user
    };
}

export default connect(mapStateToProps)(PrivateRoute);
