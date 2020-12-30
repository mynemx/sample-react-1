import React, { useCallback } from "react";
import PropTypes from "prop-types";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";

const displayName = "ProductFrom";
const propTypes = {
    extension: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({ extension, users, errors, callGateways, onChange, onSubmit }) => {
    const handleChange = useCallback((name, value) => {
        if (value !== extension[name]) {
            onChange(name, value);
        }
    });

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Sip Account"
                        name="sip"
                        value={extension.sip}
                        errors={errors}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Display Name"
                        name="displayName"
                        value={extension.displayName}
                        errors={errors}
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="User"
                        name="userId"
                        list={users}
                        field="id"
                        displayField="name"
                        value={extension.userId}
                        errors={errors}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Gateway"
                        name="gatewayId"
                        list={callGateways}
                        field="id"
                        displayField="label"
                        value={extension.gatewayId}
                        errors={errors}
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="form-submit-elements">
                    <button
                        disabled={errors.any()}
                        type="submit"
                        className="btn btn-success"
                    >
                        {extension.id ? "UPDATE" : "SAVE"}
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
