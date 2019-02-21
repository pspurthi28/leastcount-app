import React, { Component } from 'react';
import Linechart from '../charts/linemap/linechart';
import Scorexctractor from '../charts/scorexctractor';
import BarGraph from '../charts/barchartmap/barchartmap';
import HeatMapChart from '../charts/heatmap/heatmapchart';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.currentGame.activeGame) {
            let lineMapData = Scorexctractor.getDataForLineMap(this.props.currentGame.activeGame);
            let barMapData = Scorexctractor.getDataForBarGraph(this.props.currentGame.activeGame);
            return <div>
                <div style={{ height: '500px' }}>
                    <BarGraph mapData={barMapData} />
                </div>
                <div style={{ height: '500px' }}>
                    <HeatMapChart
                        mapData={Scorexctractor.getTotalsHeatMap(this.props.currentGame.activeGame)}
                        mapLegendKey="round" />
                </div>
                <div style={{ height: '500px' }}>
                    <Linechart mapData={lineMapData} />
                </div>
            </div>
        } else {
            return <div></div>
        }

    }
}