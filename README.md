# e-ngx-esrimap

基于 Angular 的二维地图组件，使用的地图 API 是 ArcGIS API for JavaScript v3.x（>=3.14）。

## Usage

1. Install

	```shell
	npm install --save e-ngx-esrimap@latest
	```

2. Set in the .angular-cli.json（@angular/cli）

	```json
    "styles": [
        "../node_modules/font-awesome/css/font-awesome.min.css"
    ]
	```

3. Add the ENgxEsriMapModule

	```typescript
	import {ENgxEsriMapModule} from "e-ngx-esrimap";
	@NgModule({
	    imports: [
	        ENgXEsriMapModule
	    ]
	})
	```

4. Use in the template

	```html
    <h2>ArcGIS地图服务</h2>
    <e-ngx-esrimap
        [isProxy]="false"
        [mapUrl]="mapUrl"
        [submapUrl]="[mapUrl, mapUrl]"
        [enableNavigation]="false"
        [gisApiUrl]="gisApiUrl"
        [geoUrl]="geoUrl"
        [esriCSSUrl]="esriCSSUrl"
        [initExtent]="{xmax: 116.39029888900006, xmin: 116.04209077900009, ymax: 40.161018230000025, ymin: 39.885287565000056}"
        (mapReady)="onEsriMapReady($event)">
    </e-ngx-esrimap>
    <h2>天地图地图服务</h2>
    <e-ngx-esrimap
            [mapType]="'tdt'"
            [mapUrl]="['vec','cva']"
            [submapUrl]="[['img','cia'], ['ter','cta']]"
            [gisApiUrl]="gisApiUrl"
            [geoUrl]="geoUrl"
            [esriCSSUrl]="esriCSSUrl"
            [initExtent]="{xmax: 116.39029888900006, xmin: 116.04209077900009, ymax: 40.161018230000025, ymin: 39.885287565000056}"
            (mapReady)="onTdtMapReady($event)">
    </e-ngx-esrimap>
	```

5. Use in the component

	```typescript
    esriMap: ENgxEsriMapComponent;
    map: any;
    mapUrl: string = 'http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer';
    geoUrl: string = 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer';
    gisApiUrl: string = 'http://js.arcgis.com/3.23/';
    esriCSSUrl: string = 'http://js.arcgis.com/3.23/esri/css/esri.css';

    onMapReady($event: ENgxEsriMapComponent) {
        this.esriMap = $event;
        this.map = this.esriMap.map;
    }
	```

## API

### Inputs

- `isProxy`（`boolean?=false`） - 是否开启代理，可使用 esri 提供的[几个平台的代理文件](https://github.com/Esri/resource-proxy)

- `proxyUrl`（`string?='proxy.jsp'`） - 代理页面的路径。如果出现跨域的问题，请检查是否正确设置代理路径

- `mapUrl`（`string[] | string='http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer'`） - 基础底图路径，如 `mapType='tdt'`，则 mapUrl 可从这四种地图类型 `vec（矢量图层）, cva（矢量标注）, img（影像图层）, cia（影像标注）` 通过数组形式组合使用。mapType='esri'，则 mapUrl 是完整的 ArcGIS 切片地图服务路径

- `submapUrl`（`any[]`）- 其它切换的底图路径，如 `mapType='tdt'`，则 submapUrl 可从这四种地图类型 `vec（矢量图层）, cva（矢量标注）, img（影像图层）, cia（影像标注）` 通过数组形式组合使用。mapType='esri'，则 submapUrl 是完整的 ArcGIS 切片地图服务路径的数组

- `mapType`（`string?='esri'`） - 基础底图类型，`tdt`：天地图，`esri`：esri 地图服务

- `geoUrl`（`string?='http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer'`） - 几何服务路径，默认是在线路径，最好配置自己的路径

- `gisApiUrl`（`string?='http://js.arcgis.com/3.23/'`） - arcgis javascript API 路径，默认是在线路径，最好配置自己的路径

- `esriCSSUrl`（`string?='http://js.arcgis.com/3.23/esri/css/esri.css'`） - esri.css 路径，默认是在线路径，最好配置自己的路径

- `initExtent`（`Object`） - 初始地图范围，`{xmax, xmin, ymax, ymin}`

- `enableNavigation`（`boolean?=true`） - 是否启用导航部件

### Outputs

- `mapReady`：地图初始化事件，参数 $event 为当前 component 实例对象

- `exentChange`：地图范围改变事件，参数 $event 为当前地图范围对象

- `mapDestroy`：地图销毁事件

- `baseLayerChange`：底图切换事件，参数 $event 格式为 {prev: number, curr: number}，prev 为切换之前底图序号，curr 为当前底图序号

### Properties

- `map`（`any`） - 当前地图对象

### Instance Methods

- `changeBaseLayer (layerIndex: number): void` - 底图切换，index 是所有待切换底图的序号。mapUrl 对应序号为 0，其它图层序号根据 submapUrl 的数组序号加 1 得到

- `loadEsriModules(modules: string[]): Promise<any>` - 加载 ArcGIS API for JavaScript 的模块，如：`['esri/map']`

- `gpAsyncGetResultData(params: AsyncGetResultParam): void` - GP 服务获取数据（异步）

- `gpAsyncGetResultImageLayer(params: AsyncGetResultParam): void` - GP 服务获取结果图片图层（异步）

- `locationPoint(point: {x: number, y: number}): void` - 点定位

- `clearLocationLayer(): void` - 清除定位图层

- `showMapInfoWindow(params: any): void` - 显示地图信息窗口

         * params 属性如下：
         * title {String} 信息窗口标题
         * content {String} 信息窗口内容，支持html
         * location {Point} 信息窗口位置
         * placement {String} 信息窗口方位
         * width {Number} 信息窗口宽度
         * height {Number} 信息窗口高度

- `hideMapInfoWindow(): void` - 隐藏地图信息窗口

- `exactProject(fs: any, wkid: any): Observable<any>` - 要素坐标转换

- `latToDec(dfm: string): number` - 将坐标由度分秒表示转为十进制表示

- `decToLat(sjz: number): string` - 将坐标由十进制表示转为度分秒表示

## Develop

	```shell
	npm install // 安装依赖包
	
	npm start // 启动项目
	```

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
