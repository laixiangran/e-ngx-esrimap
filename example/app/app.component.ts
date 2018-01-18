import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ENgxEsriMapComponent } from '../../src/e-ngx-esrimap.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	esriMapComponent: ENgxEsriMapComponent;
	esriMap: any;
	tdtMapComponent: ENgxEsriMapComponent;
	tdtMap: any;
	mapUrl: string = environment.mapUrl;
	geoUrl: string = environment.geoUrl;
	gisApiUrl: string = environment.gisApiUrl;
	esriCSSUrl: string = environment.esriCSSUrl;

	constructor() {
	}

	ngOnInit() {
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
	 * 天地图地图加载完成
	 * @param $event
	 */
	onTdtMapReady($event: ENgxEsriMapComponent) {
		this.tdtMapComponent = $event;
		this.tdtMap = this.tdtMapComponent.map;
	}
}
