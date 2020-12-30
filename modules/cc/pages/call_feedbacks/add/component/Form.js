import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import FloatingText from "../../../../../../utils/FloatingText";
import ReeValidate from "ree-validate";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";
import { updateClientRequest } from "../../../../service";

const displayName = "ClientUpdateFrom";
const propTypes = {
    client: PropTypes.object.isRequired
};

const Form = ({ client, contactType, users, dispatch }) => {
    const validator = useMemo(
        () =>
            new ReeValidate({
                name: "required",
                location: "",
                address: "",
                city: "",
                state: "",
                salesRepId: "",
                deliveryAddress: ""
            }),
        [ReeValidate]
    );
    const [state, setStates] = useState({
        client: client,
        err: "init",
        errors: validator.errors
    });

    const [edit, toggleEdit] = useState(false);

    const handleChange = useCallback(
        (name, value) => {
            const { errors } = validator;
            let client = Object.assign({}, { ...state.client, [name]: value });

            let newState = Object.assign({}, { ...state, client });
            errors.remove(name);

            validator.validate(name, value).then(() => {
                newState = Object.assign(
                    {},
                    { ...newState, errors: errors, err: `${name}:${value}` }
                );
            });
            setStates(newState);
        },
        [validator, state, setStates]
    );

    const changeMode = useCallback(() => {
        toggleEdit(!edit);
    }, [toggleEdit]);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            const client = state.client;
            const { errors } = validator;

            validator.validateAll(client).then(success => {
                if (success) {
                    let newState = Object.assign(
                        {},
                        { ...state, err: "success" }
                    );
                    setStates(newState);
                    submit(client);
                } else {
                    let newState = Object.assign(
                        {},
                        { ...state, errors, err: "error" }
                    );
                    setStates(newState);
                }
            });
        },
        [validator, state, setStates, submit]
    );

    const submit = useCallback(
        client => {
            let url = "";
            if (contactType.toLowerCase() == "contact") {
                url = "crm/contacts";
            } else if (contactType.toLowerCase() == "company") {
                url = "crm/companies";
            } else if (contactType.toLowerCase() == "lead") {
                url = "crm/leads";
            }

            dispatch(updateClientRequest({ url, contactType, params: client }))
                .then(client => {
                    let newState = Object.assign({}, { ...state, client });
                    setStates(newState);
                    toggleEdit(false);
                })
                .catch(({ error, statusCode }) => {
                    const { errors } = validator;

                    if (statusCode === 422) {
                        _.forOwn(error, (message, field) => {
                            errors.add(field, message);
                        });
                    }
                    let newState = Object.assign(
                        {},
                        { ...state, errors, err: "errors", client }
                    );
                    setStates(newState);
                });
        },
        [
            contactType,
            validator,
            state,
            setStates,
            toggleEdit,
            dispatch,
            updateClientRequest
        ]
    );

    function displayClient() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-2">
                                <label className="label mb-0">Name </label>
                                <div className="pl-3 text-default">
                                    {state.client.name}
                                </div>
                            </div>

                            <div className="form-group mb-2">
                                <label className="label mb-0">Phone</label>
                                <div className="pl-3 text-default">
                                    {state.client.phone}
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label className="label mb-0">Email</label>
                                <div className="pl-3 text-default">
                                    {state.client.email}
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label className="label mb-0">Location</label>
                                <div className="pl-3 text-default">
                                    {state.client.location}
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label className="label mb-0">Address</label>
                                <div className="pl-3 text-default">
                                    {state.client.address}
                                </div>
                            </div>

                            <div className="form-group mb-2">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={e => changeMode()}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function displayForm() {
        return (
            <form onSubmit={e => handleSubmit(e)} className="mt-3">
                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="Name"
                            name="name"
                            value={state.client.name}
                            errors={state.errors}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="Location"
                            name="location"
                            value={state.client.location}
                            errors={state.errors}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="Address"
                            name="address"
                            value={state.client.address}
                            errors={state.errors}
                            onChange={handleChange}
                        />{" "}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="City"
                            name="city"
                            value={state.client.city}
                            errors={state.errors}
                            onChange={handleChange}
                        />{" "}
                    </div>
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="State"
                            name="state"
                            value={state.client.state}
                            errors={state.errors}
                            onChange={handleChange}
                        />{" "}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingDropdown
                            label="Sales Rep"
                            name="salesRepId"
                            list={users}
                            field="id"
                            displayField="name"
                            value={state.client.salesRepId}
                            errors={state.errors}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group floating-label col">
                        <FloatingText
                            label="Delivery Address"
                            name="deliveryAddress"
                            value={state.client.deliveryAddress}
                            errors={state.errors}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="form-submit-elements">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={e => changeMode()}
                        >
                            Cancel
                        </button>

                        <button
                            disabled={state.errors.any()}
                            type="submit"
                            className="btn btn-success"
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    return <>{edit == true ? displayForm() : displayClient()}</>;
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
