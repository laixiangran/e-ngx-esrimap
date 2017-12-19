/**
 * Created by laixiangran on 2017/4/5.
 * homepage：http://www.laixiangran.cn.
 * 开发环境配置
 */

export const environment = {
	production: false, // 是否是生产环境，true为生产环境
	serverHost: '/', // 请求主路径
	mapUrl: 'http://192.168.0.181:6080/arcgis/rest/services/HD_BASEMAP/MapServer', // 底图路径
	geoUrl: 'http://192.168.0.181:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer', // 几何服务路径
	gisApiUrl: 'http://192.168.0.8/arcgis_api/3.x/init.js', // arcgis javascript API路径
	esriCSSUrl: 'http://192.168.0.8/arcgis_api/3.x/esri/css/esri.css' // esri.css路径
};
