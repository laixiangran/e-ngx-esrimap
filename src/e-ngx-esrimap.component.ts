import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { ENgxEsriMapLoaderService } from './e-ngx-esrimap-loader.service';
import { AsyncGetResultParam } from './models/AsyncGetResultParam';

@Component({
	selector: 'e-ngx-esrimap',
	templateUrl: './e-ngx-esrimap.component.html',
	styleUrls: ['./e-ngx-esrimap.component.scss']
})
export class ENgxEsriMapComponent implements OnInit, OnDestroy {

	private timeOutId: number; // 定时器id
	private locationLayer: any; // 定位图层
	private basemapIds: any[] = []; // 所有底图id
	private currBaseLayerIndex: number = 0; // 当前底图序号

	// esri
	Map: any;
	Color: any;
	Graphic: any;
	SpatialReference: any;
	urlUtils: any;
	esriConfig: any;

	// esri/tasks
	Geoprocessor: any;
	GeometryService: any;
	FeatureSet: any;
	FindTask: any;
	FindParameters: any;
	IdentifyTask: any;
	IdentifyParameters: any;
	QueryTask: any;
	Query: any;
	ProjectParameters: any;
	BufferParameters: any;

	// esri/layers
	ArcGISTiledMapServiceLayer: any;
	ArcGISDynamicMapServiceLayer: any;
	WebTiledLayer: any;
	GraphicsLayer: any;
	ImageParameters: any;
	TileInfo: any;

	// esri/geometry
	Extent: any;
	Point: any;
	ScreenPoint: any;
	Polyline: any;
	Polygon: any;

	// esri/symbols
	PictureMarkerSymbol: any;
	SimpleMarkerSymbol: any;
	SimpleLineSymbol: any;
	CartographicLineSymbol: any;
	PictureFillSymbol: any;
	SimpleFillSymbol: any;

	// toolbar
	Draw: any;

	// ENgxEsriMapComponent
	map: any; // 当前地图实例
	geometryService: any; // 当前几何服务实例
	isMax: boolean = false; // 比例是否最大
	isMin: boolean = false; // 比例是否最小

	@ViewChild('emap') emapEle: ElementRef;

	// 是否开启代理
	@Input() isProxy: boolean = false;

	@Input() proxyUrl: string = 'proxy.jsp';

	// 底图路径
	@Input() mapUrl: string[] | string = 'http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer';

	// 副底图路径，用作底图切换
	@Input() submapUrl: any[] = ['http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer'];

	// 几何服务路径
	@Input() geoUrl: string = 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer';

	// arcgis javascript api路径
	@Input() gisApiUrl: string = 'http://js.arcgis.com/3.23/';

	// esri.css路径
	@Input() esriCSSUrl: string = 'http://js.arcgis.com/3.23/esri/css/esri.css';

	// 底图类型
	@Input() mapType: string = 'esri';

	// 地图初始范围
	@Input() initExtent: any;

	// 是否启用导航
	@Input() enableNavigation: boolean = true;

	// 地图初始化事件
	@Output()
	mapReady: EventEmitter<any> = new EventEmitter<any>(false);

	// 地图销毁事件
	@Output()
	mapDestroy: EventEmitter<any> = new EventEmitter<any>(false);

	// 地图范围改变事件
	@Output()
	exentChange: EventEmitter<any> = new EventEmitter<any>(false);

	// 底图切换事件
	@Output()
	baseLayerChange: EventEmitter<any> = new EventEmitter<any>(false);

	constructor(private esriLoaderService: ENgxEsriMapLoaderService) {}

	ngOnInit() {
		this.addEsriMapCss();
		this.esriLoaderService.load({url: this.gisApiUrl}).then(() => {
			this.init();
		}).catch((e: Error) => {
			if (e.message === 'The ArcGIS API for JavaScript is already loaded.') {
				this.init();
			} else {
				console.error(e);
			}
		});
	}

	ngOnDestroy() {
		if (this.map) {
			this.map.destroy();
		}
		this.mapDestroy.emit();
	}

