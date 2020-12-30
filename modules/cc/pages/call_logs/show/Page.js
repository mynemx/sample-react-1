import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import { callLogEditRequest } from "../service";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { showNotification } from "../../../../../utils/Notification";

// import components
import Details from "./components/Details";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "ViewCallLogPage";
    static propTypes = {
        callLog: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const callLog = this.props.callLog.toJson();
        this.state = {
            callLog
        };
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadCallLog();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const callLog = nextProps.callLog.toJson();
        if (!_.isEqual(this.state.callLog, callLog)) {
            this.setState({ callLog });
        }
    }

    loadCallLog() {
        const { match, callLog, dispatch } = this.props;

        if (!callLog.id) {
            dispatch(callLogEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    if (statusCode === 404) {
                        showNotification(error, "error");
                        this.props.history.push(
                            `/app/contact-center/call-logs`
                        );
                    }
                }
            );
        }
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/contact-center">Contact Center</Link>
                    </li>
                    <li>
                        <Link to="/app/contact-center/call-logs">
                            Call Logs
                        </Link>
                    </li>
                    <li className="active">Details</li>
                </ol>
                <div className="page-content">
                    <div className="row">
                        <div className="col ">
                            <Details callLog={this.state.callLog} />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default React.memo(Page);
