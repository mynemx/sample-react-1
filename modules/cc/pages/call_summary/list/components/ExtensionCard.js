// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PhoneIcon from "@material-ui/icons/Phone";
import CallIcon from "@material-ui/icons/Call";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import CallEndIcon from "@material-ui/icons/CallEnd";
import { green, red } from '@material-ui/core/colors';
import { Link } from "react-router-dom";

// import components
Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};

export default class ExtensionCard extends PureComponent {
    static displayName = "ExtensionCard";
    static propTypes = {
        extension: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            duration: 0,
            extension: this.props.extension,
            call: this.props.call,
            calls: this.props.calls,
            index: this.props.index
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { call, index } = nextProps;
        if (!_.isEqual(this.state.call, call)) {
            this.setState({ call, index, duration: call ? call.billsecs : 0 });
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
        if (call && (call.status == "Connecting" || call.status == "Calling")) {
            return "bg-primary";
        } else if (call && call.status == "Ringing") {
            return "bg-cool-blue";
        } else if (call && call.status == "Up") {
            return "bg-up-call";
        } else if (call && call.status == "Hold") {
            return "bg-hold-call";
        } else {
            return "";
        }
    }

    render() {
        const { call, extension, index } = this.state;
        const { calls = [] } = this.props;
        let names = this.getClassNames(call);
        return (
            <>
                <li key={extension.id} className={`extension ${names}`}>
                    <Link className="" to={`call-summaries/${extension.regexten}`}>
                        <div className="col flex-row"> 
                            <div className="extension-col"> {extension.displayName}({extension.regexten}) </div> 
                            <div className="call-status-icon"> 
                                {call && call.direction && call.direction == 'OUT' ? <CallMadeIcon fontSize="small" style={{ color: green[500] }} /> : null} 
                                {call && call.direction && call.direction == 'IN' ? <CallReceivedIcon fontSize="small" style={{ color: green[500] }} /> : null} 
                                {call ? <CallIcon fontSize="small" style={{ color: green[500] }} /> : <CallEndIcon fontSize="small" style={{ color: red[500] }}  />} </div>
                        </div>
                        <div className="col"> 
                         {call && call.number} {call && call.name} {call ? this.getDuration(call) : '' } </div>
                        <div className="col"> 
                            <div className="extension-text-col">IN: {calls.filter(call => {return call.direction == 'IN'}).length} </div> 
                            <div className="extension-text-col">OUT:  {calls.filter(call => {return call.direction == 'OUT'}).length}</div> 
                        </div>
                    </Link>
                </li>
            </>
        );
    }
}