	/**
	 * 初始化esri模块
	 */
	private init(): void {
		this.loadEsriModules([
			'esri/map',
			'esri/urlUtils',
			'esri/config',
			'esri/graphic',
			'esri/Color',
			'esri/SpatialReference',
			'esri/tasks/Geoprocessor',
			'esri/tasks/ProjectParameters',
			'esri/tasks/GeometryService',
			'esri/tasks/FeatureSet',
			'esri/tasks/FindTask',
			'esri/tasks/FindParameters',
			'esri/tasks/IdentifyTask',
			'esri/tasks/IdentifyParameters',
			'esri/tasks/QueryTask',
			'esri/tasks/query',
			'esri/tasks/BufferParameters',
			'esri/layers/ArcGISTiledMapServiceLayer',
			'esri/layers/GraphicsLayer',
			'esri/layers/ImageParameters',
			'esri/layers/TileInfo',
			'esri/layers/WebTiledLayer',
			'esri/layers/ArcGISDynamicMapServiceLayer',
			'esri/geometry/Point',
			'esri/geometry/ScreenPoint',
			'esri/geometry/Extent',
			'esri/geometry/Polyline',
			'esri/geometry/Polygon',
			'esri/symbols/PictureMarkerSymbol',
			'esri/symbols/SimpleMarkerSymbol',
			'esri/symbols/SimpleLineSymbol',
			'esri/symbols/CartographicLineSymbol',
			'esri/symbols/PictureFillSymbol',
			'esri/symbols/SimpleFillSymbol',
			'esri/toolbars/draw'
		]).then(([
					 Map,
					 urlUtils,
					 esriConfig,
					 Graphic,
					 Color,
					 SpatialReference,
					 Geoprocessor,
					 ProjectParameters,
					 GeometryService,
					 FeatureSet,
					 FindTask,
					 FindParameters,
					 IdentifyTask,
					 IdentifyParameters,
					 QueryTask,
					 Query,
					 BufferParameters,
					 ArcGISTiledMapServiceLayer,
					 GraphicsLayer,
					 ImageParameters,
					 TileInfo,
					 WebTiledLayer,
					 ArcGISDynamicMapServiceLayer,
					 Point,
					 ScreenPoint,
					 Extent,
					 Polyline,
					 Polygon,
					 PictureMarkerSymbol,
					 SimpleMarkerSymbol,
					 SimpleLineSymbol,
					 CartographicLineSymbol,
					 PictureFillSymbol,
					 SimpleFillSymbol,
					 Draw
				 ]) => {

			// 初始化模块
			this.Map = Map;
			this.urlUtils = urlUtils;
			this.esriConfig = esriConfig;
			this.Graphic = Graphic;
			this.Color = Color;
			this.SpatialReference = SpatialReference;
			this.Geoprocessor = Geoprocessor;
			this.ProjectParameters = ProjectParameters;
			this.GeometryService = GeometryService;
			this.FeatureSet = FeatureSet;
			this.FindTask = FindTask;
			this.FindParameters = FindParameters;
			this.IdentifyTask = IdentifyTask;
			this.IdentifyParameters = IdentifyParameters;
			this.QueryTask = QueryTask;
			this.Query = Query;
			this.BufferParameters = BufferParameters;
			this.ArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
			this.GraphicsLayer = GraphicsLayer;
			this.ImageParameters = ImageParameters;
			this.TileInfo = TileInfo;
			this.WebTiledLayer = WebTiledLayer;
			this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;
			this.Point = Point;
			this.ScreenPoint = ScreenPoint;
			this.Extent = Extent;
			this.Polyline = Polyline;
			this.Polygon = Polygon;
			this.PictureMarkerSymbol = PictureMarkerSymbol;
			this.SimpleMarkerSymbol = SimpleMarkerSymbol;
			this.SimpleLineSymbol = SimpleLineSymbol;
			this.CartographicLineSymbol = CartographicLineSymbol;
			this.PictureFillSymbol = PictureFillSymbol;
			this.SimpleFillSymbol = SimpleFillSymbol;
			this.Draw = Draw;

			this.initMap();
			this.addMapEvent();
		});
	}

