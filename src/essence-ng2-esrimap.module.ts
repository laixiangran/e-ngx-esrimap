/**
 * Created by laixiangran on 2016/11/29.
 * homepage：http://www.laixiangran.cn.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EssenceNg2EsriMapComponent } from './essence-ng2-esrimap.component';
import { EsriLoaderModule } from 'angular-esri-loader';

@NgModule({
	imports: [
		CommonModule,
		EsriLoaderModule
	],
	declarations: [
		EssenceNg2EsriMapComponent
	],
	exports: [
		EssenceNg2EsriMapComponent
	]
})
export class EssenceNg2EsriMapModule {
}
