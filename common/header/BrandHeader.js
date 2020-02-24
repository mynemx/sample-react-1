import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import "./Header.css";

export default class BrandHeader extends PureComponent {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        toggleSidebar: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="brand-header">
                <div className="menu-title"> EASYtel CC </div>
                {this.props.isAuthenticated ? (
                    <IconButton
                        edge="start"
                        className="menu-icon p-1"
                        color="inherit"
                        aria-label="menu"
                        onClick={this.props.toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
