import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const displayName = "ProfileForm";
const propTypes = {
    email: PropTypes.string,
    department_id: PropTypes.string,
    firstname: PropTypes.string,
    secondname: PropTypes.string,
    lastname: PropTypes.string,
    dob: PropTypes.string,
    phone: PropTypes.string,
    mobile: PropTypes.string,
    ext: PropTypes.string,
    gender: PropTypes.string,
    mobile: PropTypes.string,
    maritalstatus: PropTypes.string,
    departments: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};

var dobref;
const changeDobType = e => {
    dobref.type = "date";
};

const Form = ({
    email,
    firstName,
    secondName,
    lastName,
    departmentId,
    dob,
    phone,
    gender,
    mobile,
    ext,
    maritalStatus,
    departments,
    errors,
    handleChange,
    handleCancel,
    handleSubmit
}) => (
    <form
        className="form m"
        role="form"
        onSubmit={handleSubmit}
        onReset={handleCancel}
        noValidate
    >
        <div className="form-group floating-label mt-3">
            <label htmlFor="firstname" className="sr-only">
                Firstname
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has(
                    "firstName"
                ) && "is-invalid"}`}
                name="firstName"
                id="firstname"
                placeholder=" "
                value={firstName || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            />
            <label className="label">Firstname</label>
            {errors.has("firstName") && (
                <div className="invalid-feedback">
                    {errors.first("firstName")}
                </div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="secondName" className="sr-only">
                Secondname
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has(
                    "secondName"
                ) && "is-invalid"}`}
                name="secondName"
                id="secondname"
                placeholder=" "
                value={secondName || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            />
            <label className="label">Secondname</label>
            {errors.has("secondName") && (
                <div className="invalid-feedback">
                    {errors.first("secondName")}
                </div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="lastname" className="sr-only">
                Lastname
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has("lastName") &&
                    "is-invalid"}`}
                name="lastName"
                id="lastname"
                placeholder=" "
                value={lastName || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            />
            <label className="label">Lastname</label>
            {errors.has("lastName") && (
                <div className="invalid-feedback">
                    {errors.first("lastName")}
                </div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="email" className="sr-only">
                email
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has("email") &&
                    "is-invalid"}`}
                name="email"
                id="email"
                placeholder=" "
                value={email || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            />
            <label className="label">Email</label>
            {errors.has("email") && (
                <div className="invalid-feedback">{errors.first("email")}</div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="department_id" className="sr-only">
                Department
            </label>
            <select
                className={`floating-select ${errors.has("departmentId") &&
                    "is-invalid"}`}
                name="departmentId"
                id="department_id"
                placeholder=" "
                value={departmentId || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            >
                {departments.map((department, index) => (
                    <option key={index} value={department.id}>
                        {" "}
                        {department.name}{" "}
                    </option>
                ))}
            </select>
            <label className="label">Select department </label>
            {errors.has("departmentId") && (
                <div className="invalid-feedback">
                    {errors.first("departmentId")}
                </div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="dob" className="sr-only">
                Date of birth
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has("dob") &&
                    "is-invalid"}`}
                name="dob"
                id="dob"
                placeholder=" "
                value={dob || ""}
                ref={element => (dobref = element)}
                onClick={e => changeDobType(e)}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            />
            {/* <span class="highlight">02/01/2002</span> */}
            <label className="label">Date of birth</label>
            {errors.has("dob") && (
                <div className="invalid-feedback">{errors.first("dob")}</div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="phone" className="sr-only">
                Telephone
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has("phone") &&
                    "is-invalid"}`}
                name="phone"
                id="phone"
                placeholder=" "
                value={phone || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            />
            {/* <span class="highlight">01829282</span> */}
            <label className="label">Telephone</label>
            {errors.has("phone") && (
                <div className="invalid-feedback">{errors.first("phone")}</div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="mobile" className="sr-only">
                Mobile line
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has("mobile") &&
                    "is-invalid"}`}
                name="mobile"
                id="mobile"
                placeholder=" "
                value={mobile || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            />
            <label className="label">Mobile</label>
            {errors.has("mobile") && (
                <div className="invalid-feedback">{errors.first("mobile")}</div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="ext" className="sr-only">
                Ext
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has("ext") &&
                    "is-invalid"}`}
                name="ext"
                id="ext"
                placeholder=" "
                value={ext || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            />
            <label className="label">Office Extension</label>
            {errors.has("ext") && (
                <div className="invalid-feedback">{errors.first("ext")}</div>
            )}
        </div>
        <div className="form-group floating-label">
            <div className="custom-control custom-radio custom-control-inline">
                <input
                    type="radio"
                    id="genderMale"
                    name="gender"
                    value="Male"
                    defaultChecked={gender == "Male" ? true : false}
                    onClick={e => handleChange(e.target.name, e.target.value)}
                    className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="genderMale">
                    Male
                </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
                <input
                    type="radio"
                    id="genderFemale"
                    name="gender"
                    value="Female"
                    defaultChecked={gender == "Female" ? true : false}
                    onClick={e => handleChange(e.target.name, e.target.value)}
                    className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="genderFemale">
                    Female
                </label>
            </div>
            {errors.has("gender") && (
                <div className="invalid-feedback" htmlFor="gender">
                    {errors.first("gender")}
                </div>
            )}
        </div>
        <div className="form-group floating-label">
            <label htmlFor="maritalStatus" className="sr-only">
                Marital status
            </label>
            <select
                className={`floating-select ${errors.has("maritalStatus") &&
                    "is-invalid"}`}
                name="maritalStatus"
                id="maritalStatus"
                placeholder=" "
                value={maritalStatus || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
            >
                <option value=""> Select your marital status</option>
                <option value="Single"> Single</option>
                <option value="Married"> Married</option>
                <option value="Divorced"> Divorced</option>
                <option value="Widowed"> Widowed</option>
            </select>
            <label className="label">Marital status </label>
            {errors.has("maritalStatus") && (
                <div className="invalid-feedback">
                    {errors.first("maritalStatus")}
                </div>
            )}
        </div>
        <button className="btn btn-secondary mx-2" type="reset">
            Cancel
        </button>
        <button
            className="btn btn-success mx-2"
            type="submit"
            disabled={errors.any()}
        >
            Save
        </button>
    </form>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
