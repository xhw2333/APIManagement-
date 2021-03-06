// 本页面需要的参数
// email(cookie)
// Buuid(cookie)
// moduleId(url参数)
// projeId(url参数)

// 添加请求头
$('.req-add-header').click(function () {
    let key = document.getElementById('request-head').children.length;
    let template = `
    <tr>
    <td></td>
    <td><input type="text" class="req-headers"></td>
    <td class="w50"><input type="checkbox" class="req-header-must"></td>
    <td><input type="text" class="req-header-examples"></td>
    <td>
    <span class="option del-req-header"  key=${key}>删除</span>
    </td>
    </tr>
    `
    addRow('#request-head', template);
    removeRow('request-head','del-req-header')

})
// 添加请求体
$('.req-add-body').click(function () {
    let key = document.getElementById('request-body').children.length;
    let template = `
    <tr>
        <td></td>
        <td><input type="text" class="req-bodys" ></td>
        <td><input type="text" class="req-body-example" ></td>
        <td>
            <select class="req-body-type">
                <option value="String" >String</option>
                <option value="bool">bool</option>
            </select>
        </td>
        <td class="w50"><input type="checkbox" class="req-body-must"}></td>
        <td>
            <span class="option del-req-body" key=${key}>删除</span>
        </td>
    </tr>
    `
    addRow('#request-body', template);
    removeRow('request-body','del-req-body')

})

// 添加返回头
$('.res-add-header').click(function () {
    let key = document.getElementById('response-head').children.length;
    let template = `
    <tr>
            <td></td>
            <td><input type="text" class="res-headers" ></td>
            <td class="w50"><input class="res-header-must" type="checkbox"></td>
            <td><input type="text" class="res-header-examples"></td>
            <td>
                <span class="option del-res-header" key=${key}>删除</span>
            </td>
        </tr>
    `
    addRow('#response-head', template);
    removeRow('response-head','del-res-header')

})

// 添加返回体
$('.res-add-body').click(function () {
    let key = document.getElementById('request-head').children.length;
    let template = `
    <tr>
            <td></td>
            <td><input type="text" class="res-bodys"></td>
            <td><input type="text" class="res-body-example"></td>
            <td>
                <select class="res-body-type">
                    <option value="String">String</option>
                    <option value="bool">bool</option>
                </select>
            </td>
            <td>
                <span class="option del-res-body" key=${key}>删除</span>
            </td>
        </tr>
    `
    addRow('#response-body', template);
    removeRow('response-body','del-res-body')

})

removeRow('request-head','del-req-header')
removeRow('request-body','del-req-body')
removeRow('response-head','del-res-header')
removeRow('response-body','del-res-body')




// 请求参数展开收起
$('.detail-req-open').click(function(){
    if($('#detail-req-open-tag').text() == "收起"){
        $('#detail-req-open-tag').text("展开");
        $('#detail-req').slideUp(500);
        open = false;
    }else{
        $('#detail-req-open-tag').text('收起');
        $('#detail-req').slideDown(500);
        open = true;
    }
})

// 响应内容展开收起
$('.detail-res-open').click(function(){
    if($('#detail-res-open-tag').text() == "收起"){
        $('#detail-res-open-tag').text("展开");
        $('#detail-res').slideUp(500);
        open = false;
    }else{
        $('#detail-res-open-tag').text('收起');
        $('#detail-res').slideDown(500);
        open = true;
    }
})


// 删除功能
function removeRow(tbody,deldom){
    let dels = document.getElementsByClassName(deldom);
    for(let j=0;j<dels.length;j++){
        dels[j].onclick = function(){
            let old = document.getElementById(tbody).children[$(this).attr('key')];
            document.getElementById(tbody).removeChild(old);
            let newkeys = document.getElementsByClassName(deldom);
            for(let i=0;i<newkeys.length;i++){
                newkeys[i].setAttribute('key',i);
            }
        }

    }
    
}

// 标签切换
function switchPage(tag, page, alltag, allpage) {
    $(tag).click(function () {
        $(alltag).removeClass('detail-req-res-nav-choose');
        $(tag).addClass('detail-req-res-nav-choose');
        $(allpage).addClass('hide');
        $(page).removeClass('hide');
    })
}
// 请求参数
switchPage('#detail-attr-tag-body', '#detail-req-body', '.detail-attr-tag', '.detail-req-div')
switchPage('#detail-attr-tag-head', '#detail-req-head', '.detail-attr-tag', '.detail-req-div')

// 相应内容
switchPage('#detail-return-tag-result', '#detail-return-result', '.detail-return-tag', '.detail-return-div')
switchPage('#detail-return-tag-head', '#detail-return-head', '.detail-return-tag', '.detail-return-div')

