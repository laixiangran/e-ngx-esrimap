/**
 * Created by laixiangran on 2017/4/5.
 * homepage：http://www.laixiangran.cn.
 * 开发环境配置
 */

export const environment = {
	production: false, // 是否是生产环境，true为生产环境
	serverHost: '/', // 请求主路径
	mapUrl: 'http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer', // 底图路径
	geoUrl: 'https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer', // 几何服务路径
	gisApiUrl: 'http://192.168.0.8/arcgis_api/3.x/init.js', // arcgis javascript API路径
	esriCSSUrl: 'http://192.168.0.8/arcgis_api/3.x/esri/css/esri.css' // esri.css路径
};
