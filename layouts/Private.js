//import libs
import React from "react";
import PropTypes from "prop-types";
import SideBarNav from "../common/navigation/SideBarNav";
import MiniSideBarNav from "../common/navigation/MiniSideBarNav";
import Header from "../common/header/Header";
import "./private.css";
import "../common/content/content.css";
// import components
import LoadingOverlay from "react-loading-overlay";

const displayName = "Private Layout";
const propTypes = {
    children: PropTypes.node.isRequired
};

const PrivateLayout = ({
    children,
    isAuthenticated,
    pageLoading,
    showSidebar,
    user
}) => {
    return (
        <LoadingOverlay active={pageLoading} spinner text="Loading...">
            <div
                className={
                    showSidebar
                        ? "wrapper with-sidebar"
                        : "wrapper without-sidebar"
                }
            >
                {/* <Navigation /> */}
                <Header className="header" />
                {showSidebar ? (
                    <SideBarNav
                        className="sidebar-nav"
                        isAuthenticated={isAuthenticated}
                        user={user}
                    />
                ) : (
                    <MiniSideBarNav
                        className="mini-sidebar-nav"
                        isAuthenticated={isAuthenticated}
                        user={user}
                    />
                )}
                {children}
            </div>
        </LoadingOverlay>
    );
};

PrivateLayout.dispatch = displayName;
PrivateLayout.propTypes = propTypes;

export default React.memo(PrivateLayout);
