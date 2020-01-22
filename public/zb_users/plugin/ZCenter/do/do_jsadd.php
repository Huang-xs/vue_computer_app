<html><head><meta http-equiv=Content-Type content='text/html; charset=utf-8'></head>

var zbp = new ZBP({
	bloghost: "https://www.hnysnet.com/",
	ajaxurl: "https://www.hnysnet.com/zb_system/cmd.php?act=ajax&src=",
	cookiepath: "/",
	lang: {
		error: {
			72: "名称不能为空或格式不正确",
			29: "邮箱格式不正确，可能过长或为空",
			46: "评论内容不能为空或过长"
		}
	}
});

var bloghost = zbp.options.bloghost;
var cookiespath = zbp.options.cookiepath;
var ajaxurl = zbp.options.ajaxurl;
var lang_comment_name_error = zbp.options.lang.error[72];
var lang_comment_email_error = zbp.options.lang.error[29];
var lang_comment_content_error = zbp.options.lang.error[46];

var zcenter_userurl= "https://www.hnysnet.com/user/";