/**
 * Created by laixiangran on 2016/11/29.
 * homepage：http://www.laixiangran.cn.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EssenceNg2EsriMapComponent} from "./essence-ng2-esrimap.component";
import {EssenceNg2EsriMapService} from "./essence-ng2-esrimap.service";
import {EsriLoaderService} from "angular2-esri-loader";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        EssenceNg2EsriMapComponent
    ],
    exports: [
        EssenceNg2EsriMapComponent
    ],
	providers: [
		EssenceNg2EsriMapService,
		EsriLoaderService
	]
})
export class EssenceNg2EsriMapModule {
}
