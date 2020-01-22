zbp.plugin.unbind("comment.reply", "system");
zbp.plugin.on("comment.reply", "hnysnet", function(id) {
    var i = id;
    $("#inpRevID").val(i);
    var frm = $('#divCommentPost'),
        cancel = $("#cancel-reply");

    frm.before($("<div id='temp-frm' style='display:none'>")).addClass("reply-frm");
    $('#AjaxComment' + i).before(frm);

    cancel.show().click(function() {
        var temp = $('#temp-frm');
        $("#inpRevID").val(0);
        if (!temp.length || !frm.length) return;
        temp.before(frm);
        temp.remove();
        $(this).hide();
        frm.removeClass("reply-frm");
        return false;
    });
    try {
        $('#txaArticle').focus();
    } catch (e) {}
    return false;
});

zbp.plugin.on("https://www.hnysnet.com/zb_users/theme/hnysnet/script/comment.get", "hnysnet", function (logid, page) {
    $('span.commentspage').html("Waiting...");
    $.get(bloghost + "zb_system/cmd.php?act=getcmt&postid=" + logid + "&page=" + page, function(data) {
        $('#AjaxCommentBegin').nextUntil('#AjaxCommentEnd').remove();
        $('#AjaxCommentEnd').before(data);
        $("#cancel-reply").click();
    });
})

zbp.plugin.on("comment.postsuccess", "hnysnet", function () {
    $("#cancel-reply").click();
});
$(document).ready(function() {
    var s = document.location;
    $(".nav a").each(function() {
        if (this.href == s.toString().split("#")[0]) {
            $(this).addClass("current");
            return false
        }
    });
    $(".nav li").hover(function() {
        $(this).find('ul:first').slideDown("fast").css({
            display: "block"
        })
    },
    function() {
        $(this).find('ul:first').slideUp("fast").css({
            display: "none"
        })
    });
    $(".topbar #loading").animate({
        width: "100%"
    },
    800,
    function() {
        setTimeout(function() {
            $(".topbar #loading").fadeOut(500)
        })
    })
});
$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        $("#head").addClass("new-header");
        $('.topbar').css('display', 'none')
    } else {
        $("#head").removeClass("new-header");
        $('.topbar').css('display', 'block')
    }
    
	if ($(this).scrollTop() > 200) {
        $('#gotop').css('bottom', '137px')
    } else {
        $('#gotop').css('bottom', '-385px')
    }
});