import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function PageTitle(props) {
	return (<div className="nav-area">
			<ol className="breadcrumb">
                <li className="module">Tasks</li>
                <li>All</li>
            </ol>

            <ol className="nav-links">
                <li className="active">All</li>
                <li>Ongoing</li>
                <li>Assisting</li>
                <li>Set by me</li>
                <li>Following</li>
                <li>Projects</li>
                <li>Effiency</li>
                <li>Deleted</li>

    
            </ol>
    </div>);
}

PageTitle.propTypes = {
    user: PropTypes.object.isRequired
};
