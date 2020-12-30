import React from "react";

const ProfilePicture = ({ user }) => {
    return (
        <>
            <div className="text-center">
                <img
                    style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "200px"
                    }}
                    className="border border-black rounded-circle img-fluid"
                    src={user.photo}
                />
            </div>
        </>
    );
};

export default ProfilePicture;
