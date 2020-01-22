//注册
function zcenter_signup(){
    $('.btn').attr("disabled",true);
    $.post(zbp.options.ajaxurl + "zcenter_signup",
        $(".login-form").serialize(),
        function(data){
            switch(data.uid){
                case '0':
                  $('<div class="alert alert-danger" role="alert">验证码错误！请重新输入！</div>').prependTo('.login-form');
                  break;
                case '-1':
                  $('<div class="alert alert-danger" role="alert">用户名过长或过短！</div>').prependTo('.login-form');
                  break;
                case '-2':
                  $('<div class="alert alert-warning" role="alert">用户名不符合规范或包含禁用字符(只能包含字母数字._和中文).</div>').prependTo('.login-form');
                  break;
                case '-3':
                  $('<div class="alert alert-warning" role="alert">用户名已经存在！</div>').prependTo('.login-form');
                  break;
                case '-4':
                  $('<div class="alert alert-warning" role="alert">邮箱不能过长或过短</div>').prependTo('.login-form');
                  break;
                case '-5':
                  $('<div class="alert alert-warning" role="alert">邮箱格式不正确</div>').prependTo('.login-form');
                  break;
                case '-51':
                  $('<div class="alert alert-warning" role="alert">使用该邮箱注册的帐号已存在！！</div>').prependTo('.login-form');
                  break;
                case '-6':
                  $('<div class="alert alert-warning" role="alert">密码长度必须在8-20位之间</div>').prependTo('.login-form');
                  break;
                case '-7':
                  $('<div class="alert alert-warning" role="alert">两次输入的密码不同，请核对输入的密码</div>').prependTo('.login-form');
                  break;
                case '-8':
                  $('<div class="alert alert-warning" role="alert">您的IP地址操作过于频繁，请稍后再试！！</div>').prependTo('.login-form');
                  break;
                case '-9':
                  $('<div class="alert alert-success" role="alert">激活邮件已发送至您的邮箱，请激活后再登录！</div>').prependTo('.login-form');
                  break;
                case '-10':
                  $('<div class="alert alert-success" role="alert">邀请码不存在或已被使用！</div>').prependTo('.login-form');
                  break;
                default:
                  $('<div class="alert alert-success" role="alert">注册成功！</div>').prependTo('.login-form');
                  setTimeout(function () {
                        window.location=data.redirect_url;
                    }, 2500);
            }
            $('.btn').removeAttr("disabled");
            setTimeout('$(".alert").slideUp()',2000);
        }, "json");
    return false;
}

//登陆
function zcenter_login(){
    $.post(zbp.options.ajaxurl + "zcenter_login",
        $(".login-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  $('<div class="alert alert-danger" role="alert">登陆失败</div>').prependTo('.login-form');
                  break;
                case '-2':
                  $('<div class="alert alert-warning" role="alert">登陆失败</div>').prependTo('.login-form');
                  break;
                case '-3':
                  $('<div class="alert alert-warning" role="alert">安全提示问题回答错误，请确认后重新登录！</div>').prependTo('.login-form');
        $('.loginqa').show();
                  break;
                case '-4':
                  $('<div class="alert alert-warning" role="alert">失败次数太多！请稍后再试！</div>').prependTo('.login-form');
                  break;
                default:
                  $('<div class="alert alert-success" role="alert">登录成功！</div>').prependTo('.login-form');
                  $(data.synlogin).appendTo('body');
                  //$('#message').modal();
                  setTimeout(function () {
                        window.location=data.redirect_url;
                    }, 1000);
            }
            setTimeout('$(".alert").slideUp()',500);
        }, "json");
    return false;
}


//登陆 兼容SingleSignOn单点登录插件
function zcenter_singlesignon_login(){
    $.post(zbp.options.ajaxurl + "zcenter_singlesignon_login",
        $(".login-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  $('<div class="alert alert-danger" role="alert">登陆失败</div>').prependTo('.login-form');
                  break;
                case '-2':
                  $('<div class="alert alert-warning" role="alert">登陆失败</div>').prependTo('.login-form');
                  break;
                case '-3':
                  $('<div class="alert alert-warning" role="alert">安全提示问题回答错误，请确认后重新登录！</div>').prependTo('.login-form');
        $('.loginqa').show();
                  break;
                case '-4':
                  $('<div class="alert alert-warning" role="alert">失败次数太多！请稍后再试！</div>').prependTo('.login-form');
                  break;
                default:
                  $('<div class="alert alert-success" role="alert">登录成功！</div>').prependTo('.login-form');
                  $(data.synlogin).appendTo('body');
                  //$('#message').modal();
                  setTimeout(function () {
                        window.location=data.redirect_url;
                    }, 1000);
            }
            setTimeout('$(".alert").slideUp()',500);
        }, "json");
    return false;
}

