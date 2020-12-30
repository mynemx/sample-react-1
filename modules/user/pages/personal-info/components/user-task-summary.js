import React from "react";

const TaskSummary = ({ user }) => {
    return (
        <>
            <div className="form-group">
                <ul className="list-group custom-list-group">
                    <li className="list-group-item py-1 clearfix">
                        <span>To do </span>
                        <span className="badge badge-primary align-middle float-right">
                            0
                        </span>
                    </li>
                    <li className="list-group-item py-1 clearfix">
                        <span>Ongoing </span>
                        <span className="badge badge-primary align-middle float-right">
                            0
                        </span>
                    </li>
                    <li className="list-group-item py-1 clearfix">
                        <span>Assisting </span>
                        <span className="badge badge-primary align-middle float-right">
                            0
                        </span>
                    </li>
                    <li className="list-group-item py-1 clearfix">
                        <span>Set by me </span>
                        <span className="badge badge-primary align-middle float-right">
                            0
                        </span>
                    </li>
                    <li className="list-group-item py-1 clearfix">
                        <span>Following </span>
                        <span className="badge badge-primary align-middle float-right">
                            0
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default TaskSummary;
