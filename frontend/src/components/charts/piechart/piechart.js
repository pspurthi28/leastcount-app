import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie';

export default class PieChart extends Component {

    constructor(props) {
        super(props);
    }

    colorPicker = (data) => {
        let baseColor = 'hsl(COLOR, 90%, 50%)';
        let colorval = (1 - (data.value / this.getMaxValue())) * 120;
        return baseColor.replace("COLOR", colorval);
    }

    getMaxValue(){
        let scores = this.props.mapData.map(entry => {
           return entry.value
        });
        return Math.max(...scores);
    }

    render() {
        return <div style={{ height: '500px' }}>
            <ResponsivePie
                data={this.props.mapData}
                margin={{
                    "top": 40,
                    "right": 80,
                    "bottom": 80,
                    "left": 80
                }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colorBy={this.colorPicker}
                borderWidth={1}
                borderColor="inherit:darker(0.2)"
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor="inherit"
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "anchor": "bottom",
                        "direction": "row",
                        "translateY": 56,
                        "itemWidth": 100,
                        "itemHeight": 18,
                        "itemTextColor": "#999",
                        "symbolSize": 18,
                        "symbolShape": "circle",
                        "effects": [
                            {
                                "on": "hover",
                                "style": {
                                    "itemTextColor": "#000"
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    }
}