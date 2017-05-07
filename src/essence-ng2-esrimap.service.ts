import {Injectable} from '@angular/core';
import {EsriLoaderService} from 'angular2-esri-loader';

@Injectable()
export class EssenceNg2EsriMapService {

    apiUrl: string = 'http://js.arcgis.com/3.14';

    esriLoader: EsriLoaderService;

    constructor(esriLoader: EsriLoaderService) {
        this.esriLoader = esriLoader;
    }

    loadEsriApi(): any {
        return this.esriLoader.load({url: this.apiUrl})['then'](() => {
            window['esriMapHasLoad'] = true;
        });
    }

    loadEsriModules(modules: string[]): Promise<any> {
        return this.esriLoader.loadModules(modules);
    }
}
