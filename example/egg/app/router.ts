import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 中间件
  const jssdk = app.middleware.jssdk(app)
  // const qyjssdk = app.middleware.qyjssdk(app)
  // const openjssdk = app.middleware.openjssdk(app)

  router.get('/', controller.home.index)
  // 服务器配置校验
  router.get('/msg', controller.wxmp.mpmsg.get)

  /**
   * TODO: 重点关注以下两个方法的实现
   * 其他暂时用不到的我先注释了
   */

  // jssdk 
  router.get('/jssdk', jssdk, controller.wxmp.jssdk.index)
  // 微信网页授权
  router.get('/wxmpauth', controller.wxmp.wxmpapi.getAuthLink)

  // router.get('/pay', controller.home.pay)
  // router.get('/mysql', controller.home.mysql)
  // router.get('/npm', controller.home.npm)
  // router.post('/msg', controller.wxmp.mpmsg.post)
  // router.get('/qymsg', controller.wxcp.qymsg.get)
  // router.post('/qymsg', controller.wxcp.qymsg.post)
  // router.get('/qyjssdk', qyjssdk, controller.wxcp.qyjssdk.index)
  // router.get('/qyapi/creatMenu', controller.wxcp.qyapi.creatMenu)
  // router.get('/qyapi/appChat', controller.wxcp.qyapi.appChat)
  // router.get('/wxpay', controller.wxpay.index)
  // router.get('/opencpapi', controller.opencp.opencpapi.index)
  // router.post('/mp/event/:appId', controller.openmp.openmpmsg.openMpEvent)
  // router.post('/mp/event', controller.openmp.openmpmsg.openMpEvent)
  // router.get('/openmpapi', controller.openmp.openmpapi.api)
  // router.get('/openmpauth', controller.openmp.openmpapi.authRedirect)
  // router.get('/openmpjssdk', openjssdk, controller.openmp.openmpapi.jssdk)
}