//找回密码
function zcenter_findpass(){
    $.post(zbp.options.ajaxurl + "zcenter_findpass",
        $(".login-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  $('<div class="alert alert-warning" role="alert">验证码错误！</div>').prependTo('.login-form');
                  break;
                case '-2':
                  $('<div class="alert alert-warning" role="alert">用户名或邮箱格式不正确！</div>').prependTo('.login-form');
                  break;
                case '-3':
                  $('<div class="alert alert-danger" role="alert">用户名或邮箱不匹配或不存在！</div>').prependTo('.login-form');
                  break;
                default:
                  $('<div class="alert alert-success" role="alert">提交成功！请到邮箱中查收密码重置邮件！</div>').prependTo('.login-form');

            }
            setTimeout('$(".alert").slideUp()',2000);
        }, "json");
    return false;
}

//充值
function zcenter_charge(){
if(confirm("确认充值?")){
if(document.getElementById("charge_money").value=="")
			{
				alert("请输入金额");
				return false;
			}
$('#submit').attr("disabled",true);
    $.post(zbp.options.ajaxurl + "zcenter_charge",
        $("#charge-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("请输入一个大于0的数！！");
                  break;
                case '-3':
                  alert("金额过大，小店承受不起！！");
                  break;
                default:
                  alert("订单创建成功！页面刷新后支付!");
            }
          window.location=data.redirect_url;
        }, "json");
    return false;
}
}

//提现
function zcenter_enchashment(){
if(confirm("确认提现?")){
if(document.getElementById("enchashment_money").value=="")
			{
				alert("请输入金额");
				return false;
			}
$('#submit').attr("disabled",true);
    $.post(zbp.options.ajaxurl + "zcenter_enchashment",
        $("#enchashment-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("请输入一个大于0的数！！");
                  break;
                case '-3':
                  alert("帐户余额不足！！");
                  break;
                case '-4':
                  alert("提现金额需要大于或等于100元");
                  break;
                default:
                  alert("提现订单创建成功！请等待管理员处理!");
            }
          window.location=data.redirect_url;
        }, "json");
    return false;
}
}


//支付宝 财付通 不同action  zcenter_payorder(order_form'.$order->Num.');
function zcenter_submit_onlinepayform(form,type){

$("#modeofpayment").val(type);
$(form).submit();


}


 //jquery插件把表单序列化成json格式的数据start
/*
    (function($){
        $.fn.serializeJson=function(){
            var serializeObj={};
            var array=this.serializeArray();
            var str=this.serialize();
            $(array).each(function(){
                if(serializeObj[this.name]){
                    if($.isArray(serializeObj[this.name])){
                        serializeObj[this.name].push(this.value);
                    }else{
                        serializeObj[this.name]=[serializeObj[this.name],this.value];
                    }
                }else{
                    serializeObj[this.name]=this.value;
                }
            });
            return serializeObj;
        };
    })(jQuery);
*/
    //jquery插件把表单序列化成json格式的数据end


//立即购买 pre 单品id+num 跳转至收货地址确认界面
function zcenter_submitbuy_pre(){
  //$objbuyform=$("#buy-form").serializeJson();
  var numtext=$(".zcenter_good_num").val();
  var goodid=$(".zcenter_good_id").val();
  window.location=zcenter_userurl+"submitbuy_pre.php?numtext="+numtext+"&id="+goodid;
  return false;
}
//立即购买 pre 单品id+num 跳转至收货地址确认界面
function zcenter_multisubmitbuy_pre(){
//  $strcartform=$(".cart-form").serialize();
//  window.location=zcenter_userurl+"submitbuy_pre.php?"+$strcartform;
//  return false;

var objs=document.getElementsByName('id[]');
var isSelect=false;
for(var i=0;i<objs.length;i++){
  if(objs[i].checked==true){
    isSelect=true;
    break;
  }
}
if(isSelect==false){
  alert("您没有选择任何商品！");
  return false;
}

  $(".cart-form").attr('action',zcenter_userurl+"submitbuy_pre.php");

}

