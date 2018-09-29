import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ENgxEsriMapComponent } from '../../src/e-ngx-esrimap.component';
import * as echarts from 'echarts';

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
	Echarts3Layer: any;
	ClusterLayer: any;
	ClassBreaksRenderer: any;
	data = [
		{name: '海门', value: 9},
		{name: '鄂尔多斯', value: 12},
		{name: '招远', value: 12},
		{name: '舟山', value: 12},
		{name: '齐齐哈尔', value: 14},
		{name: '盐城', value: 15},
		{name: '赤峰', value: 16},
		{name: '青岛', value: 18},
		{name: '乳山', value: 18},
		{name: '金昌', value: 19},
		{name: '泉州', value: 21},
		{name: '莱西', value: 21},
		{name: '日照', value: 21},
		{name: '胶南', value: 22},
		{name: '南通', value: 23},
		{name: '拉萨', value: 24},
		{name: '云浮', value: 24},
		{name: '梅州', value: 25},
		{name: '文登', value: 25},
		{name: '上海', value: 25},
		{name: '攀枝花', value: 25},
		{name: '威海', value: 25},
		{name: '承德', value: 25},
		{name: '厦门', value: 26},
		{name: '汕尾', value: 26},
		{name: '潮州', value: 26},
		{name: '丹东', value: 27},
		{name: '太仓', value: 27},
		{name: '曲靖', value: 27},
		{name: '烟台', value: 28},
		{name: '福州', value: 29},
		{name: '瓦房店', value: 30},
		{name: '即墨', value: 30},
		{name: '抚顺', value: 31},
		{name: '玉溪', value: 31},
		{name: '张家口', value: 31},
		{name: '阳泉', value: 31},
		{name: '莱州', value: 32},
		{name: '湖州', value: 32},
		{name: '汕头', value: 32},
		{name: '昆山', value: 33},
		{name: '宁波', value: 33},
		{name: '湛江', value: 33},
		{name: '揭阳', value: 34},
		{name: '荣成', value: 34},
		{name: '连云港', value: 35},
		{name: '葫芦岛', value: 35},
		{name: '常熟', value: 36},
		{name: '东莞', value: 36},
		{name: '河源', value: 36},
		{name: '淮安', value: 36},
		{name: '泰州', value: 36},
		{name: '南宁', value: 37},
		{name: '营口', value: 37},
		{name: '惠州', value: 37},
		{name: '江阴', value: 37},
		{name: '蓬莱', value: 37},
		{name: '韶关', value: 38},
		{name: '嘉峪关', value: 38},
		{name: '广州', value: 38},
		{name: '延安', value: 38},
		{name: '太原', value: 39},
		{name: '清远', value: 39},
		{name: '中山', value: 39},
		{name: '昆明', value: 39},
		{name: '寿光', value: 40},
		{name: '盘锦', value: 40},
		{name: '长治', value: 41},
		{name: '深圳', value: 41},
		{name: '珠海', value: 42},
		{name: '宿迁', value: 43},
		{name: '咸阳', value: 43},
		{name: '铜川', value: 44},
		{name: '平度', value: 44},
		{name: '佛山', value: 44},
		{name: '海口', value: 44},
		{name: '江门', value: 45},
		{name: '章丘', value: 45},
		{name: '肇庆', value: 46},
		{name: '大连', value: 47},
		{name: '临汾', value: 47},
		{name: '吴江', value: 47},
		{name: '石嘴山', value: 49},
		{name: '沈阳', value: 50},
		{name: '苏州', value: 50},
		{name: '茂名', value: 50},
		{name: '嘉兴', value: 51},
		{name: '长春', value: 51},
		{name: '胶州', value: 52},
		{name: '银川', value: 52},
		{name: '张家港', value: 52},
		{name: '三门峡', value: 53},
		{name: '锦州', value: 54},
		{name: '南昌', value: 54},
		{name: '柳州', value: 54},
		{name: '三亚', value: 54},
		{name: '自贡', value: 56},
		{name: '吉林', value: 56},
		{name: '阳江', value: 57},
		{name: '泸州', value: 57},
		{name: '西宁', value: 57},
		{name: '宜宾', value: 58},
		{name: '呼和浩特', value: 58},
		{name: '成都', value: 58},
		{name: '大同', value: 58},
		{name: '镇江', value: 59},
		{name: '桂林', value: 59},
		{name: '张家界', value: 59},
		{name: '宜兴', value: 59},
		{name: '北海', value: 60},
		{name: '西安', value: 61},
		{name: '金坛', value: 62},
		{name: '东营', value: 62},
		{name: '牡丹江', value: 63},
		{name: '遵义', value: 63},
		{name: '绍兴', value: 63},
		{name: '扬州', value: 64},
		{name: '常州', value: 64},
		{name: '潍坊', value: 65},
		{name: '重庆', value: 66},
		{name: '台州', value: 67},
		{name: '南京', value: 67},
		{name: '滨州', value: 70},
		{name: '贵阳', value: 71},
		{name: '无锡', value: 71},
		{name: '本溪', value: 71},
		{name: '克拉玛依', value: 72},
		{name: '渭南', value: 72},
		{name: '马鞍山', value: 72},
		{name: '宝鸡', value: 72},
		{name: '焦作', value: 75},
		{name: '句容', value: 75},
		{name: '北京', value: 79},
		{name: '徐州', value: 79},
		{name: '衡水', value: 80},
		{name: '包头', value: 80},
		{name: '绵阳', value: 80},
		{name: '乌鲁木齐', value: 84},
		{name: '枣庄', value: 84},
		{name: '杭州', value: 84},
		{name: '淄博', value: 85},
		{name: '鞍山', value: 86},
		{name: '溧阳', value: 86},
		{name: '库尔勒', value: 86},
		{name: '安阳', value: 90},
		{name: '开封', value: 90},
		{name: '济南', value: 92},
		{name: '德阳', value: 93},
		{name: '温州', value: 95},
		{name: '九江', value: 96},
		{name: '邯郸', value: 98},
		{name: '临安', value: 99},
		{name: '兰州', value: 99},
		{name: '沧州', value: 100},
		{name: '临沂', value: 103},
		{name: '南充', value: 104},
		{name: '天津', value: 105},
		{name: '富阳', value: 106},
		{name: '泰安', value: 112},
		{name: '诸暨', value: 112},
		{name: '郑州', value: 113},
		{name: '哈尔滨', value: 114},
		{name: '聊城', value: 116},
		{name: '芜湖', value: 117},
		{name: '唐山', value: 119},
		{name: '平顶山', value: 119},
		{name: '邢台', value: 119},
		{name: '德州', value: 120},
		{name: '济宁', value: 120},
		{name: '荆州', value: 127},
		{name: '宜昌', value: 130},
		{name: '义乌', value: 132},
		{name: '丽水', value: 133},
		{name: '洛阳', value: 134},
		{name: '秦皇岛', value: 136},
		{name: '株洲', value: 143},
		{name: '石家庄', value: 147},
		{name: '莱芜', value: 148},
		{name: '常德', value: 152},
		{name: '保定', value: 153},
		{name: '湘潭', value: 154},
		{name: '金华', value: 157},
		{name: '岳阳', value: 169},
		{name: '长沙', value: 175},
		{name: '衢州', value: 177},
		{name: '廊坊', value: 193},
		{name: '菏泽', value: 194},
		{name: '合肥', value: 229},
		{name: '武汉', value: 273},
		{name: '大庆', value: 279}
	];
	geoCoordMap = {
		'海门': [121.15, 31.89],
		'鄂尔多斯': [109.781327, 39.608266],
		'招远': [120.38, 37.35],
		'舟山': [122.207216, 29.985295],
		'齐齐哈尔': [123.97, 47.33],
		'盐城': [120.13, 33.38],
		'赤峰': [118.87, 42.28],
		'青岛': [120.33, 36.07],
		'乳山': [121.52, 36.89],
		'金昌': [102.188043, 38.520089],
		'泉州': [118.58, 24.93],
		'莱西': [120.53, 36.86],
		'日照': [119.46, 35.42],
		'胶南': [119.97, 35.88],
		'南通': [121.05, 32.08],
		'拉萨': [91.11, 29.97],
		'云浮': [112.02, 22.93],
		'梅州': [116.1, 24.55],
		'文登': [122.05, 37.2],
		'上海': [121.48, 31.22],
		'攀枝花': [101.718637, 26.582347],
		'威海': [122.1, 37.5],
		'承德': [117.93, 40.97],
		'厦门': [118.1, 24.46],
		'汕尾': [115.375279, 22.786211],
		'潮州': [116.63, 23.68],
		'丹东': [124.37, 40.13],
		'太仓': [121.1, 31.45],
		'曲靖': [103.79, 25.51],
		'烟台': [121.39, 37.52],
		'福州': [119.3, 26.08],
		'瓦房店': [121.979603, 39.627114],
		'即墨': [120.45, 36.38],
		'抚顺': [123.97, 41.97],
		'玉溪': [102.52, 24.35],
		'张家口': [114.87, 40.82],
		'阳泉': [113.57, 37.85],
		'莱州': [119.942327, 37.177017],
		'湖州': [120.1, 30.86],
		'汕头': [116.69, 23.39],
		'昆山': [120.95, 31.39],
		'宁波': [121.56, 29.86],
		'湛江': [110.359377, 21.270708],
		'揭阳': [116.35, 23.55],
		'荣成': [122.41, 37.16],
		'连云港': [119.16, 34.59],
		'葫芦岛': [120.836932, 40.711052],
		'常熟': [120.74, 31.64],
		'东莞': [113.75, 23.04],
		'河源': [114.68, 23.73],
		'淮安': [119.15, 33.5],
		'泰州': [119.9, 32.49],
		'南宁': [108.33, 22.84],
		'营口': [122.18, 40.65],
		'惠州': [114.4, 23.09],
		'江阴': [120.26, 31.91],
		'蓬莱': [120.75, 37.8],
		'韶关': [113.62, 24.84],
		'嘉峪关': [98.289152, 39.77313],
		'广州': [113.23, 23.16],
		'延安': [109.47, 36.6],
		'太原': [112.53, 37.87],
		'清远': [113.01, 23.7],
		'中山': [113.38, 22.52],
		'昆明': [102.73, 25.04],
		'寿光': [118.73, 36.86],
		'盘锦': [122.070714, 41.119997],
		'长治': [113.08, 36.18],
		'深圳': [114.07, 22.62],
		'珠海': [113.52, 22.3],
		'宿迁': [118.3, 33.96],
		'咸阳': [108.72, 34.36],
		'铜川': [109.11, 35.09],
		'平度': [119.97, 36.77],
		'佛山': [113.11, 23.05],
		'海口': [110.35, 20.02],
		'江门': [113.06, 22.61],
		'章丘': [117.53, 36.72],
		'肇庆': [112.44, 23.05],
		'大连': [121.62, 38.92],
		'临汾': [111.5, 36.08],
		'吴江': [120.63, 31.16],
		'石嘴山': [106.39, 39.04],
		'沈阳': [123.38, 41.8],
		'苏州': [120.62, 31.32],
		'茂名': [110.88, 21.68],
		'嘉兴': [120.76, 30.77],
		'长春': [125.35, 43.88],
		'胶州': [120.03336, 36.264622],
		'银川': [106.27, 38.47],
		'张家港': [120.555821, 31.875428],
		'三门峡': [111.19, 34.76],
		'锦州': [121.15, 41.13],
		'南昌': [115.89, 28.68],
		'柳州': [109.4, 24.33],
		'三亚': [109.511909, 18.252847],
		'自贡': [104.778442, 29.33903],
		'吉林': [126.57, 43.87],
		'阳江': [111.95, 21.85],
		'泸州': [105.39, 28.91],
		'西宁': [101.74, 36.56],
		'宜宾': [104.56, 29.77],
		'呼和浩特': [111.65, 40.82],
		'成都': [104.06, 30.67],
		'大同': [113.3, 40.12],
		'镇江': [119.44, 32.2],
		'桂林': [110.28, 25.29],
		'张家界': [110.479191, 29.117096],
		'宜兴': [119.82, 31.36],
		'北海': [109.12, 21.49],
		'西安': [108.95, 34.27],
		'金坛': [119.56, 31.74],
		'东营': [118.49, 37.46],
		'牡丹江': [129.58, 44.6],
		'遵义': [106.9, 27.7],
		'绍兴': [120.58, 30.01],
		'扬州': [119.42, 32.39],
		'常州': [119.95, 31.79],
		'潍坊': [119.1, 36.62],
		'重庆': [106.54, 29.59],
		'台州': [121.420757, 28.656386],
		'南京': [118.78, 32.04],
		'滨州': [118.03, 37.36],
		'贵阳': [106.71, 26.57],
		'无锡': [120.29, 31.59],
		'本溪': [123.73, 41.3],
		'克拉玛依': [84.77, 45.59],
		'渭南': [109.5, 34.52],
		'马鞍山': [118.48, 31.56],
		'宝鸡': [107.15, 34.38],
		'焦作': [113.21, 35.24],
		'句容': [119.16, 31.95],
		'北京': [116.46, 39.92],
		'徐州': [117.2, 34.26],
		'衡水': [115.72, 37.72],
		'包头': [110, 40.58],
		'绵阳': [104.73, 31.48],
		'乌鲁木齐': [87.68, 43.77],
		'枣庄': [117.57, 34.86],
		'杭州': [120.19, 30.26],
		'淄博': [118.05, 36.78],
		'鞍山': [122.85, 41.12],
		'溧阳': [119.48, 31.43],
		'库尔勒': [86.06, 41.68],
		'安阳': [114.35, 36.1],
		'开封': [114.35, 34.79],
		'济南': [117, 36.65],
		'德阳': [104.37, 31.13],
		'温州': [120.65, 28.01],
		'九江': [115.97, 29.71],
		'邯郸': [114.47, 36.6],
		'临安': [119.72, 30.23],
		'兰州': [103.73, 36.03],
		'沧州': [116.83, 38.33],
		'临沂': [118.35, 35.05],
		'南充': [106.110698, 30.837793],
		'天津': [117.2, 39.13],
		'富阳': [119.95, 30.07],
		'泰安': [117.13, 36.18],
		'诸暨': [120.23, 29.71],
		'郑州': [113.65, 34.76],
		'哈尔滨': [126.63, 45.75],
		'聊城': [115.97, 36.45],
		'芜湖': [118.38, 31.33],
		'唐山': [118.02, 39.63],
		'平顶山': [113.29, 33.75],
		'邢台': [114.48, 37.05],
		'德州': [116.29, 37.45],
		'济宁': [116.59, 35.38],
		'荆州': [112.239741, 30.335165],
		'宜昌': [111.3, 30.7],
		'义乌': [120.06, 29.32],
		'丽水': [119.92, 28.45],
		'洛阳': [112.44, 34.7],
		'秦皇岛': [119.57, 39.95],
		'株洲': [113.16, 27.83],
		'石家庄': [114.48, 38.03],
		'莱芜': [117.67, 36.19],
		'常德': [111.69, 29.05],
		'保定': [115.48, 38.85],
		'湘潭': [112.91, 27.87],
		'金华': [119.64, 29.12],
		'岳阳': [113.09, 29.37],
		'长沙': [113, 28.21],
		'衢州': [118.88, 28.97],
		'廊坊': [116.7, 39.53],
		'菏泽': [115.480656, 35.23375],
		'合肥': [117.27, 31.86],
		'武汉': [114.31, 30.52],
		'大庆': [125.03, 46.58]
	};
	geoCoordMap2 = {
		'东城区': [116.418757, 39.937544],
		'西城区': [116.366794, 39.910309],
		'朝阳区': [116.486409, 39.991489],
		'丰台区': [116.286968, 39.863642],
		'石景山区': [116.170445, 39.974601],
		'海淀区': [116.280316, 40.039074],
		'门头沟区': [115.905381, 40.009183],
		'房山区': [115.701157, 39.735535],
		'通州区': [116.758603, 39.802486],
		'顺义区': [116.753525, 40.128936],
		'昌平区': [116.235906, 40.318085],
		'大兴区': [116.338033, 39.658908],
		'怀柔区': [116.607122, 40.524272],
		'平谷区': [117.112335, 40.244783],
		'密云区': [116.943352, 40.477362],
		'延庆区': [115.985006, 40.465325]
	};
	rawData2 = [
		['东城区', 10, 20, 30],
		['西城区', 10, 20, 30],
		['朝阳区', 10, 20, 30],
		['丰台区', 10, 20, 30],
		['石景山区', 10, 20, 30],
		['海淀区', 10, 20, 30],
		['门头沟区', 10, 20, 30],
		['房山区', 10, 20, 30],
		['通州区', 10, 20, 30],
		['顺义区', 10, 20, 30],
		['昌平区', 10, 20, 30],
		['大兴区', 10, 20, 30],
		['怀柔区', 10, 20, 30],
		['平谷区', 10, 20, 30],
		['密云区', 10, 20, 30],
		['延庆区', 10, 20, 30]
	];
	overlay2: any;

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

	/**
	 * 天地图地图加载完成
	 * @param $event
	 */
	onMapReady($event: ENgxEsriMapComponent) {
		this.mapComponent = $event;
		this.map = this.mapComponent.map;
		this.mapComponent.loadEsriModules(['extras/Echarts3Layer', 'extras/ClusterLayer', 'esri/renderers/ClassBreaksRenderer']).then(([Echarts3Layer, ClusterLayer, ClassBreaksRenderer]) => {
			this.Echarts3Layer = Echarts3Layer;
			this.ClusterLayer = ClusterLayer;
			this.ClassBreaksRenderer = ClassBreaksRenderer;
			this.echarts3LayerDemo2();
			this.clusterLayerDemo();
		});
	}

	/**
	 * echarts 扩展图层（Echarts3Layer）- 散点图示例
	 */
	echarts3LayerDemo1() {
		const overlay = new this.Echarts3Layer(this.map, echarts);
		const chartsContainer = overlay.getEchartsContainer();
		const myChart = overlay.initECharts(chartsContainer);
		const option = {
			title: {
				text: 'ArcGIS扩展Echarts3之全国主要城市空气质量',
				subtext: 'Data from PM25.in,Develop By WanderGIS',
				sublink: 'https://github.com/wandergis/arcgis-echarts3',
				left: 'center',
				textStyle: {
					color: '#fff'
				}
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				y: 'bottom',
				x: 'right',
				data: ['pm2.5', 'Top 5'],
				textStyle: {
					color: '#fff'
				}
			},
			geo: {
				map: '',
				roam: true
			},
			series: [
				{
					name: 'pm2.5',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: this.convertData(this.data),
					symbolSize: function (val) {
						return val[2] / 10;
					},
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: false
						},
						emphasis: {
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#ddb926'
						}
					}
				},
				{
					name: 'Top 5',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: this.convertData(this.data.sort(function (a, b) {
						return b.value - a.value;
					}).slice(0, 6)),
					symbolSize: function (val) {
						return val[2] / 10;
					},
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#f4e925',
							shadowBlur: 10,
							shadowColor: '#333'
						}
					},
					zlevel: 1
				}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		overlay.setOption(option);
	}

	convertData(d) {
		const res = [];
		for (let i = 0; i < d.length; i++) {
			const geoCoord = this.geoCoordMap[d[i].name];
			if (geoCoord) {
				res.push({
					name: d[i].name,
					value: geoCoord.concat(d[i].value)
				});
			}
		}
		return res;
	};

	echarts3LayerDemo2() {
		this.overlay2 = new this.Echarts3Layer(this.map, echarts);
		const chartsContainer2 = this.overlay2.getEchartsContainer();
		const myChart2 = this.overlay2.initECharts(chartsContainer2);
		const option2 = {
			animation: false,
			tooltip: {
				trigger: 'axis'
			},
			geo: {
				map: '',
				roam: true
			},
			series: []
		};
		setTimeout(this.renderEachCity.bind(this));
		const throttledRenderEachCity = this.throttle(this.renderEachCity.bind(this), 0, null);
		this.map.on('extent-change', throttledRenderEachCity);

		// 使用刚指定的配置项和数据显示图表。
		this.overlay2.setOption(option2);
	}

	/**
	 * 缩放和拖拽
	 * @param fn
	 * @param delay
	 * @param debounce
	 * @returns {() => void}
	 */
	throttle(fn, delay, debounce) {
		let currCall;
		let lastCall = 0;
		let lastExec = 0;
		let timer = null;
		let diff;
		let scope;
		let args;
		delay = delay || 0;

		function exec() {
			lastExec = (new Date()).getTime();
			timer = null;
			fn.apply(scope, args || []);
		}

		const cb = function () {
			currCall = (new Date()).getTime();
			scope = this;
			args = arguments;
			diff = currCall - (debounce ? lastCall : lastExec) - delay;
			clearTimeout(timer);
			if (debounce) {
				timer = setTimeout(exec, delay);
			} else {
				if (diff >= 0) {
					exec();
				} else {
					timer = setTimeout(exec, -diff);
				}
			}
			lastCall = currCall;
		};
		return cb;
	}

	renderEachCity() {
		const option3: any = {
			xAxis: [],
			yAxis: [],
			grid: [],
			series: []
		};
		this.rawData2.forEach((dataItem, index) => {
			const geoCoord = this.geoCoordMap2[dataItem[0]];
			const screenPoint = this.map.toScreen(new this.mapComponent.Point(geoCoord[0], geoCoord[1], this.map.spatialReference));
			const coord = [screenPoint.x, screenPoint.y];
			const inflationData = [30, 50, 20];
			const idx: string = index + '';
			option3.xAxis.push({
				id: idx,
				gridId: idx,
				type: 'category',
				name: dataItem[0],
				nameLocation: 'middle',
				nameGap: 3,
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
						color: '#fcfcfc'
					}
				},
				// data: xAxisCategory,
				data: ['数据A', '数据B', '数据C'],
				z: 100

			});
			option3.yAxis.push({
				id: idx,
				gridId: idx,
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
					show: false,
					lineStyle: {
						color: '#1C70B6'
					}
				},
				z: 100
			});
			option3.grid.push({
				id: idx,
				width: 40,
				height: 50,
				left: coord[0] - 15,
				top: coord[1] - 15,
				z: 100
			});
			option3.series.push({
				id: idx,
				type: 'bar',
				xAxisId: idx,
				yAxisId: idx,
				barGap: 0,
				barCategoryGap: 0,
				data: inflationData,
				z: 100,
				itemStyle: {
					normal: {
						color: (params) => {
							// 柱状图每根柱子颜色
							const colorList = ['#F75D5D', '#59ED4F', '#4C91E7'];
							return colorList[params.dataIndex];
						}
					}
				}
			});
		});
		this.overlay2.setOption(option3);
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
