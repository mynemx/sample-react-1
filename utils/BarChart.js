import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

// BarChart
class BarChart extends Component {
    static displayName = "BarChart";

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
        const { label, value, min = 0 } = this.props;
        let { max = 10 } = this.props;
        const data = this.props.data.map(d => {
            max = d[value] > max ? d[value] + 10 : max;
            return d[value];
        });
        this.myChart = new Chart(this.canvasRef.current, {
            type: "bar",
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                min: min,
                                max: max
                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d[label]),
                datasets: [
                    {
                        label: this.props.title,
                        data: data,
                        backgroundColor: this.props.color
                    }
                ]
            }
        });
    }

    render() {
        return <canvas ref={this.canvasRef} style={{ minHeight: "250px" }} />;
    }
}

export default BarChart;