// 字符转数组
function str2Arr(stringObj) {
    stringObj = stringObj.replace(/([\w,]*)/, "$1");
    if (stringObj.indexOf("[") == 0) {
        stringObj = stringObj.substring(1, stringObj.length - 1);
    }
    var arr = stringObj.split("},");
    var newArray = [];
    for (var i = 0; i < arr.length; i++) {

        if (i != arr.length - 1) {
            var arrOne = arr[i] + '}';
            newArray.push(arrOne);
        } else {
            var arrOne = arr[i];
            newArray.push(arrOne);
        }

    }
    return newArray;
};

// 获取url后面的参数
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
} 

// 添加行
function addRow(tbody, template) {
    $(tbody).append(template);
}


// 保存接口
$('#save-api').click(function(){
    let moduleId = getQueryString('mID'),
    projectId = getQueryString('pID'),
    status;
    // 获取请求头
    let reqHeaders = document.getElementById('request-head').children;
    let reqheaders = document.getElementsByClassName('req-headers');
    let reqheadermust = document.getElementsByClassName('req-header-must');
    let reqheaderexamples = document.getElementsByClassName('req-header-examples');
    let requestHeader = new Array();
    for(let i=0;i<reqHeaders.length;i++){
        let theheader = {
            "header" : reqheaders[i].value,
            "must" : reqheadermust[i].checked,
            "example" : reqheaderexamples[i].value
        }
        requestHeader.push(JSON.stringify(theheader));
    }

    // 获取请求体
    let reqBodys = document.getElementById('request-body').children;
    let reqbodys = document.getElementsByClassName('req-bodys');
    let reqbodymust = document.getElementsByClassName('req-body-must');
    let reqbodyexample = document.getElementsByClassName('req-body-example');
    let reqbodytype = document.getElementsByClassName('req-body-type');
    let requestBody = new Array();
    for(let i=0;i<reqBodys.length;i++){
        let thebody = {
            "body" : reqbodys[i].value,
            "must" : reqbodymust[i].checked,
            "example" : reqbodyexample[i].value,
            "type" : reqbodytype[i].value
        }
        requestBody.push(JSON.stringify(thebody));
    }

    // 获取响应头
    let resHeaders = document.getElementById('response-head').children;
    let resheaders = document.getElementsByClassName('res-headers');
    let resheadermust = document.getElementsByClassName('res-header-must');
    let resheaderexamples = document.getElementsByClassName('res-header-examples');
    let responseHeader = new Array();
    for(let i=0;i<resHeaders.length;i++){
        let theheader = {
            "header" : resheaders[i].value,
            "must" : resheadermust[i].checked,
            "example" : resheaderexamples[i].value
        }
        responseHeader.push(JSON.stringify(theheader));
    }

    // 获取返回体
    let resBodys = document.getElementById('response-body').children;
    let resbodys = document.getElementsByClassName('res-bodys');
    let resbodyexample = document.getElementsByClassName('res-body-example');
    let resbodytype = document.getElementsByClassName('res-body-type');
    let responseBody = new Array();
    for(let i=0;i<resBodys.length;i++){
        let thebody = {
            "body" : resbodys[i].value,
            "example" : resbodyexample[i].value,
            "type" : resbodytype[i].value
        }
        responseBody.push(JSON.stringify(thebody));
    }

    let statuscode = document.getElementsByClassName('api-status');
    for(let i=0;i<statuscode.length;i++){
        if(statuscode[i].checked){
            status = i+1;
        }
    }
    
    let json = {
        "name" : $('#api-name').val(),
        "moduleId" : moduleId,
        "projectId" : projectId,
        "status" : status,
        "url" : $('#api-protocol').val()+ '://'+$('#api-url').val(),
        "method" : $('#api-method').val(),
        "requestType" : $('#request-type').val(),
        "requestHeader" : '[' + requestHeader.toString() + ']',
        "requestBody" :'[' +  requestBody.toString()+ ']',
        "responseType" : $('#response-type').val(),
        "responseHeader" : '[' + responseHeader.toString()+ ']',
        "responseBody" :'[' +  responseBody.toString()+ ']'
    }
    showLoading();
    fetch(domain + 'api/interface/create',{
        method : 'post',
        body : JSON.stringify(json),
        headers:{
            "Content-Type" : "application/json",
            "Buuid" : getCookie('Buuid')
        }
    })
    .then(res=>res.json())
    .then(resjson=>{
        if(resjson.code == 1){
            alertIt(resjson.msg);
            setCookie('api-id',resjson.data.id);
            hideLoading();
            location.assign('./apiManagement.html');
        }else{
            alertIt(resjson.msg);
            hideLoading();
            location.assign('./apiManagement.html');

        }

    })
    .catch(err=>{
        alertIt('请先登录！');
        hideLoading();
        location.assign('../index.html');

    })

})