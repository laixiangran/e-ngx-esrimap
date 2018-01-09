import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ENgxEsriMapComponent } from '../../src/e-ngx-esrimap.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	esriMap: ENgxEsriMapComponent;
	map: any;
	mapUrl: string = environment.mapUrl;
	geoUrl: string = environment.geoUrl;
	gisApiUrl: string = environment.gisApiUrl;
	esriCSSUrl: string = environment.esriCSSUrl;

	constructor() {
	}

	ngOnInit() {
	}

	/**
	 * 地图加载完成
	 * @param $event
	 */
	onMapReady($event: ENgxEsriMapComponent) {
		this.esriMap = $event;
		this.map = this.esriMap.map;
	}
}
