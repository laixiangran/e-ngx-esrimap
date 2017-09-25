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
	esriCssUrl: string = environment.esriCssUrl; // arcgis javascript API路径
	clusterLayer: any;

	constructor(public http: Http) {
	}

	ngOnInit() {
	}

	onMapReady($event: EssenceNg2EsriMapComponent) {
		this.esriMap = $event;
		this.esriMap.loadEsriModules(['extras/ClusterLayer', 'esri/renderers/ClassBreaksRenderer']).then(([ClusterLayer, ClassBreaksRenderer]) => {
			this.ClusterLayer = ClusterLayer;
			this.post('http://192.168.0.61/nxhh/ShareAction/getBdListPage', {
				currentPage: 1,
				pageSize: 10000
			}).subscribe((serverData) => {
				const items: any[] = serverData.result.items;
				const datas: any[] = [];
				items.forEach((d) => {
					if (d.x && d.y) {
						datas.push({
							x: d.x,
							y: d.y,
							attributes: d
						});
					}
				});
				this.clusterLayer = new this.ClusterLayer({
					'data': datas,
					'distance': 100,
					'id': 'clusters',
					'showSingles': false,
					'labelColor': '#fff',
					'labelOffset': 10,
					'resolution': this.esriMap.map.extent.getWidth() / this.esriMap.map.width,
					'spatialReference': this.esriMap.map.spatialReference
				});
				const defaultSym = new this.esriMap.SimpleMarkerSymbol().setSize(4);
				const renderer = new ClassBreaksRenderer(defaultSym, 'clusterCount');
				const picBaseUrl = 'http://static.arcgis.com/images/Symbols/Shapes/';
				const blue = new this.esriMap.PictureMarkerSymbol(picBaseUrl + 'BluePin1LargeB.png', 36, 36).setOffset(0, 15);
				const green = new this.esriMap.PictureMarkerSymbol(picBaseUrl + 'GreenPin1LargeB.png', 48, 48).setOffset(0, 15);
				this.clusterLayer.setRenderer(renderer);
				renderer.addBreak(0, 1, blue);
				renderer.addBreak(2, 99999999, green);
				this.esriMap.map.addLayer(this.clusterLayer);
				let initMapExtent: any = {};
				this.clusterLayer.on('click', (evt: any) => {
					const extent: any = evt.graphic.attributes.extent,
						clusters: any = evt.graphic.attributes.clusters,
						mapExtent: any = new this.esriMap.Extent(extent[0], extent[1], extent[2], extent[3], this.esriMap.map.spatialReference);
					if (clusters.length > 1) {
						initMapExtent = JSON.parse(JSON.stringify(this.esriMap.map.extent));
						this.esriMap.map.setExtent(mapExtent, true).then(() => {
							if (initMapExtent.xmax === this.esriMap.map.extent.xmax) {
								console.log(clusters);
							}
						});
					} else {
						console.log(clusters[0].attributes);
					}
				});
			});
		});
	}

	/**
	 * 地图范围改变的事件
	 * @param $event
	 */
	onExentChange(event: any) {
		// console.log(event);
	}

	/**
	 * post请求
	 * @param {string} url 请求路径
	 * @param {*} body body
	 * @returns {Observable<any>}
	 */
	post(url: string, body: any): Observable<any> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'URMS_LOGIN_TOKEN': 'E4093EDF0EAD188D_529295B0B2CEB10ABAC26C188682A4683D9EB32711D63A10EA4EF06C558FACD200CF493097DD30FA'
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(url, body && JSON.stringify(body), options).map((res: Response) => {
			return res.json();
		}).catch((error: Response): Observable<any> => {
			return Observable.throw(error.json() || 'Server Error');
		});
	}
}
