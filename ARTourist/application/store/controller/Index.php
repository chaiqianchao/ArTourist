<?php
namespace app\store\controller;
require __DIR__ . "/src/index.php";
use think\Controller;
use Qcloud\Sms\SmsSingleSender;

use app\store\model\GameForm;
use app\store\model\UserForm;
use think\Request;
class Index
{
    public function index(){
        return 'this is ARTourist';
    }

 //用户注册
    public function register()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            $user = new UserForm();
            //查找手机号是否被注册
            $result = $user->where('mobile', $data['mobile'])->value('mobile');
            if ($result != null) {
                return json(["res"=>2]);
            }
            //存入数据表
            $res = $user->allowField(true)->save([
                "mobile" => $data['mobile'],
                "password" => md5($data['password']),
            ]);
            //更新状态码
            $user->where([
                'mobile' => $data['mobile']
            ])->update([
                'status' => '0'
            ]);
            //把手机号存入游戏表
            $game = new GameForm();
            $game->allowField(true)->save([
                "mobile" => $data['mobile'],
            ]);
            if ($res) {
                return json(["res"=>1]);
            } else {
                return json(["res"=>0]);
            }
        }
    }


    //用户登录
    public function login()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            $user = new UserForm();
            //判断用户是否登录
            $res = $user->where('mobile', $data['mobile'])->value('status');
            if($res==1){
                return json('用户已在其他地方登录，无法再次登录');
            }else{
                $password = md5($data['password']);
                //判断
                $ret = model('UserForm')->get(['mobile' => $data['mobile'], 'password' => $password]);
                if (!$ret) {
                    return json(["res"=>0]);
                }
                //更新状态码
                $user->where([
                    'mobile' => $data['mobile']
                ])->update([
                    'status' => '1'
                ]);
                return json(["res"=>1]);
            }
        }
    }

    public function sendMessage(){

        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
           
                $message = $data['message'];
                $mobile = $data['mobile'];
                $appid =1400230009; // SDK AppID 以1400开头

        // 短信应用 SDK AppKey
        $appkey = "3f1846eeb651e1ce363e70fe667e7ff3";

        // 需要发送短信的手机号码
        $phoneNumbers = [$mobile];

        // 短信模板 ID，需要在短信控制台中申请
        $templateId =369638 ;  // NOTE: 这里的模板 ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请

        $smsSign = "视时空科技"; // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
        // 指定模板ID单发短信
        $params =[$message,"30"];
        try {
            $ssender = new SmsSingleSender($appid, $appkey);
            
            $result = $ssender->sendWithParam("86", $phoneNumbers[0], $templateId,
                $params, $smsSign, "", "");  // 签名参数未提供或者为空时，会使用默认签名发送短信
            $rsp = json_decode($result);
            echo $result;
        } catch(\Exception $e) {
            echo var_dump($e);
        }
        echo "\n";
                    return json(["res"=>1]);
            }


   
    }
    //用户注销
    public function logout()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            //更新状态码
            $user = new UserForm();
            $user->where([
                'mobile' => $data['mobile']
            ])->update([
                'status' => '0'
            ]);
            return json('用户正在退出');
        }
    }
 //查询状态码
    public function statusRead()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            $user = new UserForm();
            $res = $user->where('mobile', $data['mobile'])->value('status');
            return json($res);
        }
    }


    //查询总积分
    public function integralRead()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            $user = new UserForm();
            $res = $user->where('mobile', $data['mobile'])->value('integral');
            return json($res);
        }
    }
    //更换头像
    public function headChange()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            $image=$data['head_portrait'];
            //Base64转码成图片
            //设置图片名字
            $imageName =$data['mobile']."_".date("His",time())."_".'png';
            //判断是否有逗号，如果有，取后面部分
            if (strstr($image,",")){
                $image = explode(',',$image);
                $image = $image[1];
            }
            //设置图片保存路径
            $path='D:/head_portrait';
            //设置图片url
            $imageSrc= $path."/". $imageName;
            //生成图片
            $r = file_put_contents($imageSrc, base64_decode($image));
            if(!$r){
                return json('图片生成失败');
            }else {
                //更换头像
                $user = new UserForm();
                $user->where([
                    'mobile' => $data['mobile']
                ])->update([
                    'head_portrait' => $imageSrc
                ]);

                return json('头像修改成功');
            }
        }
    }


    //修改密码
    public function passwordChange()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            $password = md5($data['password']);
            $new_password = md5($data['new_password']);
            //判断输入的原来的手机号和密码对不对
            $ret = model('UserForm')->get(['mobile' => $data['mobile'], 'password' => $password]);
            if (!$ret) {
                return json('手机号或密码错误');
            }
            //修改密码
            $user = new UserForm();
            $user->where([
                'mobile' => $data['mobile']
            ])->update([
                'password' => $new_password
            ]);

            return json('密码修改成功');
        }
    }


    //忘记密码
    public function passwordForget()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            $user = new UserForm();
            //判断这个手机号是否已经注册
            $result = $user->where('mobile', $data['mobile'])->value('mobile');
            if ($result == null) {
                return json('该手机号未注册，请先注册');
            }
            //存入新密码
            $user->where([
                'mobile' => $data['mobile']
            ])->update([
                'password' => md5($data['password'])
            ]);
            return json('新密码设置成功');
        }
    }


    //修改昵称
    public function nameChange()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            //修改昵称
            $user = new UserForm();
            $user->where([
                'mobile' => $data['mobile']
            ])->update([
                'name' => $data['new_name']
            ]);

            return json('昵称修改成功');
        }
    }


    //修改游戏表(进度和积分)和总积分
    public function integralChange()
    {
        //判断是不是post提交
        if(request()->isPost()) {
            //获取数据
            $data = input('post.');
            //修改游戏表
            $game = new GameForm();
            $game->where([
                'mobile' => $data['mobile']
            ])->update([
                'game1' => $data['game1'],
                'game1_integral'=>$data['game1_integral'],
                'game2' => $data['game2'],
                'game2_integral'=>$data['game2_integral'],
            ]);
            //修改总积分
            $user=new UserForm();
            $user->where([
                'mobile' => $data['mobile']
            ])->update([
                'integral'=>$data['game1_integral']+$data['game2_integral']
            ]);
            return json('积分修改完成');
        }
    }
  
}