	/**
	 * 初始化地图
	 */
	private initMap(): void {

		// 初始化几何服务
		if (this.geoUrl) {
			this.geometryService = new this.GeometryService(this.geoUrl);
		} else {
			throw new Error('geoUrl未配置，将导致坐标转换等功能无法使用！');
		}

		// 设置代理
		if (this.isProxy) {
			this.esriConfig.defaults.io.proxyUrl = this.proxyUrl;
			this.esriConfig.defaults.io.alwaysUseProxy = true;
			this.urlUtils.addProxyRule({
				urlPrefix: 'route.arcgis.com',
				proxyUrl: this.proxyUrl
			});
		}

		// 初始化地图
		this.map = new this.Map(this.emapEle.nativeElement, {
			logo: false,
			slider: false
		});

		// 加载底图
		if (this.mapType === 'tdt') {

			// 初始底图
			this.getTdtLayer(Array.isArray(this.mapUrl) ? this.mapUrl : [this.mapUrl]).then((layers: any[]) => {
				const baseamapLayerIds: string[] = [];
				layers.forEach((layer: any, index: number) => {
					baseamapLayerIds.push(layer.id);
					this.map.addLayer(layer);
				});
				this.basemapIds.push(baseamapLayerIds);
			});

			// 切换的其它底图
			this.submapUrl.forEach((submap: string[]) => {
				this.getTdtLayer(Array.isArray(submap) ? submap : [submap]).then((layers: any[]) => {
					const baseamapLayerIds: string[] = [];
					layers.forEach((layer: any, index: number) => {
						layer.setVisibility(false);
						baseamapLayerIds.push(layer.id);
						this.map.addLayer(layer);
					});
					this.basemapIds.push(baseamapLayerIds);
				});
			});
		} else if (this.mapType === 'esri') {

			// 初始底图
			const esriBasemapLayerId: string = `${this.mapType}_base_0`,
				esriBasemapLayer: any = new this.ArcGISTiledMapServiceLayer(this.mapUrl, {
					id: esriBasemapLayerId
				});
			this.basemapIds.push(esriBasemapLayerId);
			this.map.addLayer(esriBasemapLayer);

			// 切换的其它底图
			this.submapUrl.forEach((submap: string[], index: number) => {
				const esriSubmapLayerId: string = `${this.mapType}_base_${index + 1}`,
					esriSubmapLayer: any = new this.ArcGISTiledMapServiceLayer(submap, {
						id: esriSubmapLayerId
					});
				esriSubmapLayer.setVisibility(false);
				this.basemapIds.push(esriSubmapLayerId);
				this.map.addLayer(esriSubmapLayer);
			});
		} else {
			throw new Error('请指定输入属性 mapType 的值！');
		}
	}

	/**
	 * 获取天地图图层
	 * @param layers 图层的代码
	 * @returns {Promise<T>}
	 */
	private getTdtLayer(layers: string[]): Promise<any> {
		return new Promise((resolve) => {
			this.loadEsriModules([
				'esri/layers/TileInfo',
				'esri/layers/WebTiledLayer'])
				.then(([TileInfo, WebTiledLayer]) => {

				});
			const tileInfo: any = new this.TileInfo({
				rows: 256,
				cols: 256,
				compressionQuality: 0,
				origin: {
					x: -180,
					y: 90
				},
				spatialReference: {
					wkid: 4326
				},
				lods: [
					{'level': 2, 'resolution': 0.3515625, 'scale': 147748796.52937502},
					{'level': 3, 'resolution': 0.17578125, 'scale': 73874398.264687508},
					{'level': 4, 'resolution': 0.087890625, 'scale': 36937199.132343754},
					{'level': 5, 'resolution': 0.0439453125, 'scale': 18468599.566171877},
					{'level': 6, 'resolution': 0.02197265625, 'scale': 9234299.7830859385},
					{'level': 7, 'resolution': 0.010986328125, 'scale': 4617149.8915429693},
					{'level': 8, 'resolution': 0.0054931640625, 'scale': 2308574.9457714846},
					{'level': 9, 'resolution': 0.00274658203125, 'scale': 1154287.4728857423},
					{'level': 10, 'resolution': 0.001373291015625, 'scale': 577143.73644287116},
					{'level': 11, 'resolution': 0.0006866455078125, 'scale': 288571.86822143558},
					{'level': 12, 'resolution': 0.00034332275390625, 'scale': 144285.93411071779},
					{'level': 13, 'resolution': 0.000171661376953125, 'scale': 72142.967055358895},
					{'level': 14, 'resolution': 8.58306884765625e-005, 'scale': 36071.483527679447},
					{'level': 15, 'resolution': 4.291534423828125e-005, 'scale': 18035.741763839724},
					{'level': 16, 'resolution': 2.1457672119140625e-005, 'scale': 9017.8708819198619},
					{'level': 17, 'resolution': 1.0728836059570313e-005, 'scale': 4508.9354409599309},
					{'level': 18, 'resolution': 5.3644180297851563e-006, 'scale': 2254.4677204799655}
				]
			});
			const subDomains: string[] = ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'];
			const tdtLayers: any[] = [];
			layers.forEach((type) => {
				const templateUrl: string = 'http://${subDomain}.tianditu.com/DataServer?T=' + type + '_c&X=${col}&Y=${row}&L=${level}';
				const tdtLayer: any = new this.WebTiledLayer(templateUrl, {
					id: 'tdt_' + type,
					subDomains: subDomains,
					tileInfo: tileInfo
				});
				tdtLayers.push(tdtLayer);
			});
			resolve(tdtLayers);
		});
	}

