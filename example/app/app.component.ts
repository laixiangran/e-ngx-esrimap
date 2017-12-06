import { Component, OnInit } from '@angular/core';
import { EssenceNg2EsriMapComponent } from '../../src/essence-ng2-esrimap.component';
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	esriMap: EssenceNg2EsriMapComponent;
	mapUrl: string = environment.mapUrl; // 底图路径
	geoUrl: string = environment.geoUrl; // 几何服务路径
	gisApiUrl: string = environment.gisApiUrl; // arcgis javascript API路径
	esriCSSUrl: string = environment.esriCSSUrl;

	constructor() {
	}

	ngOnInit() {
	}

	/**
	 * 地图加载完成
	 * @param $event
	 */
	onMapReady($event: EssenceNg2EsriMapComponent) {
		this.esriMap = $event;
	}
}
