import React, { useCallback } from "react";
import PropTypes from "prop-types";

const displayName = "FAQTopicFrom";
const propTypes = {
    agentFAQTopic: PropTypes.object.isRequired,
};

const Form = ({
    agentFAQTopic,
    ref=null,
    errors,
    onChange,
    onSubmit
}) => {
    const handleChange = useCallback(
        (name, value) => {
            if (value !== agentFAQTopic[name]) {
                onChange(name, value);
            }
        },
        [onChange, agentFAQTopic]
    );

    return (
        <form onSubmit={e => onSubmit(e)} className="">
            
            <input
                ref={ref}
                type='text'
                name='label'
                className='floating-input add_new_tag_input'
                placeholder={agentFAQTopic.id ? 'Edit FAQ Topic' : 'Add FAQ Topic'}
                value={agentFAQTopic.label || ""}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            {errors.has(`${agentFAQTopic.label}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${agentFAQTopic.label}`)}
                </div>
            )}
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
