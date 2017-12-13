import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ENgxEsriMapModule } from '../../src/e-ngx-esrimap.module';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		ENgxEsriMapModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
