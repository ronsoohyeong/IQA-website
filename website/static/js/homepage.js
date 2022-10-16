$(function(){

function scroll() {
    //var top = $(".div3").offset().top;//get the height when nav bar changes color
    var scrollTop = $(window).scrollTop();//get the height of top of the current window 
    //alert(scrollTop);
    if (scrollTop>40) {
        //alert("1");
        $('.navbar-default').css({
            'border-bottom':'1px solid rgb(214, 214, 214)'}
            );
    } else {
        $('.navbar-default').css({
            'border-bottom':'0px solid rgb(214, 214, 214)'}
            );
    }
}
$(window).scroll(function() {
    scroll();
});

// decide present device
var userAgentInfo = navigator.userAgent;
var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
var flag = false;
for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = true;
        break;
    }
}


if(flag){
    $("#my-form").hide();
    $("#my-tips").show();
    $("#my-tips").html('Please participate in the PC');
    
}
else if(is_start == '0'){
    $("#my-form").hide();
    $("#my-tips").show();
    $("#my-tips").html('Not started yet');
}
else{
    var cookies = $.cookie('user_check_code');
    if(cookies){
        $("#my-form").hide();
        $("#my-loading").hide();
        $("#my-yanzhengma").html(cookies);
        $("#my-loading-after").show();
        $("#start-btn").attr("href","/login/");
        $("#start-btn").attr("target","_blank"); 
    }


    $("#form-btn").click(function(){
        
        
        var gender = $("[name = 'gender']:checked").val();
        var age = $("[name = 'age']:checked").val();
        var isGlasses = $("[name = 'isGlasses']:checked").val();
        var edu = $("[name = 'edu']:checked").val();
        var pho = $("[name = 'pho']:checked").val();
        var screen = $("#screen").val();
        

        if(age && isGlasses && gender  && edu && pho){
            $("#my-form").hide();
            $("#my-loading").show();
            
            
            $.ajax({
                type:"post",
                url:"/hand_form/",
                //async : false,
                data:{"age":age, "gender":gender, "isGlasses":isGlasses, "edu":edu, "pho":pho, "screen":screen},
                dataType:"json",
                success:function(msg){
                    if(msg.state=='fail'){
                        alert("!");
                    }
                    else{
                        //window.location ="/index/";
                        //window.open('/index/');
                        $("#my-loading").hide();
                        $("#my-yanzhengma").html(msg.code);
                        $("#my-loading-after").show();
                        $("#start-btn").attr("href","/login/");
                        $("#start-btn").attr("target","_blank");
                    }
                },
                error: function(e){
                    alert(e.responseText);
                }

            })
            
        }
        else{
            showModal("Show", "Please fill in all the required items");
        }
        

    });
}

})


