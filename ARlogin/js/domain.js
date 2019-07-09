 var yanzhengCode;

 // 清空input,统一接口
 function clearContent(obj){
 	//icon图标定义的时候，命名规范为（iconfont icon-xxxx 对应input id名称）
 	var list = obj.className.split(" ");
    var clear = document.getElementById(list[2]);
    clear.value = "";
}
function login(){
	var phoneNumber = document.getElementById("input_acc");
	var input_pas = document.getElementById("input_pas");

	var requestUrl = "https://www.ffgbookbar.cn/ARTourist/public/store/index/login";
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', requestUrl, true); //异步 
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	
	httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
	    if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
	        var json = httpRequest.responseText;//获取到服务端返回的数据
	        console.log(json);
	        // Toast("恭喜你注册成功！",2000);
	    }
	};
	httpRequest.send("mobile="+phoneNumber.value+"&password="+input_pas.value);
}
function backLogin(){
	window.location.href = "./index.html"
}

//手机号码输入验证
function checkPhonenumber(){
	var phoneNumber = document.getElementById("phoneNumber"); 
	var myreg = /^1[3458]\d{9}$/;
	if( (phoneNumber.value).length!=11||!myreg.exec(phoneNumber.value)){ 
		alert("请输入正确的手机号码"); 
	}
} 
function rand(min,max) {
        return Math.floor(Math.random()*(max-min))+min;
    }
// 发送手机验证码
function sendMessage(){
	var phoneNumber = document.getElementById("phoneNumber"); 

	console.log("发送手机验证码");
	var message = rand(100000,999999);
	yanzhengCode = message;
	var requestUrl = "https://www.ffgbookbar.cn/ARTourist/public/store/index/sendMessage";
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', requestUrl, true); //异步 
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	
	/**
	 * 获取数据后的处理程序
	 */
	httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
	    if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
	        var json = httpRequest.responseText;//获取到服务端返回的数据
	        console.log(json);
	        // Toast("恭喜你注册成功！",2000);
	    }
	};
	httpRequest.send("message="+message+"&mobile="+phoneNumber.value);
}

//自定义弹框
// function Toast(msg,duration){
//     duration=isNaN(duration)?3000:duration;
//     var m = document.createElement('div');
//     m.innerHTML = msg;
//     m.style.cssText="width: 60%;min-width: 150px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
//     document.body.appendChild(m);
//     setTimeout(function() {
//         var d = 0.5;
//         m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
//         m.style.opacity = '0';
//         setTimeout(function() { document.body.removeChild(m) }, d * 1000);
//     }, duration);
// }
function $S(s){return document.getElementById(s);}
    function $html(s,html){$S(s).innerHTML=html;}
    var toastTime2=null;
    var displayTime2=null;

    function setToast3(html){
        if(toastTime2!=null){
            clearTimeout(toastTime2);
            clearTimeout(displayTime2);
        }
        $S('toastId2').style.display='block';
        $S('toastId2').style.opacity=1;
        $html('toastId2',html);
        toastTime2=setTimeout(function(){
            $S('toastId2').style.opacity=0;
            displayTime2=setTimeout(function(){$S('toastId2').style.display='none';},1000);
        },1000);
    }
    function test(f){
        if(1==f){
            setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:175px;margin: 0 auto;">话题征集内容不能为空</div>');
        }else if(2==f){
            setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:235px;margin: 0 auto;">话题征集内容最多输入200个字</div>');
        }
    }

function register(){
	var phoneNumber = document.getElementById("phoneNumber");
	var yanzhengma = document.getElementById("yanzhengma");
	var input_pas = document.getElementById("input_pas");

	if(yanzhengma.value != yanzhengCode.toString())
		{
			console.log("验证码错误！");
			return 0;
		}
	else{
		var requestUrl = "https://www.ffgbookbar.cn/ARTourist/public/store/index/register";
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', requestUrl, true); //异步
		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		
		httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
		    if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
		        var json = httpRequest.responseText;//获取到服务端返回的数据
		        console.log(json);
		        // Toast("恭喜你注册成功！",2000);
		        backLogin();
		    }
		};
		httpRequest.send("mobile="+phoneNumber.value+"&password="+input_pas.value);
	}
	

}
function submitChange(){
	var phoneNumber = document.getElementById("phoneNumber");
	var yanzhengma = document.getElementById("yanzhengma");
	var input_pas = document.getElementById("input_pas");
	// console.log("验证码是："+yanzhengCode);
	if(yanzhengma.value != yanzhengCode.toString())
	{
		console.log("验证码错误！");
		return 0;
	}
	else{
		var requestUrl = "https://www.ffgbookbar.cn/ARTourist/public/store/index/passwordForget";
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', requestUrl, true); //异步
		httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");

		httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
		    if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
		        var json = httpRequest.responseText;//获取到服务端返回的数据
		        console.log(json);
		    }
		};
		httpRequest.send("mobile="+phoneNumber.value+"&password="+input_pas.value);
		}
	
}
function test(){
	// get模板
	// var content = "";
	// var requestUrl = "https://www.ffgbookbar.cn/AR/public/";
	// var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
 //        httpRequest.open('GET', requestUrl, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"

 //        httpRequest.onreadystatechange = function () {
 //            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
 //                var json = httpRequest.responseText;//获取到json字符串，还需解析
 //                alert("***"+httpRequest.responseText+"******");
 //            }
 //        };
 //        httpRequest.send();
var requestUrl = "https://www.ffgbookbar.cn/BookStoreProject/public/store.php/addComment";
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', requestUrl, true); //异步
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	
	/**
	 * 获取数据后的处理程序
	 */
	httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
	    if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
	        var json = httpRequest.responseText;//获取到服务端返回的数据
	        console.log(json);
	    }
	};
	httpRequest.send("openid="+"orgod5AblW3LUWbOuXaE5-22RBhU"+"&bookid="+"12"+"&comments="+"input_pas.value"+"&nickName="+"测试nickname"+"&avatarUrl="+"input_pas.value");

}

// post模板
function shortenUrl(){
  const urlWithKey = url + '?key=' + apiKey;
  const urlToShorten = $inputField.val();
  const data = JSON.stringify({longUrl: urlToShorten});

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.response);
      $responseField.append('<p>Your shortened url is: </p><p>' + xhr.response.id + '</p>');
    }
  };

  xhr.open('POST', urlWithKey);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);
}