//提交&创建商品订单
function zcenter_submitbuy(){
    $.post(zbp.options.ajaxurl + "zcenter_submitbuy",
        $("#buy-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("收货地址不是您的哦！！");
                  break;
                case '-3':
                  alert("商品库存不足！！");
                  break;
                case '-4':
                  alert("请创建至少一个收货地址");
                  break;
                default:
                  alert("订单创建成功！正在跳转到支付页面!");
            }
        window.location=data.redirect_url;
        }, "json");
    return false;
}


//提交&创建商品订单
function zcenter_submitbuy_direct(){
      if(confirm("确认购买?")){
    $.post(zbp.options.ajaxurl + "zcenter_submitbuy_direct",
        $("#buy-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("余额不足！！");
                  break;
                default:
                  alert("购买成功!");
            }
        window.location=data.redirect_url;
        }, "json");
    return false;
    }
}


//add to cart
function zcenter_submitcart(){
    $.post(zbp.options.ajaxurl + "zcenter_submitcart",
        $("#buy-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                window.location=data.redirect_url;
                  break;
                case '-2':
                  alert("商品已下架或不存在！！");
                  break;
                case '-3':
                  alert("超过购物车商品总数限制！！");
                  break;
                default:
                  alert("加入购物车成功!");
            }
        }, "json");
    return false;
}

//del form cart
function zcenter_delfromcart(cartid){
  if(confirm("确认删除?")){
				var ajax_data = {
					id: cartid
				};  
    $.post(zbp.options.ajaxurl + "zcenter_delfromcart",
        ajax_data,
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("数据错误，不是您的购物车信息！！");
                  break;
                default:
                  alert("删除成功!");
            }
          window.location=data.redirect_url;
        }, "json");
    return false;
  }
}

//del form cart
function zcenter_multidelfromcart(){

var objs=document.getElementsByName('id[]');
var isSelect=false;
for(var i=0;i<objs.length;i++){
  if(objs[i].checked==true){
    isSelect=true;
    break;
  }
}
if(isSelect==false){
  alert("您没有选择任何商品！");
  return false;
}

  if(confirm("确认删除?")){
    $.post(zbp.options.ajaxurl + "zcenter_delfromcart",
    $(".cart-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("数据错误，不是您的购物车信息！！");
                  break;
                default:
                  alert("删除成功!");
            }
          window.location=data.redirect_url;
        }, "json");
    return false;
  }
}



//余额支付商品订单
function zcenter_payorder(form){
if(confirm("确认支付?")){
    $.post(zbp.options.ajaxurl + "zcenter_payorder",
        $(form).serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("余额不足，请充值！！");
                  break;
                case '-3':
                  alert("库存不足，无法购买或支付，请稍后购买或重新下单！！");
                  break;
                case '-4':
                  alert("订单已超过有效期，请重新下单！！");
                  break;
                default:
                  alert("支付成功!");
            }
          window.location=data.redirect_url;
        }, "json");
    return false;
}
}

//前台删除商品订单
function zcenter_delorder(form){
if(confirm("确认删除?")){
    $.post(zbp.options.ajaxurl + "zcenter_delorder",
        $(form).serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("这不是您的订单！！");
                  break;
                default:
                  alert("删除成功!");
                  $(form).parent().parent().fadeOut(1500);
            }
          window.location=data.redirect_url;
        }, "json");
    return false;
}
}


//创建vip订单
function zcenter_charge_vip(){
if($("#viptime").val()=="")
			{
				alert("请输入购买时长");
				return false;
			}
if(confirm("确认购买本站VIP并支付?")){
    $.post(zbp.options.ajaxurl + "zcenter_charge_vip",
        $("#charge-vip").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("请输入一个大于零的整数！！");
                  break;
                case '-3':
                  alert("账户余额不足！！");
                  break;
                case '-4':
                  alert("您的用户等级高于VIP用户，无需购买！");
                  break;
                default:
                  alert("VIP充值成功!");
            }
           window.location=data.redirect_url;
        }, "json");
    return false;
}
}

