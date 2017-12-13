/**
 * Created by laixiangran on 2016/11/29.
 * homepage：http://www.laixiangran.cn.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENgxEsriMapComponent } from './e-ngx-esrimap.component';
import { ENgxEsriMapLoaderService } from './e-ngx-esrimap-loader.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ENgxEsriMapComponent
	],
	exports: [
		ENgxEsriMapComponent
	],
	providers: [ENgxEsriMapLoaderService]
})
export class ENgxEsriMapModule {
}
