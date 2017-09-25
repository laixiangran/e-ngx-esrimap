import { Component, OnInit } from '@angular/core';
import { EssenceNg2EsriMapComponent } from '../../src/essence-ng2-esrimap.component';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	esriMap: EssenceNg2EsriMapComponent;
	ClusterLayer: any;
	mapUrl: string[] = ['vec', 'cva'];
	mapType: string = 'tdt';
	geoUrl: string = environment.geoUrl; // 几何服务路径
	gisApiUrl: string = environment.gisApiUrl; // arcgis javascript API路径
	esriCSSUrl: string = environment.esriCSSUrl; // arcgis javascript API路径
	clusterLayer: any;

	constructor(public http: Http) {
	}

	ngOnInit() {
	}

	onMapReady($event: EssenceNg2EsriMapComponent) {
		this.esriMap = $event;
	}

	/**
	 * 地图范围改变的事件
	 * @param $event
	 */
	onExentChange(event: any) {
		// console.log(event);
	}
}
