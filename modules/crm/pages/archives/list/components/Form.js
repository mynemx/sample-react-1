import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FloatingFile from "../../../../../../utils/FloatingFile";
import ReeValidate from "ree-validate";
import { companyImportRequest } from "../../service";
const displayName = "ImportForm";
const propTypes = {
    dispatch: PropTypes.func.isRequired
};

const Form = ({ dispatch, history }) => {
    const validator = new ReeValidate({
        file: "required"
    });
    const [state, setStates] = useState({
        fileValue: null,
        form: { file: "" },
        errors: validator.errors
    });

    useEffect(() => {
        // Update the docum
    });

    function handleImport(e) {
        e.preventDefault();

        const { errors } = validator;

        validator.validateAll(state.form).then(success => {
            if (success) {
                submit(state.form);
            } else {
                const newState = Object.assign(
                    {},
                    { ...newState, errors: errors }
                );
                setStates(newState);
            }
        });
    }

    function submit(form) {
        dispatch(companyImportRequest(form))
            .then(msg => {
                // showNotification(msg, "success");
                // setState({ company });
                // this.props.history.push("/app/crm/companies");
            })
            .catch(({ error, statusCode }) => {
                const { errors } = validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    // showNotification("Invalid input", "error");
                }
                const newState = Object.assign(
                    {},
                    { ...newState, errors: errors }
                );
                setStates(newState);
            });
    }

    function handleChange(name, value, file) {
        const { errors } = validator;
        let newState = Object.assign(
            {},
            { ...state, fileValue: value, form: { file: file } }
        );
        errors.remove(name);

        validator.validate(name, file).then(() => {
            newState = Object.assign({}, { ...newState, errors: errors });
            console.log(newState);
        });
        setStates(newState);
        console.log(state);
    }

    return (
        <form onSubmit={e => handleImport(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingFile
                        label="Import file"
                        name="file"
                        value={state.fileValue}
                        errors={state.errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-sm btn-success">
                        Import
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
