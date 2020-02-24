import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const displayName = "LoginForm";
const propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    remember: PropTypes.bool,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};

const Form = ({
    email,
    password,
    remember,
    errors,
    handleChange,
    handleSubmit
}) => {
    const styles = useMemo(() => ({
        root: {
            textAlign: "center",
            width: "300px"
        },
        input: {
            fontSize: "0.7rem"
        },
        button: {
            marginBottom: "20px",
            marginTop: "30px"
        }
    }));

    return (
        <form
            className="form"
            style={styles.root}
            role="form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="form-group floating-label mt-4">
                <label htmlFor="email" className="sr-only">
                    Email
                </label>
                <input
                    type="text"
                    style={styles.input}
                    className={`floating-input form-control-lg rounded-0 ${errors.has(
                        "email"
                    ) && "is-invalid"}`}
                    name="email"
                    id="email"
                    value={email || ""}
                    onChange={e => handleChange(e.target.name, e.target.value)}
                    required
                    autoFocus
                />
                <label htmlFor="email" className="label">
                    Email
                </label>
                {errors.has("email") && (
                    <div className="invalid-feedback">
                        {errors.first("email")}
                    </div>
                )}
            </div>
            <div className="form-group floating-label">
                <label htmlFor="password" className="sr-only">
                    Password
                </label>
                <input
                    style={styles.input}
                    type="password"
                    className={`floating-input rounded-0 ${errors.has(
                        "password"
                    ) && "is-invalid"}`}
                    id="password"
                    name="password"
                    value={password || ""}
                    onChange={e => handleChange(e.target.name, e.target.value)}
                    required
                />
                <label htmlFor="password" className="label">
                    Password
                </label>
                {errors.has("password") && (
                    <div className="invalid-feedback">
                        {errors.first("password")}
                    </div>
                )}
            </div>
            <div>
                <label className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        name="remember"
                        className="custom-control-input"
                        onChange={e => handleChange(e.target.name, !remember)}
                    />
                    <span className="custom-control-indicator" />
                    <span className="custom-control-description small">
                        Remember me on this computer
                    </span>
                </label>
            </div>
            <button
                style={styles.button}
                className="btn btn-lg btn-primary btn-block"
                type="submit"
                disabled={errors.any()}
            >
                Log In
            </button>
            <p>
                Not a member? <Link to="/register">Signup here</Link>
            </p>
            <p>
                {" "}
                <Link to="/register">Forget password</Link>
            </p>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
