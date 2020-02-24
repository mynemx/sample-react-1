function renderDropdown(label, name, value, list, key = "id") {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <select
                className={`floating-select ${errors.has({ name }) &&
                    "is-invalid"}`}
                name={name}
                id={name}
                value={value || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
            >
                <option value="">Select {label} </option>
                {list.map((item, index) => (
                    <option key={index} value={item[key]}>
                        {item.name}{" "}
                    </option>
                ))}
            </select>

            <label className="label">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
}

function renderTextInput(label, name, value) {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has({
                    name
                }) && "is-invalid"}`}
                name={name}
                id={name}
                value={value || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
            />
            <label className="label">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
}

function renderTextarea(label, name, value, required = false) {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>

            <textarea
                className={`floating-input ${errors.has({ name }) &&
                    "is-invalid"}`}
                name={name}
                id={name}
                rows="7"
                defaultValue={value || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required={required}
            ></textarea>
            <label className="label">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
}

function renderRadio(label, name, value, options, required = false) {
    return (
        <>
            {options.map((option, index) => {
                return (
                    <div
                        key={index}
                        className="custom-control custom-radio custom-control-inline"
                    >
                        <input
                            type="radio"
                            id={`${name}${option}`}
                            name={name}
                            value={option}
                            defaultChecked={value == option ? true : false}
                            onClick={e =>
                                handleChange(e.target.name, e.target.value)
                            }
                            className="custom-control-input"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor={`${name}${option}`}
                        >
                            {option}
                        </label>
                    </div>
                );
            })}
            <label className="label-radio">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
}

function renderDate(label, name, value, required = false) {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <input
                type="date"
                className={`floating-input rounded-0 ${errors.has({ name }) &&
                    "is-invalid"}`}
                name={name}
                id={name}
                value={value || ""}
                // ref={element => (dobref = element)}
                // onClick={e => changeDobType(e)}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required={required}
            />
            {/* <span class="highlight">02/01/2002</span> */}
            <label className="label">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
}
