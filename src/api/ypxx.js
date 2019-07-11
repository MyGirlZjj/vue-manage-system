// import config from '../../vue.config'

// const baseUrl = config.devServer.proxy["/api"].target + '/zhidan'

const ypxxApi = {
    queryYpxx : '/zhidan/ypxx/queryYpxxList',
    addOrUpadteYpxx : '/zhidan/ypxx/addOrUpadteYpxx' ,
    deleteYpxx: '/zhidan/ypxx/deleteYpxx',
    queryYpxxByBianMa: '/zhidan/ypxx/queryYpxxByBianMa',
    uploadExcel : '/zhidan/ypxx/uploadExcel',
    getExcelFile:'/zhidan/ypxx/getExcelFile',  
    downloadExcel:'/zhidan/ypxx/downloadExcel'    
}

export function getUrl() {
    return ypxxApi
}


