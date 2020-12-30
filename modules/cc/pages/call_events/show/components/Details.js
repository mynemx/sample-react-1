import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const displayName = "CallLogDetails";
const propTypes = {
    callLog: PropTypes.object.isRequired
};

const CallLogDetails = ({ callLog }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">Call Log Details</div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-2">
                            <label className="label mb-0">Call date</label>
                            <div className="pl-3 text-default">
                                {callLog.calldate}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Direction</label>
                            <div className="pl-3 text-default">
                                {callLog.direction}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Duration</label>
                            <div className="pl-3 text-default">
                                {callLog.callDuration}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">From</label>
                            <div className="pl-3 text-default">
                                {callLog.caller}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">To</label>
                            <div className="pl-3 text-default">
                                {callLog.destination}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Status</label>
                            <div className="pl-3 text-default">
                                {callLog.disposition}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Channel</label>
                            <div className="pl-3 text-default">
                                {callLog.channel}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">
                                Destination Channel
                            </label>
                            <div className="pl-3 text-default">
                                {callLog.dstchannel}
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    );
};

CallLogDetails.displayName = displayName;
CallLogDetails.propTypes = propTypes;

export default CallLogDetails;