//使用优惠券
function zcenter_checkcoupon(){
if(document.getElementById("couponcode").value=="")
			{
				alert("请输入优惠券号！");
				return false;
			}
    $.post(zbp.options.ajaxurl + "zcenter_checkcoupon",
        $(".orderitem-coupon").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("优惠券不存在或已失效！！");
                  break;
                case '-3':
                  alert("您的优惠券不适用于本商品！！");
                  break;
                case '-4':
                  alert("该订单已经使用过优惠券！！");
                  break;                  
                default:
                  alert("验证成功!");
                  window.location=window.location.href;
            }
        }, "json");
    return false;
}


//使用充值卡
function zcenter_checkchargecard(){
if(document.getElementById("charge_code").value=="")
			{
				alert("请输入充值卡号！");
				return false;
			}
    $.post(zbp.options.ajaxurl + "zcenter_checkchargecard",
        $("#charge-form").serialize(),
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未登录！！");
                  break;
                case '-2':
                  alert("充值卡不存在或已失效！！");
                  break;   
                case '-3':
                  alert("出错次数太多！请稍后再试！！");
                  break;              
                default:
                  alert("充值成功!");
                  window.location=data.redirect_url;
            }
        }, "json");
    return false;
}


//工单状态
function zcenter_setworkorderstatus(id,status){
if(confirm("确认?")){
    $.post(zbp.options.ajaxurl + "zcenter_setworkorderstatus",
        {id:id,status:status},
        function(data){
            switch(data.uid){
                case '-1':
                  alert("未授权的操作！！");
                  break;
                case '-2':
                  alert("ok！");
                  break;
                default:
                  alert("ok!");
            }
           window.location=data.redirect_url;
        }, "json");
    return false;
}
}

//以下三个函数，完整功能仅适配NBlue主题，其余主题可能需要视情况进行修改。
//订阅 关注 收藏
function zcenter_addsubscribe(type,content){

    $.post(zbp.options.ajaxurl + "zcenter_addsubscribe",
        {type:type,content:content},
        function(data){
            switch(data.uid){
                case '-1':
                  alert("请先登录后再操作！！");
                  break;
                case '-2':
                  alert("error input!");
                  break;
                default:
                  $(".zcenter_favorite").html('<i class="zcenter-favorite-ico icon-heart icon12"></i> <a href="#" onclick=\'zcenter_delsubscribe("'+type+'",'+content+');\'>取消收藏</a>');
                  $(".zcenter-favorite-ico").css("opacity","1");
                  alert("操作成功!");
            }
           //window.location=data.redirect_url;
        }, "json");
    return false;
}


//取消订阅
function zcenter_delsubscribe(type,content){

    $.post(zbp.options.ajaxurl + "zcenter_delsubscribe",
        {type:type,content:content},
        function(data){
            switch(data.uid){
                case '-1':
                  alert("请先登录后再操作！！");
                  break;
                case '-2':
                  alert("error input!");
                  break;
                default: 
                 $(".zcenter_favorite").html('<i class="zcenter-favorite-ico icon-heart icon12"></i> <a href="#" onclick=\'zcenter_addsubscribe("'+type+'",'+content+');\'>收藏</a>');
                  $(".zcenter-favorite-ico").css("opacity","0.4");
                  alert("操作成功!");

            }
           //window.location=data.redirect_url;
        }, "json");
    return false;
}


//检测订阅
function zcenter_checksubscribe(type,content){ 
    $.post(zbp.options.ajaxurl + "zcenter_checksubscribe",
        {type:type,content:content},
        function(data){
            switch(data.uid){
                case '-1':
                 $(".zcenter_favorite").append('<i class="zcenter-favorite-ico icon-heart icon12"></i> <a href="#" onclick=\'zcenter_addsubscribe("'+type+'",'+content+');\'>收藏</a>');
                  break;
                case '-2':
                  $(".zcenter_favorite").append('<i class="zcenter-favorite-ico icon-heart icon12"></i> <a href="#" onclick=\'zcenter_delsubscribe("'+type+'",'+content+');\'>取消收藏</a>');
                  $(".zcenter-favorite-ico").css("opacity","1");
                  break;
                default:
                // en heng?
            }
        }, "json");
    return false;
}




