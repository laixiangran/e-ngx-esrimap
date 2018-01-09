# e-ngx-esrimap

基于Angular的二维地图组件，使用的地图API是ArcGIS API for JavaScript v3.x（>=3.14）。

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
            [gisApiUrl]="gisApiUrl"
            [geoUrl]="geoUrl"
            [esriCSSUrl]="esriCSSUrl"
            (mapReady)="onMapReady($event)">
    </e-ngx-esrimap>
    <h2>天地图地图服务</h2>
    <e-ngx-esrimap
            [mapType]="'tdt'"
            [mapUrl]="['vec','cva']"
            [initExtent]="{xmax: 116.456, xmin: 116.123, ymax: 40.014256, ymin: 39.898562}"
            (mapReady)="onMapReady($event)">
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

### 注意

如果出现跨域的问题，请检查项目根目录下是否存在`proxy.config`及`proxy.jsp`，没有请放置。

## API

### Inputs

- `isProxy`（`boolean?=false`） - 是否开启代理，可使用esri提供的[几个平台的代理文件](https://github.com/Esri/resource-proxy)

- `proxyUrl`（`string?='proxy.jsp'`） - 代理页面的路径

- `mapUrl`（`string[] | string='http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer'`） - 基础底图路径，如`mapType='tdt'`，则mapUrl可从这四种地图类型`vec（矢量图层）, cva（矢量标注）, img（影像图层）, cia（影像标注）`通过数组形式组合使用。mapType='esri'，则mapUrl是完整的ArcGIS切片地图服务路径

- `mapType`（`string?='esri'`） - 基础底图类型，`tdt`：天地图，`esri`：esri地图服务

- `geoUrl`（`string?='http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer'`） - 几何服务路径，默认是在线路径，最好配置自己的路径

- `gisApiUrl`（`string?='http://js.arcgis.com/3.23/'`） - arcgis javascript API路径，默认是在线路径，最好配置自己的路径

- `esriCSSUrl`（`string?='http://js.arcgis.com/3.23/esri/css/esri.css'`） - esri.css路径，默认是在线路径，最好配置自己的路径

- `initExtent`（`Object`） - 初始地图范围，`{xmax, xmin, ymax, ymin}`

### Outputs

- `mapReady`：地图初始化完成后会触发该事件，参数$event为当前component实例对象

- `exentChange`：地图范围改变触发该事件，参数$event为当前地图范围对象

### Properties

- `map`（`any`） - 当前地图对象

### Instance Methods

- `loadEsriModules(modules: string[]): Promise<any>` - 加载ArcGIS API for JavaScript的模块，如：`['esri/map']`

- `gpAsyncGetResultData(params: AsyncGetResultParam): void` - GP服务获取数据（异步）

- `gpAsyncGetResultImageLayer(params: AsyncGetResultParam): void` - GP服务获取结果图片图层（异步）

- `locationPoint(point: {x: number, y: number}): void` - 点定位

- `clearLocationLayer(): void` - 清除定位图层

- `showMapInfoWindow(params: any): void` - 显示地图信息窗口

         * params属性如下：
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