	/**
	 * 地图注册事件
	 */
	private addMapEvent() {
		this.map.on('load', () => {
			if (this.initExtent) {
				this.initExtent.spatialReference = this.map.spatialReference;
				this.map.setExtent(new this.Extent(this.initExtent), true).then(() => {
					this.mapReady.emit(this);
				});
			} else {
				this.initExtent = this.map.extent;
				this.mapReady.emit(this);
			}
		});

		this.map.on('extent-change', (event) => {
			this.isMax = this.map.getZoom() >= this.map.getMaxZoom();
			this.isMin = this.map.getZoom() <= this.map.getMinZoom();
			this.exentChange.emit(event);
		});
	}

	/**
	 * 动态添加esri.css
	 */
	private addEsriMapCss(): void {
		const linkId: string = 'esriCss';
		if (!document.getElementById(linkId)) {
			const head = document.getElementsByTagName('head')[0],
				link = document.createElement('link');
			link.id = linkId;
			link.rel = 'stylesheet';
			link.href = this.esriCSSUrl;
			head.appendChild(link);
		}
	}

	/**
	 * 底图切换
	 * @param {number} layerIndex
	 */
	changeBaseLayer (layerIndex: number) {
		if (this.currBaseLayerIndex !== layerIndex) {
			this.basemapIds.forEach((mapIds: string | string[], index: number) => {
				if (layerIndex === index) {
					const prevBaseLayerIndex = this.currBaseLayerIndex;
					this.currBaseLayerIndex = layerIndex;
					if (Array.isArray(mapIds)) {
						mapIds.forEach((id: string) => {
							this.map.getLayer(id).setVisibility(true);
						});
					} else {
						this.map.getLayer(mapIds).setVisibility(true);
					}
					this.baseLayerChange.emit({
						prev: prevBaseLayerIndex,
						curr: this.currBaseLayerIndex
					});
				} else {
					if (Array.isArray(mapIds)) {
						mapIds.forEach((id: string) => {
							this.map.getLayer(id).setVisibility(false);
						});
					} else {
						this.map.getLayer(mapIds).setVisibility(false);
					}
				}
			});
		}
	}

	/**
	 * 加载arcgis api for javascript的模块
	 * @param modules
	 * @returns {Promise<any>}
	 */
	loadEsriModules(modules: string[]): Promise<any> {
		return this.esriLoaderService.loadModules(modules);
	}

	/**
	 * 放大
	 */
	zoomIn() {
		this.isMax = this.map.getZoom() >= this.map.getMaxZoom();
		if (!this.isMax) {
			this.map.setZoom(this.map.getZoom() + 1);
		}
	}

	/**
	 * 缩小
	 */
	zoomOut() {
		this.isMin = this.map.getZoom() <= this.map.getMinZoom();
		if (!this.isMin) {
			this.map.setZoom(this.map.getZoom() - 1);
		}
	}

	/**
	 * 全图
	 */
	fullMap() {
		this.map.setExtent(new this.Extent(this.initExtent), true);
	}

	/**
	 * GP服务获取数据（异步）
	 * @param {AsyncGetResultParam} params
	 */
	gpAsyncGetResultData(params: AsyncGetResultParam): void {
		const gp = new this.Geoprocessor(params.url);
		gp.submitJob(params.inParamVal, (jobInfo: any) => {
			gp.getResultData(jobInfo.jobId, params.outParamName, (result: any) => {
				params.success(result);
			}, (error: any) => {
				params.error(error);
			});
		}, (jobInfo: any) => {
			if (params.status) {
				params.status(jobInfo);
			}
		}, (error: any) => {
			params.error(error);
		});
	}

	/**
	 * GP服务获取结果图片图层（异步）
	 * @param {AsyncGetResultParam} params
	 */
	gpAsyncGetResultImageLayer(params: AsyncGetResultParam) {
		const gp = new this.Geoprocessor(params.url);
		gp.submitJob(params.inParamVal, (jobInfo: any) => {
			const imageParameters = new this.ImageParameters();
			imageParameters.imageSpatialReference = this.map.spatialReference;
			gp.getResultImageLayer(jobInfo.jobId, params.outParamName, imageParameters, (result: any) => {
				params.success(result);
			}, (error: any) => {
				params.error(error);
			});
		}, (jobInfo: any) => {
			if (params.status) {
				params.status(jobInfo);
			}
		}, (error: any) => {
			params.error(error);
		});
	};

