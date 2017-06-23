import { Component } from '@angular/core';
import { EssenceNg2EsriMapComponent } from "../../src/essence-ng2-esrimap.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    esriMap: EssenceNg2EsriMapComponent;
    mapUrl: string = 'http://192.168.0.109:8399/arcgis/rest/services/HD_BASEMAP/MapServer';
    geoUrl: string = 'http://192.168.0.109:8399/arcgis/rest/services/Geometry/GeometryServer';
    gisApiUrl: string = 'http://192.168.0.109/arcgis_api/3.14/init.js';

    constructor() {
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
        console.log(event);
    }
}
