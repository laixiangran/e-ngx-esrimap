import {Component} from '@angular/core';
import {EssenceNg2EsriMapComponent} from "../../src/essence-ng2-esrimap.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	esriMapComponent: EssenceNg2EsriMapComponent;
	SimpleMarkerSymbol: any;
	Graphic: any;
	Point: any;
	GraphicsLayer: any;
	TextSymbol: any;

	initExtent: any = {
		xmax: 116.75667048654691,
		xmin: 115.97389460764066,
		ymax: 40.12732707113387,
		ymin: 39.71533976644637
	};

	constructor () {
	}

	ngOnInit () {
	}

	onMapReady ($event: EssenceNg2EsriMapComponent) {
		this.esriMapComponent = $event;
		this.esriMapComponent.loadEsriModules([
			"esri/symbols/SimpleMarkerSymbol",
			"esri/symbols/TextSymbol",
			"esri/geometry/Point",
			"esri/graphic",
			"esri/layers/GraphicsLayer"
		]).then(([
					 SimpleMarkerSymbol,
					 TextSymbol,
					 Point,
					 Graphic,
					 GraphicsLayer
				 ]) => {
			this.SimpleMarkerSymbol = SimpleMarkerSymbol;
			this.TextSymbol = TextSymbol;
			this.Point = Point;
			this.Graphic = Graphic;
			this.GraphicsLayer = GraphicsLayer;
		});
	}

	/**
	 * 地图范围改变的事件
	 * @param $event
	 */
	onExentChange (event: any) {
		console.log(event);
	}
}
