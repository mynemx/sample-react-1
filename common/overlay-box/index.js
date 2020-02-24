import React from "react";
import "./style.css";
const OverlayBox = ({ title, children, display }) => {
    return (
        <div
            className={
                display ? "row task-box clearfix" : "row task-box hide clearfix"
            }
        >
            <div class="task-content-area">
                <div class="task-header">{title}</div>
                <div class="task-body">{children}</div>
            </div>
        </div>
    );
};

export default OverlayBox;
