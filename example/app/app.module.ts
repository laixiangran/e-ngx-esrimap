import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EssenceNg2EsriMapModule } from '../../src/essence-ng2-esrimap.module';
import { HttpModule } from '@angular/http';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		EssenceNg2EsriMapModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
