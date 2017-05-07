import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {EssenceNg2EsriMapModule} from "../../src/essence-ng2-esrimap.module";

@NgModule({
    imports: [
        BrowserModule,
		EssenceNg2EsriMapModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
