import { Controller } from 'egg'
import { SnsAccessTokenApi, ScopeEnum, Lang } from 'tnwx'

export default class WxMpApiController extends Controller {
  /**
   * 判断是否有code
   * 无 根据appId拼接授权链接
   * 有 根据code获取用户基本信息 渲染用户信息页面
   */
  public async getAuthLink() {
    let { ctx } = this
    let appId: string = ctx.app.config.devApiConfig.appId
    let token: string = ctx.app.config.devApiConfig.token
    const req = ctx.request
    const { code } = ctx.query
    ctx.app.logger.info(`code:${code}`)
    if (code) {
      let userinfo = {}
      const accessTokenResult = await SnsAccessTokenApi.getSnsAccessToken(code.toString())
       // access_token 获取失败
      if (accessTokenResult.errcode) {
        ctx.app.logger.error(`accessTokenResult:${accessTokenResult}`)
        return
      }
      userinfo = accessTokenResult
      const { access_token, openid, scope } = accessTokenResult

      if (scope == ScopeEnum.SNSAPI_USERINFO) {
        const userInfoResult = await SnsAccessTokenApi.getUserInfo(access_token, openid, Lang.ZH_CN)
        // 用户信息获取失败
        if (userInfoResult.errcode) {
          ctx.app.logger.error(`userInfoResult:${userInfoResult}`)
          return
        }
        userinfo = userInfoResult
      }
      console.log('userinfo :>> ', userinfo);
      await ctx.render('userinfo', userinfo)
    } else {
      let redirectUrl: string = req.protocol
          .concat('://')
          .concat(req.host)
          .replace(':80', '')
          .concat(req.url)
      const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&state=${token}`
      await ctx.render('wxmp', {
        authUrl
      })
    }
    
  }
}
