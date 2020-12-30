import React, { useState } from "react";
import PropTypes from "prop-types";
import FloatingPassword from "../../../../../utils/FloatingPassword";
import ReeValidate from "ree-validate";
import { userChangePasswordRequest } from "../../../service";
import { showNotification } from "../../../../../utils/Notification";

const displayName = "ChangePasswordForm";
const propTypes = {
    onChange: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

const Form = ({ dispatch, onChange }) => {
    const validator = new ReeValidate({
        oldPassword: "required|max:25",
        password: "required|min:6|max:25",
        passwordConfirmation: "required|confirmed:password"
    });
    const [state, setStates] = useState({
        form: { oldPassord: "", passwordConfirmation: "", password: "" },
        errors: validator.errors
    });

    function handleChange(name, value) {
        const { errors } = validator;

        let newForm = Object.assign({}, { ...state.form, [name]: value });

        let newState = Object.assign({}, { ...state, form: newForm });
        errors.remove(name);
        validator.validate(name, value).then(() => {
            newState = Object.assign({}, { ...newState, errors: errors });
        });
        setStates(newState);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const form = state.form;
        const { errors } = validator;

        validator.validateAll(form).then(success => {
            if (success) {
                submit(form);
            } else {
                const newState = Object.assign(
                    {},
                    { ...state, errors: errors }
                );

                setState(newState);
            }
        });
    }

    function submit(form) {
        dispatch(userChangePasswordRequest(form))
            .then(msg => {
                showNotification(msg, "success");
                onChange();
            })
            .catch(({ error, statusCode }) => {
                const { errors } = validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                const newState = Object.assign(
                    {},
                    { ...state, errors: errors }
                );

                setState(newState);
            });
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingPassword
                        label="Current Password"
                        name="oldPassword"
                        value={state.form.oldPassword}
                        errors={state.errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingPassword
                        label="New Password"
                        name="password"
                        value={state.form.password}
                        errors={state.errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingPassword
                        label="Password confirmation"
                        name="passwordConfirmation"
                        value={state.form.passwordConfirmation}
                        errors={state.errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="p-3">
                    <button
                        type="button"
                        onClick={onChange}
                        className="btn btn-secondany"
                    >
                        CANCEL
                    </button>

                    <button
                        disabled={state.errors.any()}
                        type="submit"
                        className="btn btn-success"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
