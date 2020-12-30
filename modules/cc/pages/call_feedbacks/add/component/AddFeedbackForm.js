import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import ReeValidate from "ree-validate";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingRadio from "../../../../../../utils/FloatingRadio";
import FloatingDatePicker from "../../../../../../utils/FloatingDatePicker";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";
import { feedbackAddRequest } from "../../../../service";

const displayName = "CallFeedbackFrom";
const propTypes = {};

const Form = ({ feedback, dispatch, updateConversation }) => {
    const validator = useMemo(
        () =>
            new ReeValidate({
                action: "required",
                actionDetails: "",
                actionSchedule: "",
                direction: ""
            }),
        [ReeValidate]
    );
    const actionTypes = useMemo(() => [
        { name: "Call back" },
        { name: "Not interested" },
        { name: "In stock" },
        { name: "Prospect" },
        { name: "Ordered" },
        { name: "Wrong number" },
        { name: "No answer" },
        { name: "Answering machine" },
        { name: "Switched off" },
        { name: "Not Available" },
        { name: "Hung up" },
        { name: "Failed connection" },
        { name: "Number busy" },
        { name: "Non-committal" },
        { name: "Language barrier" },
        { name: "Incorrect number" },
        { name: "Abject refusal" },
        { name: "Consented" }
    ]);
    const [state, setStates] = useState({
        feedback: feedback,
        err: "init",
        errors: validator.errors
    });

    const handleChange = useCallback(
        (name, value) => {
            const { errors } = validator;
            let feedback = Object.assign(
                {},
                { ...state.feedback, [name]: value }
            );

            let newState = Object.assign({}, { ...state, feedback });
            errors.remove(name);

            validator.validate(name, value).then(() => {
                newState = Object.assign(
                    {},
                    { ...newState, errors: errors, err: `${name}:${value}` }
                );
            });

            setStates(newState);
        },
        [validator, state, setStates]
    );

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            const feedback = state.feedback;
            const { errors } = validator;

            validator.validateAll(feedback).then(success => {
                if (success) {
                    let newState = Object.assign(
                        {},
                        { ...state, err: "success" }
                    );
                    setStates(newState);
                    submit(feedback);
                } else {
                    let newState = Object.assign(
                        {},
                        { ...state, errors, err: "error" }
                    );
                    setStates(newState);
                }
            });
        },
        [state, validator, submit, setStates]
    );

    const submit = useCallback(
        feedback => {
            dispatch(feedbackAddRequest(feedback))
                .then(feedback => {
                    let newState = Object.assign(
                        {},
                        { ...state, feedback: {} }
                    );
                    setStates(newState);
                    updateConversation(feedback);
                })
                .catch(({ error, statusCode }) => {
                    const { errors } = validator;

                    if (statusCode === 422) {
                        _.forOwn(error, (message, field) => {
                            errors.add(field, message);
                        });
                    }
                    let newState = Object.assign(
                        {},
                        { ...state, errors, err: "errors", feedback }
                    );
                    setStates(newState);
                });
        },
        [
            dispatch,
            feedbackAddRequest,
            setStates,
            state,
            updateConversation,
            validator
        ]
    );

    return (
        <form onSubmit={e => handleSubmit(e)} className="mt-3">
            <div className="form-row mt-3">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Direction"
                        name="direction"
                        list={[{ name: "OUT" }, { name: "IN" }]}
                        field="name"
                        displayField="name"
                        value={state.feedback.direction}
                        errors={state.errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingRadio
                        label="Action Type"
                        name="action"
                        options={actionTypes}
                        field="name"
                        displayField="name"
                        value={state.feedback.action}
                        errors={state.errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDatePicker
                        label="Callback Date"
                        name="actionSchedule"
                        value={state.feedback.actionSchedule}
                        errors={state.errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingTextArea
                        label="Action Details"
                        name="actionDetails"
                        value={state.feedback.actionDetails}
                        errors={state.errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {state.feedback.agent != "" ? (
                <div className="form-group row">
                    <div className="form-submit-elements">
                        <button
                            disabled={state.errors.any()}
                            type="submit"
                            className="btn btn-success"
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
