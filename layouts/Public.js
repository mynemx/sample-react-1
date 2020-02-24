//import libs
import React from "react";
import PropTypes from "prop-types";
import Header from "../common/header/Header";
import "./public.css";

const displayName = "Public Layout";
const propTypes = {
    children: PropTypes.node.isRequired
};

const PublicLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: "90vh" }}>{children}</main>
        </div>
    );
};

PublicLayout.dispatch = displayName;
PublicLayout.propTypes = propTypes;

export default React.memo(PublicLayout);
