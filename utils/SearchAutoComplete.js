import React, { Component } from "react";
import PropTypes from "prop-types";
import Autocomplete from "react-autocomplete";
import Http from "./Http";

class SearchAutoComplete extends Component {
    static displayName = "SearchAutoComplete";
    static propTypes = {
        onChange: PropTypes.func.isRequired
    };

    requestTimer = null;

    constructor(props) {
        super(props);
        const {
            name,
            label,
            url,
            value,
            selectedValue,
            dataset,
            displayField,
            nameField,
            limit
        } = this.props;

        this.state = {
            name,
            label,
            url,
            value,
            selectedValue,
            displayField,
            nameField,
            limit,
            dataset,
            lists: [{ name: "", id: null }]
        };
    }

    componentDidMount() {
        this.getStates("a");
    }

    getStates(value = "") {
        const limit = this.state.limit || 10;
        const url = this.state.url + `?name=${value}&limits=${limit}`;

        Http.get(url)
            .then(res => {
                this.setState({ lists: res.data.data[this.state.dataset] });
            })
            .catch(err => {});
    }

    render() {
        const {
            name,
            label,
            selectedValue,
            errors,
            displayField,
            nameField
        } = this.state;
        return (
            <>
                <label htmlFor={name} className="sr-only">
                    {label}
                </label>
                <Autocomplete
                    inputProps={{
                        id: "states-autocomplete",
                        className: `floating-input `,
                        name: `${name}`,
                        autoComplete: "false"
                    }}
                    wrapperStyle={{
                        position: "relative",
                        display: "block"
                    }}
                    value={selectedValue}
                    items={this.state.lists}
                    shouldItemRender={(item, value) => item[displayField]}
                    getItemValue={item => item[displayField]}
                    onChange={(e, value) => {
                        if (value.length > 1) {
                            this.getStates(value);
                        }
                        this.setState({ selectedValue: value });
                    }}
                    onSelect={(value, item) => {
                        this.setState({
                            selectedValue: value,
                            value: item[nameField]
                        });
                        this.props.onChange(name, item[nameField]);
                        this.props.onChangeItem
                            ? this.props.onChangeItem(item)
                            : "";
                    }}
                    renderMenu={children => (
                        <div className="menu item-menu">{children}</div>
                    )}
                    renderItem={(item, isHighlighted) => (
                        <div
                            className={`item ${
                                isHighlighted ? "item-highlighted" : ""
                            }`}
                            key={item.id}
                        >
                            {item[displayField]}
                        </div>
                    )}
                />

                <label className="label label-autocomplete">{label}</label>
            </>
        );
    }
}

export default SearchAutoComplete;
