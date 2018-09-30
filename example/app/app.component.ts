import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ENgxEsriMapComponent } from '../../src/e-ngx-esrimap.component';
import { EchartsLayerService } from '../../src/echarts-layer-service';

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
	mapComponent: ENgxEsriMapComponent;
	map: any;
	mapUrl: string = environment.mapUrl;
	geoUrl: string = environment.geoUrl;
	gisApiUrl: string = environment.gisApiUrl;
	esriCSSUrl: string = environment.esriCSSUrl;
	initExtent: any = {xmax: 116.39029888900006, xmin: 116.04209077900009, ymax: 40.161018230000025, ymin: 39.885287565000056};
	initExtent2: any = {xmax: 12980277.986602597, xmin: 12934415.769631553, ymax: 4864627.423165954, ymin: 4841696.314680432};
	ClusterLayer: any;
	ClassBreaksRenderer: any;
	rawData = [
		['东城区', 116.418757, 39.937544, 10, 20, 30],
		['西城区', 116.366794, 39.910309, 10, 22, 30],
		['朝阳区', 116.486409, 39.991489, 10, 20, 35],
		['丰台区', 116.286968, 39.863642, 10, 26, 30],
		['石景山区', 116.170445, 39.974601, 19, 20, 30],
		['海淀区', 116.280316, 40.039074, 11, 20, 30],
		['门头沟区', 115.905381, 40.009183, 10, 26, 30],
		['房山区', 115.701157, 39.735535, 10, 20, 39],
		['通州区', 116.758603, 39.802486, 10, 24, 30],
		['顺义区', 116.753525, 40.128936, 18, 20, 30],
		['昌平区', 116.235906, 40.318085, 14, 20, 30],
		['大兴区', 116.338033, 39.658908, 10, 23, 30],
		['怀柔区', 116.607122, 40.524272, 10, 26, 30],
		['平谷区', 117.112335, 40.244783, 10, 20, 32],
		['密云区', 116.943352, 40.477362, 10, 20, 36],
		['延庆区', 115.985006, 40.465325, 17, 20, 30]
	];

	constructor(public echartsLayerService: EchartsLayerService) {
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

	/**
	 * 天地图地图加载完成
	 * @param $event
	 */
	onMapReady($event: ENgxEsriMapComponent) {
		this.mapComponent = $event;
		this.map = this.mapComponent.map;
		this.mapComponent.loadEsriModules(['extras/ClusterLayer', 'esri/renderers/ClassBreaksRenderer']).then(([ClusterLayer, ClassBreaksRenderer]) => {
			this.ClusterLayer = ClusterLayer;
			this.ClassBreaksRenderer = ClassBreaksRenderer;
			this.echartsLayerDemo();
			this.clusterLayerDemo();
		});
	}

	echartsLayerDemo() {
		const option = {
			tooltip: {
				trigger: 'axis'
			},
			color: ['#F75D5D', '#59ED4F', '#4C91E7'],
			geo: {},
			xAxis: {
				type: 'category',
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				axisLine: {
					onZero: false,
					lineStyle: {
						color: 'rgba(0, 0, 0, 0)'
					}
				},
				data: ['数据A', '数据B', '数据C']
			},
			yAxis: {
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				axisLine: {
					show: false
				}
			},
			grid: {
				width: 40,
				height: 60
			},
			series: {
				type: 'bar',
				barGap: 0,
				barCategoryGap: 0
			}
		};
		this.echartsLayerService.init(this.map, option, this.rawData);
	}

	/**
	 * 聚合图层（ClusterLayer）示例
	 */
	clusterLayerDemo() {
		// ClusterLayer options:
		// 	data:  Object[]
		//     Array of objects. Required. Object are required to have properties named x, y and attributes. The x and y coordinates have to be numbers that represent a points coordinates.
		//   distance:  Number?
		//     Optional. The max number of pixels between points to group points in the same cluster. Default value is 50.
		//   labelColor:  String?
		//     Optional. Hex string or array of rgba values used as the color for cluster labels. Default value is #fff (white).
		//   labelOffset:  String?
		//     Optional. Number of pixels to shift a cluster label vertically. Defaults to -5 to align labels with circle symbols. Does not work in IE.
		//   resolution:  Number
		//     Required. Width of a pixel in map coordinates. Example of how to calculate:
		//     map.extent.getWidth() / map.width
		//   showSingles:  Boolean?
		//     Optional. Whether or graphics should be displayed when a cluster graphic is clicked. Default is true.
		//   singleSymbol:  MarkerSymbol?
		//     Marker Symbol (picture or simple). Optional. Symbol to use for graphics that represent single points. Default is a small gray SimpleMarkerSymbol.
		//   singleTemplate:  PopupTemplate?
		//     PopupTemplate</a>. Optional. Popup template used to format attributes for graphics that represent single points. Default shows all attributes as "attribute = value" (not recommended).
		//   maxSingles:  Number?
		//     Optional. Threshold for whether or not to show graphics for points in a cluster. Default is 1000.
		//   webmap:  Boolean?
		//     Optional. Whether or not the map is from an ArcGIS.com webmap. Default is false.
		//   spatialReference:  SpatialReference?
		//     Optional. Spatial reference for all graphics in the layer. This has to match the spatial reference of the map. Default is 102100. Omit this if the map uses basemaps in web mercator.
		// 初始化图层
		const datas: any[] = [{
			x: 116,
			y: 40,
			attributes: {}
		}, {
			x: 116,
			y: 39,
			attributes: {}
		}, {
			x: 116,
			y: 40,
			attributes: {}
		}];
		const options = {
			'id': 'clusters',
			'data': datas,
			'distance': 100,
			'showSingles': false,
			'labelColor': '#fff',
			'labelOffset': 10,
			'resolution': this.map.extent.getWidth() / this.map.width,
			'spatialReference': this.map.spatialReference
		};
		const clusterLayer = new this.ClusterLayer(options); // 初始化聚合图层
		this.map.addLayer(clusterLayer);

		// 设置符号
		const defaultSym = new this.mapComponent.SimpleMarkerSymbol().setSize(4);
		const renderer = new this.ClassBreaksRenderer(defaultSym, 'clusterCount');
		const tenders = new this.mapComponent.PictureMarkerSymbol('assets/images/tenders.png', 40, 40).setOffset(0, 15);
		const tenders_bg = new this.mapComponent.PictureMarkerSymbol('assets/images/tenders_bg.png', 40, 40).setOffset(0, 15);
		renderer.addBreak(0, 1, tenders);
		renderer.addBreak(2, 99999999, tenders_bg);
		clusterLayer.setRenderer(renderer);
	}
}
