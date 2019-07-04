import config from '../../vue.config'

const baseUrl = config.devServer.proxy["/api"].target + '/zhidan'

const ypxxApi = {
    queryYpxx : baseUrl + '/ypxx/queryYpxxList',
    addOrUpadteYpxx : baseUrl + '/ypxx/addOrUpadteYpxx' ,
    deleteYpxx: baseUrl + '/ypxx/deleteYpxx',
    queryYpxxByBianMa: baseUrl + '/ypxx/queryYpxxByBianMa',
    uploadExcel : baseUrl + '/ypxx/uploadExcel',
    downloadExcel:baseUrl +'/ypxx/downloadExcel'    
}

export function getUrl() {
    return ypxxApi
}


