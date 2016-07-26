/**
 * Created by admin on 2016/7/25.
 */
var React = require('react');
var Component = React.Component;

module.exports = React.createClass({

    render: function(){
        return(
            <div>
                <div className="dank-slider-org">
                    <div>
                        <big className="dank-slider-active"><i className="fa fa-file-text" aria-hidden="true"></i><b>报名表管理</b></big>
                    </div>
                    <div>
                        <a href="#"><i className="fa fa-commenting" aria-hidden="true"></i><b> 消息通知</b></a>
                    </div>
                    <div>
                        <a href="#"><i className="fa fa-trash" aria-hidden="true"></i><b> 回收站</b></a>
                    </div>
                </div>
                <div className="dank-slider-right">
                    <content/>
                </div>
            </div>
        )
    }
});

var content = React.createClass({
    render : function(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 c4">
                        <div className="c5">
                            <Event/>
                        </div>
                    </div>
                    <div className="col-md-9 c4">
                       <Form/>
                    </div>
                </div>
            </div>
        )
    }
});

var Event = React.createClass({
    getInitialState: function(){
        return {
            event:[{eventID : '', name : '', ym:''}]
        }
    },
    componentDidMount: function(){
        $.ajax({
            url: "/event",
            contentType: 'application/json',
            type: 'GET',
            success: function(data) {
                switch(data.code){
                    case 0:
                        if(this.isMounted()){
                            this.setState({event:data.body.events});
                        }
                        break;
                    default:
                        alert(msg);
                        break;
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("ajax请求发起失败");
            }.bind(this)
        });
    },
    render: function(){
        var overflow = {
            overflow : "hidden"
        };

        var eventNodes = this.props.event.map(function (eventItem) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <table className="center-block">
                            <tr>
                                <td><div className="text-center">
                                    <div className="d4">
                                        <b>{eventItem.ym}</b>
                                    </div>
                                </div></td>
                                <td><div className="text-left">
                                    <div style={overflow}>
                                        <h1>{eventItem.name}</h1>
                                    </div>
                                </div></td>
                            </tr>
                        </table>
                    </div>
                </div>
            );
        });

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-left">
                        <a className="a11" href="#"><b>纳新事项</b></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-left">
                        <a className="btn a12" href="#"><b>新增事项</b></a>
                    </div>
                </div>
                {eventNodes}
            </div>
        )
   }
});

var Form = React.createClass({
   render:function(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <Graph1/>
                    </div>
                    <div className="col-md-6">
                        <Graph2/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <List/>
                    </div>
                </div>
            </div>
        )
   }
});

var Graph1 = React.createClass({
   render: function(){
       var print = function(){
           var ctx = document.getElementById("myChart3");
           var myChart3 = new Chart(ctx, {
               type: 'line',
               data: {
                   labels: ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.7"],
                   datasets: [
                       {
                           label: "My First dataset",
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: "rgba(75,192,192,0.4)",
                           borderColor: "rgba(75,192,192,1)",
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: "rgba(75,192,192,1)",
                           pointBackgroundColor: "#fff",
                           pointBorderWidth: 2,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: "rgba(75,192,192,1)",
                           pointHoverBorderColor: "rgba(220,220,220,1)",
                           pointHoverBorderWidth: 2,
                           pointRadius: 5,
                           pointHitRadius: 10,
                           data: [10, 8, 5, 17, 20, 3, 25],
                           spanGaps: false,
                       }
                   ]
               },
               options: {
                   title: {
                       display: true,
                       text: '报名人数',
                       position: 'top',
                       fontStyle: 'normal',
                       fontFamily: "'SimHei', 'STXihei', 'Microsoft YaHei', 'Hiragino Sans GB', 'STHeiti Light'",
                       fontSize: 24,
                       padding: 20
                   },
                   legend: {
                       display: false
                   }
               }
           });
       };
       return(
           <div className="c6">
               <table className="t2">
                   <tbody>
                   <tr><td>
                       <canvas id="myChart3" width="300px" height="220px" className="can1"/>
                       {print()}
                   </td></tr>
                   </tbody>
               </table>
           </div>
       )
   }
});

