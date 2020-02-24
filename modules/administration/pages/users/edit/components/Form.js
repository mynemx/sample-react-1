import React, { useCallback } from "react";
import PropTypes from "prop-types";
import FloatingCheckbox from "../../../../../../utils/FloatingCheckbox";
import FloatingRadio from "../../../../../../utils/FloatingRadio";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";

const displayName = "UserFrom";
const propTypes = {
    user: PropTypes.object.isRequired,
    departments: PropTypes.array.isRequired,
    roles: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({
    user,
    departments,
    roles,
    gender,
    errors,
    onChange,
    onSubmit
}) => {
    const handleChange = useCallback((name, value) => {
        if (value !== user[name]) {
            onChange(name, value);
        }
    });

    const handleChecked = useCallback((name, value, status) => {
        if (status) {
            const obj = [...user.roleIds, value];
            handleChange(name, obj);
        } else {
            const obj = user.roleIds.filter(item => item != value);
            handleChange(name, obj);
        }
    });

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Firstname"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        errors={errors}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Secondname"
                        name="secondName"
                        value={user.secondName}
                        onChange={handleChange}
                        errors={errors}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Lastname"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        errors={errors}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        errors={errors}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Department"
                        name="departmentId"
                        value={user.departmentId}
                        list={departments}
                        field="id"
                        displayField="name"
                        onChange={handleChange}
                        errors={errors}
                    />
                </div>

                <div className="form-group floating-label col">
                    <FloatingText
                        label="Job Title"
                        name="jobTitle"
                        value={user.jobTitle}
                        onChange={handleChange}
                        errors={errors}
                    />
                </div>

                <div className="form-group floating-label col">
                    <FloatingRadio
                        label="Gender"
                        name="gender"
                        value={user.gender}
                        options={gender}
                        field="name"
                        displayField="name"
                        onChange={handleChange}
                        errors={errors}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="p-3 form-group floating-label col">
                    <FloatingCheckbox
                        label="Roles"
                        name="roleIds"
                        value={user.roleIds}
                        options={roles}
                        field="id"
                        displayField="name"
                        onChange={handleChecked}
                        errors={errors}
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
                        UPDATE
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
