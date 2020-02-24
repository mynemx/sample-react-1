import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";

const displayName = "FloatingDatePickeFormField";
const propTypes = {
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

const FloatingDatePicker = ({
    name,
    label,
    value,
    timeIntervals = 15,
    momentFormat = "YYYY-MM-DD HH:mm",
    dateFormat = "yyyy-MM-dd HH:mm",
    errors,
    onChange,
    required = false
}) => {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <DatePicker
                selected={value ? new Date(value) : ""}
                onChange={date =>
                    onChange(name, moment(new Date(date)).format(momentFormat))
                }
                onChangeRaw={event => onChange(name, event.target.value)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={timeIntervals}
                timeCaption="time"
                dateFormat={dateFormat}
            />
            <label className="label-datepicker">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
};

FloatingDatePicker.displayName = displayName;
FloatingDatePicker.propTypes = propTypes;

export default FloatingDatePicker;
