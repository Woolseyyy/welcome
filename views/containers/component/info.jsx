var React = require('react');
var Component = React.Component;

module.exports = React.createClass({

    render: function(){
        return(
            <div>
                <div className="dank-slider">
                    <div>
                        <big className="dank-slider-active"><i className="fa fa-user" aria-hidden="true"></i><b> 个人信息</b></big>
                    </div>
                    <div>
                        <a href="#"><i className="fa fa-file-text" aria-hidden="true"></i><b> 我的报名</b></a>
                    </div>
                </div>
                <div className="dank-slider-right">
                    <InfoBox/>
                </div>
            </div>
        )
    }
});

var InfoBox = React.createClass({
    getInitialState: function(){
        //console.log("ok");
        return {
            data:{
                _id :"",
                username:"",
                baseinfo: {
                    address: "",
                    birth: "",
                    email: "",
                    name: "",
                    nation: "",
                    origin: "",
                    politicalStatus: "",
                    qq: "",
                    schoolID: "",
                    sex: "",
                    telnumber: "",
                    telshort: "",
                    major:""
                }
            }
        }
    },
    componentDidMount: function(){
        console.log('abc');
        $.ajax({
            url: "/user/profile",
            contentType: 'application/json',
            type: 'GET',
            success: function(data) {
                console.log(data.code);
                switch(data.code){
                    case 0:
                        if(this.isMounted()){
                            console.log(data.body.user);
                            this.setState({data:data.body.user});
                            console.log(this.state.data);
                        }
                        break;
                    default:
                        alert(msg);
                        //this.setState({data:empty});
                        break;
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("ajax请求发起失败");
            }.bind(this)
        });
    },
    render : function(){
        /*console.log(this.state.data);
        var data = this.state.data;
        var baseinfo = data.baseinfo;*/

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 c4">
                        <div className="container-fluid">
                            <div className="d2">
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-1 text-left">
                                        <div className="btn-group btn-group-lg d3">
                                            <a className="btn a5" href="/#/person/info/change"><b className="b1">修改</b></a>
                                            <a className="btn a6" href="#"href="#"><b className="b1">从教务网导入</b></a>
                                        </div>
                                    </div>
                                    <div className="col-md-1 col-md-offset-1 text-right">
                                        <img src="img/label.png" className="i1"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-9 c4">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="t1">
                                                        <tbody>
                                                        <tr>
                                                            <td className="td-title">用户名</td>
                                                            <td className="td-content">{this.state.data.username}</td>
                                                            <td className="td-title"></td>
                                                            <td className="td-content"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-title">微信号</td>
                                                            <td className="td-content"><a href="#">未绑定</a></td>
                                                            <td className="td-title"></td>
                                                            <td className="td-content"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-title">密码</td>
                                                            <td className="td-content"><a href="#">修改</a></td>
                                                            <td className="td-title"></td>
                                                            <td className="td-content"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="t1">
                                                        <tbody>
                                                        <tr>
                                                            <td className="td-title">姓名</td>
                                                            <td className="td-content">{this.state.data.baseinfo.name}</td>
                                                            <td className="td-title">性别</td>
                                                            <td className="td-content">{this.state.data.baseinfo.sex}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-title">籍贯</td>
                                                            <td className="td-content">{this.state.data.baseinfo.origin}</td>
                                                            <td className="td-title">民族</td>
                                                            <td className="td-content">{this.state.data.baseinfo.nation}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-title">学号</td>
                                                            <td className="td-content">{this.state.data.baseinfo.schoolID}</td>
                                                            <td className="td-title">政治面貌</td>
                                                            <td className="td-content">{this.state.data.baseinfo.politicalStatus}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-title">手机长号</td>
                                                            <td className="td-content">{this.state.data.baseinfo.telnumber}</td>
                                                            <td className="td-title">手机短号</td>
                                                            <td className="td-content">{this.state.data.baseinfo.telshort}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-title">邮箱</td>
                                                            <td className="td-content">{this.state.data.baseinfo.email}</td>
                                                            <td className="td-title">QQ</td>
                                                            <td className="td-content">{this.state.data.baseinfo.qq}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-title">专业</td>
                                                            <td className="td-content">{this.state.data.baseinfo.major}</td>
                                                            <td className="td-title">寝室地址</td>
                                                            <td className="td-content">{this.state.data.baseinfo.address}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-title">生日</td>
                                                            <td className="td-content">{this.state.data.baseinfo.birth}</td>
                                                            <td className="td-title"></td>
                                                            <td className="td-content"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-center c4">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <img src="img/male.png" className="i2"/>
                                            </div>
                                            <div className="row">
                                                <a className="a7" href="#"><b>修改头像</b></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
