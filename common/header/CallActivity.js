import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};

export default class CallActivity extends PureComponent {
    static displayName = "CallLogsPage";
    static propTypes = {
        call: PropTypes.object.isRequired,
        handleModalOpen: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            duration: 0,
            call: this.props.call,
            index: this.props.index
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { call, index } = nextProps;
        if (!_.isEqual(this.state.call, call)) {
            this.setState({ call, index, duration: call.billsecs });
        }
    }

    getDuration(call) {
        if (
            call.answerTime !== "" &&
            (call.status == "Up" || call.status == "Hold")
        ) {
            let countDownDate = new Date(call.answerTime).getTime();
            // Update the count down every 1 second
            let duration = 0;
            setInterval(() => {
                let now = new Date().getTime();

                // Find the distance between now and the count down date
                duration = now - countDownDate;

                // If the count down is finished, write some text
                if (duration < 0) {
                    clearInterval(x);
                    this.setState({ duration: 0 });
                } else {
                    this.setState({
                        duration
                    });
                }
            }, 1000);
            return this.formatDuration(this.state.duration);
        } else {
            return this.formatDuration(call.billsecs);
        }
    }

    formatDuration(duration) {
        const hours = Math.floor(duration / (1000 * 60 * 60)).pad();
        const minutes = Math.floor(
            (duration % (1000 * 60 * 60)) / (1000 * 60)
        ).pad();
        const seconds = Math.floor((duration % (1000 * 60)) / 1000).pad();

        return `${hours}:${minutes}:${seconds}`;
    }

    getClassNames(call) {
        if (call.status == "Connecting" || call.status == "Calling") {
            return "bg-primary";
        } else if (call.status == "Ringing") {
            return "bg-cool-blue";
        } else if (call.status == "Up") {
            return "bg-up-call";
        } else if (call.status == "Hold") {
            return "bg-hold-call";
        } else {
            return "";
        }
    }

    render() {
        const { call, index } = this.state;
        let names = this.getClassNames(call);
        return (
            <>
                <tr key={call.id} className={`${names}`}>
                    <td scope="row">{index + 1}</td>
                    <td>{call.startTime}</td>
                    <td>{call.name}</td>
                    <td>{call.number}</td>
                    <td>{call.direction}</td>
                    <td>{this.getDuration(call)}</td>
                    <td>{call.callStatus}</td>
                    <td>{call.lastAgent}</td>
                    <td>
                        <div className="btn-group btn-sm action-btn">
                            <button
                                type="button"
                                className="btn btn-sm dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <MenuIcon />
                            </button>

                            <div className="dropdown-menu">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                    onClick={e => {
                                        this.props.handleModalOpen(call);
                                    }}
                                >
                                    Details
                                </Link>
                                {call.status != "Hangup" ? (
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={e => {
                                            this.props.handleTransferModalOpen(
                                                call
                                            );
                                        }}
                                    >
                                        Call Transfer
                                    </Link>
                                ) : (
                                    ""
                                )}
                                {call.status != "Hangup" ? (
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={e =>
                                            this.props.handleSoftHangup(call)
                                        }
                                    >
                                        Soft Hangup
                                    </Link>
                                ) : (
                                    ""
                                )}
                                {call.status != "Hangup" ? (
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={e =>
                                            this.props.handleHangup(call)
                                        }
                                    >
                                        Hangup
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </td>
                </tr>
            </>
        );
    }
}
