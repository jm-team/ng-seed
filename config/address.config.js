/**
 * @title address.config
 * @desc 配置依赖服务器地址
 * @type {{SERVER_ADDRESS: string, CENTER_ADDRESS: string, USERCENTER_ADDRESS: string, CDN_ADDRESS: string}}
 */

module.exports = {
    // api服务器
    SERVER_ADDRESS: "http://webapi.jm.com/",
    // 会员中心
    CENTER_ADDRESS: "http://lg-center.jm.com/",
    // 单点认证中心
    USERCENTER_ADDRESS: "http://uc3.dev.com",
    // CDN服务器
    CDN_ADDRESS: "", //http://static-dev.jyt.com
    // 图片服务器
    IMG_ADDRESS: "http://image.jm.com",
    //
    UPLOAD_ADDRESS:"http://image5.jm.com"
};
