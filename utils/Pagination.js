import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Pagination extends PureComponent {
    static displayName = "Pagination";
    static propTypes = {
        meta: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            //
        };
    }

    renderLinks() {
        const { meta } = this.props;
        const delta = 2;
        const left = meta.currentPage - delta;
        const right = meta.currentPage + delta + 1;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= meta.lastPage; i++) {
            if (i == 1 || i == meta.lastPage || (i >= left && i < right)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots.map(n => {
            const className = meta.currentPage === n ? "primary" : "light";

            return (
                <button
                    key={
                        n == "..."
                            ? "dot" + Math.round(20 + 80 * Math.random(5657))
                            : n
                    }
                    type="button"
                    disabled={n == "..." ? true : false}
                    className={`btn btn-${className} btn-sm`}
                    onClick={() => this.props.onChange(n)}
                >
                    {n}
                </button>
            );
        });
    }

    render() {
        return this.props.meta.lastPage > 1 ? (
            <div
                className="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
            >
                <div
                    className="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                >
                    {this.props.meta.currentPage <= 1 ? (
                        ""
                    ) : (
                        <button
                            key="prev"
                            type="button"
                            className={`btn btn-sm mr-2 btn-secondary`}
                            onClick={() =>
                                this.props.onChange(
                                    this.props.meta.currentPage - 1
                                )
                            }
                        >
                            Prev
                        </button>
                    )}
                    {this.renderLinks()}
                    {this.props.meta.currentPage < this.props.meta.lastPage ? (
                        <button
                            key="next"
                            type="button"
                            className={`btn btn-sm ml-2 btn-secondary`}
                            onClick={() =>
                                this.props.onChange(
                                    this.props.meta.currentPage + 1
                                )
                            }
                        >
                            Next
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        ) : (
            ""
        );
    }
}

export default Pagination;
