import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const displayName = "CallLogDetails";
const propTypes = {
    call: PropTypes.object.isRequired
};

const CallLogDetails = ({ call }) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-2">
                            <label className="label mb-0">Call date</label>
                            <div className="pl-3 text-default">
                                {call.startdate}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Name</label>
                            <div className="pl-3 text-default">{call.name}</div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Number</label>
                            <div className="pl-3 text-default">
                                {call.number}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Agent</label>
                            <div className="pl-3 text-default">
                                {call.agent}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Direction</label>
                            <div className="pl-3 text-default">
                                {call.direction}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Duration</label>
                            <div className="pl-3 text-default">
                                {call.billsecs}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Caller</label>
                            <div className="pl-3 text-default">
                                {call.caller}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Receiver</label>
                            <div className="pl-3 text-default">
                                {call.destination}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Last Agent</label>
                            <div className="pl-3 text-default">
                                {call.lastAgent}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Status</label>
                            <div className="pl-3 text-default">
                                {call.callStatus}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CallLogDetails.displayName = displayName;
CallLogDetails.propTypes = propTypes;

export default React.memo(CallLogDetails);
