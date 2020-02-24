// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

// import components
import { Link } from "react-router-dom";

class Page extends Component {
    static displayName = "CallLogsPage";
    static propTypes = {
        call: PropTypes.object.isRequired
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
            (call.callStatus == "Up" || call.callStatus == "Hold")
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
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((duration % (1000 * 60)) / 1000);

        return `${hours}:${minutes}:${seconds}`;
    }

    getClassNames(call) {
        if (call.callStatus == "Connecting" || call.callStatus == "Calling") {
            return "bg-primary";
        } else if (call.callStatus == "Ringing") {
            return "bg-cool-blue";
        } else if (call.callStatus == "Up") {
            return "bg-up-call";
        } else if (call.callStatus == "Hold") {
            return "bg-hold-call";
        } else {
            return "";
        }
    }
    render() {
        const { call, classNames, index } = this.state;
        let names = this.getClassNames(call);
        return (
            <tr key={call.id} className={`${names}`}>
                <td scope="row">{index + 1}</td>
                <td>{call.uniqueid}</td>
                <td>{call.startTime}</td>
                <td>{call.number}</td>
                <td>{call.direction}</td>
                <td>{this.getDuration(call)}</td>
                <td>{call.callStatus}</td>
                <td>
                    {call.status != "Hangup" ? (
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={e => this.props.handleHangup(call)}
                        >
                            Hangup
                        </button>
                    ) : (
                        ""
                    )}
                </td>
            </tr>
        );
    }
}

export default Page;