var Graph2 = React.createClass({
    render: function(){
        var print1 = function(){
            var value1 = 400;
            var ctx = document.getElementById("myChart1");
            var myChart1 = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["男", "女"],
                    datasets: [
                        {
                            data: [300, 100],
                            backgroundColor: [
                                "#79dae7",
                                "#ff8d94"
                            ],
                            hoverBackgroundColor: [
                                "#79dae7",
                                "#ff8d94"
                            ]
                        }]
                },
                options: {
                    responsive: false,
                    rotation: -0.5*Math.PI,
                    title: {
                        display: true,
                        text: '总人数:'+value1,
                        position: 'bottom',
                        fontStyle: 'normal',
                        fontFamily: "'SimHei', 'STXihei', 'Microsoft YaHei', 'Hiragino Sans GB', 'STHeiti Light'",
                        fontSize: 22
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        fontFamily: "'SimHei', 'STXihei', 'Microsoft YaHei', 'Hiragino Sans GB', 'STHeiti Light'"
                    }
                }
            });
        };
        var print2 = function(){
            var ctx = document.getElementById("myChart2");
            var myChart2 = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["产品","设计","推广","前端","后端","运营","测试"],
                    datasets: [
                        {
                            data: [25,19,15,15,13,8,5],
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56"
                            ],
                        }]
                },
                options: {
                    responsive: false,
                    rotation: -0.5*Math.PI,
                    title: {
                        display: true,
                        text: '各部门报名人数',
                        position: 'bottom',
                        fontStyle: 'normal',
                        fontFamily: "'SimHei', 'STXihei', 'Microsoft YaHei', 'Hiragino Sans GB', 'STHeiti Light'",
                        fontSize: 20
                    },
                    legend: {
                        display: false,
                        position: 'bottom'
                    }
                }
            });
        };
        return(
            <div className="c6">
                <table className="t3">
                    <tbody>
                    <tr>
                        <td>
                            <canvas id="myChart1" width="150px" height= "200px" className="can2"/>
                            {print1()}
                    </td>
                        <td>
                            <canvas id="myChart2"  width="150px" height= "200px" className="can2"/>
                            {print1()}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
});

var List = React.createClass({
    render: function(){
        return(
            <div className="c7">
                <table className="table">
                    <tbody>
                    <tr>
                        <td><a className="btn a13" href="#"><b>报名表序号 01</b></a></td>
                        <td><a className="btn a14" href="#"><b>导入报名表</b></a></td>
                        <td><a className="btn a14" href="#"><b>导出报名表</b></a></td>
                        <td><a className="btn a15" href="#"><b>全部</b>
                            <table className="center-block t4">
                                <tbody>
                                <tr className="tr1"><td><a href="?"><i className="fa fa-sort-up i3" aria-hidden="true"></i></a></td>
                                </tr>
                                <tr className="tr1"><td><a href="?"><i className="fa fa-sort-down i3" aria-hidden="true"></i></a></td>
                                </tr>
                                </tbody>
                            </table></a></td>
                        <td><a className="btn a16" href="#"><b>排序</b></a></td>
                        <td><a className="btn a17" href="#"><b>时间</b>
                            <table className="center-block t4">
                                <tbody>
                                <tr className="tr1"><td><a href="?"><i className="fa fa-sort-up i3" aria-hidden="true"></i></a></td>
                                </tr>
                                <tr className="tr1"><td><a href="?"><i className="fa fa-sort-down i3" aria-hidden="true"></i></a></td>
                                </tr>
                                </tbody>
                            </table></a></td>
                        <td><a className="btn a18" href="#"><b>赞数</b>
                            <table className="center-block t4">
                                <tbody>
                                <tr className="tr1"><td><a href="?"><i className="fa fa-sort-up i3" aria-hidden="true"></i></a></td>
                                </tr>
                                <tr className="tr1"><td><a href="?"><i className="fa fa-sort-down i3" aria-hidden="true"></i></a></td>
                                </tr>
                                </tbody>
                            </table></a></td>
                    </tr>
                    </tbody>
                </table>
                <hr className="hr1">
                    <b><table className="table t5">
                        <tbody align="center">
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        <tr>
                            <td>吴昊潜</td>
                            <td>男</td>
                            <td>计算机科学与技术</td>
                            <td>产品</td>
                            <td>2016/7/15</td>
                            <td><i className="fa fa-heart i4" aria-hidden="true"></i> 10</td>
                            <td><a className="a19" href="#">删除</a></td>
                        </tr>
                        </tbody>
                    </table></b>
                    <div><b>
                        <a className="a20" href="#">首页</a>
                        <a className="a20" href="#">上一页</a>
                        <a className="a20" href="#">下一页</a>
                        <a className="a20" href="#">尾页</a>
                    </b></div>
                </hr>
            </div>
        )
    }
});