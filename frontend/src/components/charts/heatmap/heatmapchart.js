import React, { Component } from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'

export default class HeatMapChart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.mapData && this.props.mapData.length > 0) {
            return this.getMap(
                this.props.mapData, 
                this.getKeysFromData(this.props.mapData, this.props.mapLegendKey), 
                this.props.mapLegendKey);
        } else {
            return (<div></div>);
        }

    }

    getKeysFromData(mapData, indexValue) {
        let keys = Object.keys(mapData[0]);
        let idx = keys.indexOf(indexValue)
        if (idx > -1) {
            keys.splice(idx, 1)
        }
        return keys;
    }

    getMap(mapData, mapKeys, indexByEntry) {
        return (
            <ResponsiveHeatMap
                data={mapData}
                keys={mapKeys}
                indexBy={indexByEntry}
                margin={{
                    "top": 10,
                    "right": 60,
                    "bottom": 60,
                    "left": 60
                }}
                forceSquare={true}
                axisTop={{
                    "orient": "top",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": -90,
                    "legend": "",
                    "legendOffset": 36
                }}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                    "orient": "left",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "round",
                    "legendPosition": "middle",
                    "legendOffset": -40
                }}
                cellOpacity={1}
                cellBorderColor="inherit:darker(0.4)"
                labelTextColor="inherit:darker(1.8)"
                defs={[
                    {
                        "id": "lines",
                        "type": "patternLines",
                        "background": "inherit",
                        "color": "rgba(0, 0, 0, 0.1)",
                        "rotation": -45,
                        "lineWidth": 4,
                        "spacing": 7
                    }
                ]}
                fill={[
                    {
                        "id": "lines"
                    }
                ]}
                animate={true}
                motionStiffness={80}
                motionDamping={9}
                hoverTarget="cell"
                cellHoverOthersOpacity={0.25}
                colors="RdYlGn"
            />
        );
    }
}