import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ENgxEsriMapModule } from '../../src/e-ngx-esrimap.module';

@NgModule({
	imports: [
		BrowserModule,
		ENgxEsriMapModule,
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
