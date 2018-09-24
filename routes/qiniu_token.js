var qiniu = require('qiniu')
var path = require('path')

var fs = require('fs')
var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'qiniu_config.json')))

// console.log('config_', config)

var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey)
var config2 = new qiniu.conf.Config()
// 这里主要是为了用 node sdk 的 form 直传，结合 demo 中 form 方式来实现无刷新上传
config2.zone = qiniu.zone.Zone_z1
var options = {
  scope: config.Bucket,
  deleteAfterDays: 1,
  returnBody:
    '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
}

var putPolicy = new qiniu.rs.PutPolicy(options)

export default function(Router) {
  const router = new Router({
    prefix: '/api'
  })

  router.get('/uptoken', async (ctx, next) => {
    var token = putPolicy.uploadToken(mac)
    // console.log('token:  ', token)

    if (token) {
      ctx.body = { uptoken: token, domain: config.Domain,code:1 }
    } else {
      ctx.body = { uptoken:'', domain: config.Domain,code:-1 }
    }
  })

  return router.routes()
}
