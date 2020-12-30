// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { callFeedbackSummaryRequest } from "../service";
import BarChart from "../../../../utils/BarChart";
import LineChart from "../../../../utils/LineChart";
import DoughnutChart from "../../../../utils/DoughnutChart";

class Page extends PureComponent {
    static displayName = "UserPage";
    static propTypes = {
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const user = this.props.user.toJson();
        const { callFeedbackSummary } = this.props;

        this.state = {
            user,
            callFeedbackSummary
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(callFeedbackSummaryRequest({}));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();
        const { callFeedbackSummary } = nextProps;
        const { dispatch } = this.props;

        if (!_.isEqual(this.state.callFeedbackSummary, callFeedbackSummary)) {
            this.setState({ callFeedbackSummary });
        }
        this.setState({ user });
    }

    render() {
        return (
            <main className="page-container " role="main">
                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <span className="float-right">
                            {`
                            ${this.state.callFeedbackSummary.startDate} - ${this.state.callFeedbackSummary.endDate}`}
                        </span>
                    </div>
                </div>
                <div className="row mt-3 bg-white py-3">
                    <div className="col">
                        <ol className="actions-container">
                            {this.state.callFeedbackSummary.actions.map(
                                (action, index) => {
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
                                }
                            )}
                        </ol>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
