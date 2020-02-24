import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
// DoughnutChart
class DoughnutChart extends Component {
    static displayName = "DoughnutChart";
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidUpdate() {
        const { label, value } = this.props;

        this.myChart.data.labels = this.props.data.map(d => d[label]);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d[value]);
        this.myChart.update();
    }

    componentDidMount() {
        const { label, value } = this.props;
        this.myChart = new Chart(this.canvasRef.current, {
            type: "doughnut",
            options: {
                maintainAspectRatio: false
            },
            data: {
                labels: this.props.data.map(d => d[label]),
                datasets: [
                    {
                        data: this.props.data.map(d => d[value]),
                        backgroundColor: this.props.colors
                    }
                ]
            }
        });
    }

    render() {
        return <canvas ref={this.canvasRef} />;
    }
}

export default DoughnutChart;
