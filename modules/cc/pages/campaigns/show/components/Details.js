import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DoughnutChart from "../../../../../../utils/DoughnutChart";
import CallActivity from "../../../../../../common/header/CallActivity";

const displayName = "ContactDetails";
const propTypes = {
    campaign: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const ContactDetails = ({
    calls,
    campaign,
    summary,
    status,
    handleEditModalOpen,
    handleRefreshModalOpen,
    handleStop,
    handleState,
    handleRemove
}) => {
    return (
        <div className="card">
            <div className="card-header bg-primary">
                <div className="card-title">Campaign Activities</div>
                <div className="heading-elements">
                    <div className="btn-group btn-sm action-btn">
                        <button
                            type="button"
                            className="btn btn-sm dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Menu
                        </button>

                        <div className="dropdown-menu">
                            <Link
                                className="dropdown-item"
                                onClick={() => handleRefreshModalOpen()}
                                to="#"
                            >
                                Re run
                            </Link>
                            <Link
                                className="dropdown-item"
                                onClick={() => handleEditModalOpen()}
                                to="#"
                            >
                                Edit
                            </Link>
                            <Link
                                className="dropdown-item"
                                onClick={() => handleState(true)}
                                to="#"
                            >
                                Start
                            </Link>

                            <Link
                                className="dropdown-item"
                                onClick={() => handleState(false)}
                                to="#"
                            >
                                Pause
                            </Link>

                            <Link
                                className="dropdown-item"
                                onClick={() => handleStop()}
                                to="#"
                            >
                                Stop/End
                            </Link>
                            <Link
                                className="dropdown-item"
                                to="#"
                                onClick={() => handleRemove(campaign.id)}
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="col">
                            <ol className="actions-container">
                                {summary.actions.map((action, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="px-3 py-2">
                                                <div className="spacer-xs">
                                                    <small>
                                                        {" "}
                                                        {action.action.toUpperCase()}{" "}
                                                    </small>
                                                    <h5 className="mt-2 text-primary">
                                                        {action.number}
                                                    </h5>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                            <ol className="actions-container">
                                {summary.calls.map((action, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="px-3 py-2">
                                                <div className="spacer-xs">
                                                    <small>
                                                        {" "}
                                                        {action.label.toUpperCase()}{" "}
                                                    </small>
                                                    <h5 className="mt-2 text-primary">
                                                        {action.data}
                                                    </h5>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                    <div className="col-sm-5 col-md-4">
                        <DoughnutChart
                            data={summary.calls}
                            value="percentage"
                            label="label"
                            title="Call Summary"
                            colors={["#4CAF50", "#3E517A", "#E72649"]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ContactDetails.displayName = displayName;
ContactDetails.propTypes = propTypes;

export default React.memo(ContactDetails);
