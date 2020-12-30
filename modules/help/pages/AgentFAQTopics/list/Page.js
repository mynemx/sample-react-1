// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReeValidate from 'ree-validate';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { agentFAQTopicAddRequest, agentFAQTopicListRequest, agentFAQTopicRemoveRequest, agentFAQTopicUpdateRequest,  } from "../service";

// import components
import TableRow from "./components/TableRow";
import Form from "./components/Form";
import Pagination from "./components/Pagination";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";
import './components/Page.scss';
import { showNotification } from "../../../../../utils/Notification";
import AgentFAQTopic from "../../../models/AgentFAQTopic";

class Page extends Component {
    static displayName = "Sip Extension Page";
    static propTypes = {
        agentFAQTopics: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validateFields = {
            label: 'required|min:2',
        };

        this.validator = new ReeValidate(this.validateFields);

        this.state = {
            show: false,
            agentFAQTopic: {},
            err: 'init',
            errors: this.validator.errors,
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearMode = this.handleClearMode.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(authPageLoading(false));
        dispatch(agentFAQTopicListRequest({}));
    }

    pageChange(pageNumber) {
        this.props.dispatch(agentFAQTopicListRequest({ pageNumber }));
    }

    handleRemove(id) {
        this.props.dispatch(agentFAQTopicRemoveRequest(id));
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const agentFAQTopic = Object.assign(
            {},
            { ...this.state.agentFAQTopic, [name]: value }
        );

        this.setState({ agentFAQTopic });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}:${value}` });
        });
    }


    handleClearMode(e) {
        // e.preventDefault();
        let errors = this.state.errors;
        errors.items = [];
        const agentFAQTopic = new AgentFAQTopic({}).toJson();
        this.setState({ err: 'init', show: false, agentFAQTopic });
    }

    handleEdit(item) {
        this.setState({ err: 'edit', show: true, agentFAQTopic: item });
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { agentFAQTopic } = this.state;

        const { errors } = this.validator;

        this.validator.validateAll(agentFAQTopic).then((success) => {
            if (success) {
                let err = 'success';
                this.setState({ err });
                this.submit(agentFAQTopic);
            } else {
                let err = 'error';
                this.setState({ errors, err });
            }
        });
    };

    submit(agentFAQTopic) {
        this.props
            .dispatch(agentFAQTopic.id ? agentFAQTopicUpdateRequest(agentFAQTopic) : agentFAQTopicAddRequest(agentFAQTopic))
            .then(msg => {
                showNotification(msg, "success");
                this.handleClearMode();
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors, agentFAQTopic, err: "errors" });
            });
    }


    renderTableRows() {
        return this.props.agentFAQTopics.map((item, index) => {
            return (
                <TableRow
                    key={item.id}
                    item={item}
                    index={index}
                    show={this.state.show}
                    agentFAQTopic={this.state.agentFAQTopic}
                    errors={this.state.errors}
                    handleEdit={this.handleEdit}
                    handleClearMode={this.handleClearMode}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleRemove={this.handleRemove}
                />
            );
        });
    }

    render() {
        const { agentFAQTopic, errors, show } = this.state;
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/contact-center"> Contact Center </Link>
                    </li>
                    <li className="active">
                        <Link to="/app/contact-center/sip-extensions">
                            {" "}
                            Sip Extensions{" "}
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Agent FAQ Topics </div>
                        </div>
                        <div className="card-body">
                            
                            <div className='list_page'>
                                <div className='add_new_tag no-border'>
                                    <AddCircleIcon className='addNewIcon' />
                                    
                                    <Form 

                                        agentFAQTopic={show ? {} : agentFAQTopic}
                                        errors={errors}
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                    />
                                </div>
                                <table className='table table-hover'>
                                    <tbody>
                                        {this.renderTableRows()}
                                    </tbody>
                                </table>

                                <div className='d-flex flex-row-reverse pr-3 mt-2'>
                                    { show && <button
                                        className='btn mr-4 btn-primary btn-sm'
                                        onClick={(e) => this.handleClearMode()}
                                    >
                                        Cancel
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