	/**
	 * 点定位
	 * @param point
	 */
	locationPoint(point: { x: number, y: number }): void {
		if (!this.locationLayer) {
			this.locationLayer = new this.GraphicsLayer();
		}
		const mp = new this.Point({
				x: point.x,
				y: point.y,
				spatialReference: this.map.spatialReference
			}),
			mpSymbol = new this.PictureMarkerSymbol({
				url: 'assets/images/map/location.gif',
				height: 40,
				width: 40
			}),
			gra = new this.Graphic(mp, mpSymbol);

		this.locationLayer.clear();
		this.locationLayer.add(gra);
		this.map.addLayer(this.locationLayer, 0);
		this.map.centerAt(mp);

		// 清除定时器
		if (this.timeOutId) {
			window.clearTimeout(this.timeOutId);
		}

		// 10s之后清除定位动画gif
		this.timeOutId = window.setTimeout(() => {
			window.clearTimeout(this.timeOutId);
			this.locationLayer.clear();
		}, 10000);
	}

	/**
	 * 清除定位图层
	 */
	clearLocationLayer() {
		if (this.locationLayer) {
			this.locationLayer.clear();
		}
	}

	/**
	 * 显示地图信息窗口
	 * @param params 信息窗口参数，属性如下：
	 * title {String} 信息窗口标题
	 * content {String} 信息窗口内容，支持html
	 * location {Point} 信息窗口位置
	 * placement {String} 信息窗口方位
	 * width {Number} 信息窗口宽度
	 * height {Number} 信息窗口高度
	 */
	showMapInfoWindow(params: any): void {
		this.map.infoWindow.setTitle(params.title);
		this.map.infoWindow.setContent(params.content);
		this.map.infoWindow.resize(params.width || 200, params.height || 300);
		this.map.infoWindow.show(params.location, this.map.getInfoWindowAnchor(this.map.toScreen(params.location)));
	}

	/**
	 * 隐藏地图信息窗口
	 */
	hideMapInfoWindow(): void {
		this.map.infoWindow.hide();
	}

	/**
	 * 要素坐标转换
	 * @param fs 转换的要素集
	 * @param wkid 转换的坐标编码
	 * @returns {Observable<any>}
	 */
	exactProject(fs: any, wkid: any): Observable<any> {
		return new Observable<any>((subscriber: Subscriber<any>) => {
			const geometries = [],
				attrs = [],
				len = fs.features.length,
				ps = new this.ProjectParameters(),
				sr = new this.SpatialReference(wkid);
			for (let i = 0; i < len; i++) {
				const gra = fs.features[i];
				geometries.push(gra.geometry);
				attrs.push(gra.attributes);
			}
			ps.geometries = geometries;
			ps.outSR = sr;
			this.geometryService.project(ps, (gs: any) => {
				const f = new this.FeatureSet({
						features: [],
						spatialReference: sr
					}),
					len2 = gs.length;

				for (let j = 0; j < len2; j++) {
					const geo = gs[j],
						attr = attrs[j],
						pt = new this.Point(geo.x, geo.y, sr),
						gra = new this.Graphic(pt, null, attr);

					f.features.push(gra);
				}
				subscriber.next({
					code: 'success',
					data: f
				});
				subscriber.complete();
			}, (error: any) => {
				subscriber.next({
					code: 'failed',
					data: error
				});
				subscriber.complete();
			});
		});
	};

	/**
	 * 将坐标由度分秒表示转为十进制表示
	 * @param dfm 度分秒表示-180°0′0″
	 * @returns {number} 十进制
	 */
	latToDec(dfm: string): number {
		const lod = Number(dfm.split('°')[0]),
			lom = Number(dfm.split('°')[1].split('′')[0]),
			los = Number(dfm.split('°')[1].split('′')[1].split('″')[0]);

		return lod + lom / 60 + los / 3600;
	};

	/**
	 * 将坐标由十进制表示转为度分秒表示
	 * @param sjz 十进制表示-180.00
	 * @returns {string} 度分秒表示-180°0′0″
	 */
	decToLat(sjz: number): string {
		const d = String(sjz).split('.'),
			f = String(Number('0.' + d[1]) * 60).split('.');

		return d[0] + '°' + f[0] + '′' + (Number('0.' + f[1]) * 60).toFixed(2) + '″';
	};
}
