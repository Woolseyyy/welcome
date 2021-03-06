var React = require('react');
var Component = React.Component;

var Output = React.createClass({
    getInitialState: function(){
        return{
            eventID:this.props.params.eventID,
            wish: this.props.params.eventID.wish,
            forms:[],
            getData: false
        }
    },
    componentDidMount: function(){
        $.ajax({
            url: "/form/output",
            contentType: 'application/json',
            type: 'GET',
            data: {
                eventID: this.state.eventID,
                wish: (this.state.wish=='全部部门')?null:this.state.wish
            },
            success: function(data) {
                console.log(data);
                switch(data.code){
                    case 0:
                        if(this.isMounted()){
                            this.setState({forms: data.body.forms, getData:true});
                        }
                        break;
                    default:
                        //alert(this.props.eventID);
                        console.log(data.msg);
                        break;
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("ajax请求发起失败");
            }.bind(this)
        });
    },
    componentDidUpdate: function(){
        if(this.state.getData){
            window.print();
        }
    },
    render: function(){
        var forms = this.state.forms.map(function(form, i){
            return(
                <div className="dank-output-form" key={i}>
                    <div className="dank-output-caption">报名表 NO.{i+1}</div>
                    <div className="dank-output-title">基本信息</div>
                    <table className="dank-output-frame">
                        <tbody>
                        <tr>
                            <td className="dank-output-table-parent">
                                <table className="dank-output-table">
                                    <tbody>
                                    <tr>
                                        <td className="dank-output-baseinfo-label">姓　　名</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.name}</td>
                                        <td className="dank-output-baseinfo-label">性　　别</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.sex}</td>
                                    </tr>
                                    <tr>
                                        <td className="dank-output-baseinfo-label">籍　　贯</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.origin}</td>
                                        <td className="dank-output-baseinfo-label">民　　族</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.nation}</td>
                                    </tr>
                                    <tr>
                                        <td className="dank-output-baseinfo-label">学　　号</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.schoolID}</td>
                                        <td className="dank-output-baseinfo-label">政治面貌</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.politicalStatus}</td>
                                    </tr>
                                    <tr>
                                        <td className="dank-output-baseinfo-label">手机长号</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.telnumber}</td>
                                        <td className="dank-output-baseinfo-label">手机短号</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.telshort}</td>
                                    </tr>
                                    <tr>
                                        <td className="dank-output-baseinfo-label">邮　　箱</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.email}</td>
                                        <td className="dank-output-baseinfo-label">ＱＱ号码</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.qq}</td>
                                    </tr>
                                    <tr>
                                        <td className="dank-output-baseinfo-label">专　　业</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.major}</td>
                                        <td className="dank-output-baseinfo-label">年　　级</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.grade}</td>
                                    </tr>
                                    <tr>
                                        <td className="dank-output-baseinfo-label">寝室地址</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.address}</td>
                                        <td className="dank-output-baseinfo-label">出生日期</td>
                                        <td className="dank-output-baseinfo-info">{form.baseinfo.birth}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="dank-output-baseinfo-photo">
                                <img src={form.baseinfo.img} alt="照片"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {(form.skills.delete&&form.introduction.delete)?
                        null
                        :
                        <div className="dank-output-title">个人介绍</div>
                    }
                    {(form.skills.delete)?
                        null
                        :
                        <div>
                            <div className="dank-output-label">{form.skills.title}</div>
                            <div className="dank-output-content">{new function(){
                                var data = [];
                                for(var skill of form.skills.chosen){
                                    data.push(skill+'　　');
                                }
                                return data
                            }}</div>
                        </div>
                    }
                    {(form.introduction.delete)?
                        null
                        :
                        <div>
                            <div className="dank-output-label">{form.introduction.title}</div>
                            <div className="dank-output-content">{form.introduction.content}</div>
                        </div>
                    }
                    {(form.wish.delete)?
                        null
                        :
                        <div>
                            <div className="dank-output-title">志愿选择</div>
                            <div className="dank-output-label">{form.wish.title}</div>
                            <div className="dank-output-content">{new function(){
                                var data = [];
                                for(var wish of form.wish.chosen){
                                    data.push(wish+'　　');
                                }
                                return data
                            }}</div>
                            {
                                form.wish.chosen.map(function(wish, j){
                                    if(j==0){
                                        return null
                                    }
                                    else{
                                        return(
                                            <div key={j}>
                                                <div className="dank-output-label">希望进入第{j}志愿 {wish} 的原因是</div>
                                                <div className="dank-output-content">{form.reason[j]}</div>
                                            </div>
                                        )
                                    }
                                }.bind(this))
                            }
                        </div>
                    }
                    {(form.others)?
                        <div>
                            <div className="dank-output-title">其他问题</div>
                            {
                                form.others.map(function(other, k){
                                    switch (other.type){
                                        case 'single-text':
                                            return(
                                                <div key={k}>
                                                    <div className="dank-output-label">{other.title}</div>
                                                    <div className="dank-output-content">{other.content}</div>
                                                </div>
                                            );
                                        case 'multi-text':
                                            return(
                                                <div key={k}>
                                                    <div className="dank-output-label">{other.title}</div>
                                                    <div className="dank-output-content">{other.content}</div>
                                                </div>
                                            );
                                        case 'single-choose':
                                            return(
                                                <div key={k}>
                                                    <div className="dank-output-label">{other.title}</div>
                                                    <div className="dank-output-content">{other.chosen}</div>
                                                </div>
                                            );
                                        case 'multi-choose':
                                            return(
                                                <div key={k}>
                                                    <div className="dank-output-label">{other.title}</div>
                                                    <div className="dank-output-content">{new function(){
                                                        var data = [];
                                                        for(var chosen of other.chosen){
                                                            data.push(chosen+'　　');
                                                        }
                                                        return data
                                                    }}</div>
                                                </div>
                                            );
                                        case 'file':
                                            return(
                                                <div key={k}>
                                                    <div className="dank-output-label">{other.title}</div>
                                                    <div className="dank-output-content">{other.url}</div>
                                                </div>
                                            );
                                        default:
                                            return null;
                                    }
                                }.bind(this))
                            }
                        </div>
                        :
                        null
                    }
                </div>
            )
        }.bind(this));
        return(
            <div>
                <div className="dank-output-print">
                    <div className="dank-output-text">报名表已导出并打印为pdf......</div>
                    <div className="dank-output-text">若打印未开始 请手动调用浏览器打印网页功能 或 点击按钮</div>
                    <div className="dank-output-button" onClick={function(){window.print()}}>打印或导出为pdf</div>
                </div>
                {forms}
            </div>
        )
    }
});

module.exports = Output;