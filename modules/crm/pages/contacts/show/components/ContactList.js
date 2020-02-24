import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const displayName = "ContactList";
const propTypes = {
    contact: PropTypes.object.isRequired
};

const ContactList = ({ contact }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">Contacts</div>
                <div className="heading-elements"></div>
            </div>
            <div className="card-body"></div>
        </div>
    );
};

ContactList.displayName = displayName;
ContactList.propTypes = propTypes;

export default React.memo(ContactList);
