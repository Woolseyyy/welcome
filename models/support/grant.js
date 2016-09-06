/**
 * Created by admin on 2016/7/20.
 */
var modelIDs = require('../db/modelid');

module.exports = {
    grantUser: function(req,res,next){
        if(req.session.user){
            next();
        }
        else{
            res.json({
                code: 403,
                msg: '未登录！',
                body:{}
            });
        }
    },
    grantOrg: function(req,res,next){
        if(req.session.org){
            next();
        }
        else{
            res.json({
                code: 403,
                msg: '未登录！',
                body:{}
            });
        }
    },
    //跨域请求 cors
    cors: function(req, res, next){
        res.header("Access-Control-Allow-Origin", "114.215.144.43:80");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
        else  next();
    }
}