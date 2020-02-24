import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchDropdown from "../../../utils/SearchDropdown";

const displayName = "CallFeedbackFrom";
const propTypes = {};

const Form = ({ sipExtensions, call, handleTransfer, dismiss }) => {
    const [state, setStates] = useState({
        call: call
    });

    function handleChange(name, value) {
        let call = Object.assign({}, { ...state.call, [name]: value });

        let newState = Object.assign({}, { ...state, call });

        setStates(newState);
    }

    return (
        <>
            <div className="form-row mt-3">
                <div className="form-group floating-label col">
                    <SearchDropdown
                        label="Select the agent you wish to transfer to"
                        name="agent"
                        list={sipExtensions}
                        field="name"
                        displayField="callerid"
                        value={state.call.agent}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {state.call.agent != "" ? (
                <div className="form-group row">
                    <div className="form-submit-elements">
                        <button
                            type="click"
                            onClick={e => handleTransfer(state.call)}
                            className="btn btn-success"
                        >
                            Transfer
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
