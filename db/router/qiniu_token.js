import qiniu from "qiniu";
import conf from "../../config/qiniu.conf";

var options = {
    scope: conf.Bucket,
    deleteAfterDays: 1,
    returnBody:
        '{"key":"$(key)","hash":"$(etag)","mimeType":$(mimeType),"fsize":$(fsize),"bucket":"$(bucket)","fname":"$(fname)"}'
}

var putPolicy = new qiniu.rs.PutPolicy(options);
var mac = new qiniu.auth.digest.Mac(conf.AccessKey, conf.SecretKey);
var config2 = new qiniu.conf.Config();
// 这里主要是为了用 node sdk 的 form 直传，结合 demo 中 form 方式来实现无刷新上传
config2.zone = qiniu.zone.Zone_z1;

export default function() {
    const qiniutoken = async (ctx, next) => {
        var token = putPolicy.uploadToken(mac);
        if (token) {
            ctx.body = { uptoken: token, domain: conf.Domain, code: 1 };
        } else {
            ctx.body = { uptoken: "", domain: conf.Domain, code: -1 };
        }
    };

    return { qiniutoken };
}
