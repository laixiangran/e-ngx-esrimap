# essence-ng2-esrimap

essence-ng2-esrimap is a esrimap component for Angular..

## Usage

1. Install

	```shell
	npm install --save essence-ng2-esrimap@latest
	```
	
2. 在index.html引入font-awesome

	```html
	<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	```

3. Add the EssenceNg2CalendarModule

	```typescript
	import {EssenceNg2EsriMapModule} from "essence-ng2-esrimap";
	@NgModule({
	    imports: [
	        EssenceNg2EsriMapModule
	    ]
	})
	```

4. Use in the template

	```html
	<essence-ng2-esrimap
		(mapReady)="onMapReady($event)"
		(exentChange)="onExentChange($event)"
		[mapType]="'tdt'"
		[mapUrl]="['vec_c', 'cva_c']"
		[initExtent]="initExtent">
	</essence-ng2-esrimap>
	```

5. Use in the component

	```typescript
	esriMapComponent: EssenceNg2EsriMapComponent;

    initExtent: any = {
        xmax: 116.75667048654691,
        xmin: 115.97389460764066,
        ymax: 40.12732707113387,
        ymin: 39.71533976644637
    };

    onMapReady ($event: EssenceNg2EsriMapComponent) {
        this.esriMapComponent = $event;
        this.esriMapComponent.loadEsriModules(["esri/symbols/SimpleMarkerSymbol"])
            .then(([SimpleMarkerSymbol]) => {
            
                this.SimpleMarkerSymbol = SimpleMarkerSymbol;
        });
    }
    
    onExentChange (event: any) {
        console.log(event);
    }
	```

## API

### Inputs

- `mapType`（`string?='tdt'`） - 基础底图类型，`tdt`：天地图，`esri`：esri地图服务

- `mapUrl`（`string[] | string`） - 基础底图路径

- `initExtent`（`Object`） - 初始地图范围，`{xmax, xmin, ymax, ymin}`

### Outputs

- `mapReady`：地图初始化完成后会触发该事件，参数$event为当前component实例对象

- `exentChange`：地图范围改变触发该事件，参数$event为当前地图范围对象

### Properties

- `map`（`any`） - 当前地图对象

### Methods

- `loadEsriModules (modules: string[]): Promise<any>` - 加载ArcGIS API for JavaScript的模块，如：`['esri/map']`

## Develop

	```shell
	npm install // 安装依赖包
	
	npm start // 启动项目
	```

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
