import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ENgxEsriMapComponent } from '../../src/e-ngx-esrimap.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	googleMapComponent: ENgxEsriMapComponent;
	googleMap: any;
	tdtMapComponent: ENgxEsriMapComponent;
	tdtMap: any;
	esriMapComponent: ENgxEsriMapComponent;
	esriMap: any;
	mapUrl: string = environment.mapUrl;
	geoUrl: string = environment.geoUrl;
	gisApiUrl: string = environment.gisApiUrl;
	esriCSSUrl: string = environment.esriCSSUrl;
	initExtent: any = {xmax: 116.39029888900006, xmin: 116.04209077900009, ymax: 40.161018230000025, ymin: 39.885287565000056};
	initExtent2: any = {xmax: 12980277.986602597, xmin: 12934415.769631553, ymax: 4864627.423165954, ymin: 4841696.314680432};

	constructor() {
	}

	ngOnInit() {
	}

	/**
	 * 天地图地图加载完成
	 * @param $event
	 */
	onTdtMapReady($event: ENgxEsriMapComponent) {
		this.tdtMapComponent = $event;
		this.tdtMap = this.tdtMapComponent.map;
		this.tdtMapComponent.setExtent(this.initExtent);
	}

	/**
	 * 天地图底图切换
	 * @param {number} $event
	 */
	onTdtBaseLayerChange($event: number) {
		console.log($event);
	}

	/**
	 * 谷歌地图加载完成
	 * @param $event
	 */
	onGoogleMapReady($event: ENgxEsriMapComponent) {
		this.googleMapComponent = $event;
		this.googleMap = this.googleMapComponent.map;
	}

	/**
	 * 谷歌底图切换
	 * @param {number} $event
	 */
	onGoogleBaseLayerChange($event: number) {
		console.log($event);
	}

	/**
	 * esri地图加载完成
	 * @param $event
	 */
	onEsriMapReady($event: ENgxEsriMapComponent) {
		this.esriMapComponent = $event;
		this.esriMap = this.esriMapComponent.map;
	}

	/**
	 * esri底图切换
	 * @param {number} $event
	 */
	onEsriBaseLayerChange($event: number) {
		console.log($event);
	}
}
