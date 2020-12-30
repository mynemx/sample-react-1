import React from "react";

const ContactInfo = ({ user }) => {
    return (
        <>
            <div className="form-group mb-2">
                <label className="label mb-0">FirstName</label>
                <div className="pl-3 text-default">{user.firstName}</div>
            </div>
            <div className="form-group mb-2">
                <label className="label mb-0">SecondName</label>
                <div className="pl-3 text-default">{user.secondName}</div>
            </div>
            <div className="form-group mb-2">
                <label className="label mb-0">LastName</label>
                <div className="pl-3 text-default">{user.lastName}</div>
            </div>

            <div className="form-group mb-2">
                <label className="label mb-0">Contact Email</label>
                <div className="pl-3 text-default">{user.email}</div>
            </div>
            <div className="form-group mb-2">
                <label className="label mb-0">Department</label>
                <div className="pl-3 text-default">{user.department.name}</div>
            </div>
        </>
    );
};

export default ContactInfo;
