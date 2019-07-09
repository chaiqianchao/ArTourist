// 全局变量定义
var musicTimmer = false;//刚进入不主动播放音乐

function backOnClick(){
	console.log("我是返回按钮");
}
function musicAutoPlay(){
	var musicImg = document.getElementById('musicImg');
	//ie浏览器可以打开页面立即播放背景音乐，其他浏览器受到限制
	if(!musicTimmer)
	{
		// 继续音乐以及重新添加旋转动画
		musicImg.style.animation = " rollchange 15s linear 0s infinite";
		autoPlay();
		console.log("已开始音乐");
	}
	else
	{
		// 停止音乐以及移除旋转动画
		musicImg.style.animation = "none";
		autoPause();
		console.log("已停止音乐");
	}
	musicTimmer = !musicTimmer;
}
function settings(){
	console.log("我是设置按钮");
}
//mp3播放函数
function autoPlay(){
    var bgMusicAudio = document.getElementById('bgMusicAudio');
    bgMusicAudio.play();
}
//mp3停止函数
function autoPause(){
    var bgMusicAudio = document.getElementById('bgMusicAudio');
    bgMusicAudio.pause();
}
