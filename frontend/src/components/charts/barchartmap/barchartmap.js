import React, { Component } from 'react'
import { ResponsiveBar } from '@nivo/bar';

export default class BarGraph extends Component {

    constructor(props) {
        super(props);
    }

    colorPicker = (data) => {
        if(data.id === 'life'){
            return 'green';
        }
        return 'red';
    }

    render() {
        return (
            <ResponsiveBar
                data={this.props.mapData}
                keys={[
                    "score",
                    "life"
                ]}
                indexBy="player"
                margin={{
                    "top": 50,
                    "right": 130,
                    "bottom": 50,
                    "left": 60
                }}
                labelTextColor='white'
                padding={0.3}
                groupMode="grouped"
                colorBy={this.colorPicker}
                defs={[
                    {
                        "id": "dots",
                        "type": "patternDots",
                        "background": "inherit",
                        "color": "#38bcb2",
                        "size": 4,
                        "padding": 1,
                        "stagger": true
                    },
                    {
                        "id": "lines",
                        "type": "patternLines",
                        "background": "inherit",
                        "color": "#eed312",
                        "rotation": -45,
                        "lineWidth": 6,
                        "spacing": 10
                    }
                ]}
                borderColor="inherit:darker(1.6)"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "player",
                    "legendPosition": "middle",
                    "legendOffset": 32
                }}
                axisLeft={{
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "score-life",
                    "legendPosition": "middle",
                    "legendOffset": -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="inherit:darker(1.6)"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "dataFrom": "keys",
                        "anchor": "bottom-right",
                        "direction": "column",
                        "justify": false,
                        "translateX": 120,
                        "translateY": 0,
                        "itemsSpacing": 2,
                        "itemWidth": 100,
                        "itemHeight": 20,
                        "itemDirection": "left-to-right",
                        "itemOpacity": 0.85,
                        "symbolSize": 20,
                        "effects": [
                            {
                                "on": "hover",
                                "style": {
                                    "itemOpacity": 1
                                }
                            }
                        ]
                    }
                ]}
            />
        );
    }
}