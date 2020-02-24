import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "CompanyRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    company: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const CompanyRow = ({ index, company, handleRemove, handleRestore }) => {
    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>{company.name}</td>
            <td>{company.companyTypeName}</td>
            <td>{company.companyCategoryName}</td>
            <td>{company.phone}</td>
            <td>{company.email}</td>
            <td>{company.location}</td>
            <td>{company.salesRepName}</td>
            <td>{company.industryName}</td>
            <td>{company.source}</td>
            <td>
                <div className="btn-group btn-sm action-btn">
                    <button
                        type="button"
                        className="btn btn-sm dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <MenuIcon />
                    </button>

                    <div className="dropdown-menu">
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRestore(company.id)}
                        >
                            Restore
                        </Link>

                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(company.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

CompanyRow.displayName = displayName;
CompanyRow.propTypes = propTypes;

export default CompanyRow;
