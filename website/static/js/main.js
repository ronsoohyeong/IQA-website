$(function(){
leadingViewer = null;
var IS_sync = false;

var op1 = 0, op2 = 0;
var check_left = false;
var check_right = false;
var D_1,D_2,CO_1,CO_2;
var pho1,pho2;
var test_pho1 = 1,test_pho2= 1;

var img_to_test = 0;
var img_has_test = 0;
var img_num = 2;

//path
var root_prefixUrl = static_root + "files/images/";
var rootpath = static_root + "files/photo/";
$(window).resize(function() {
    resize_window();
    loading_height = $('#img1').height();
    loading_innerWidth = $('#img1').innerWidth();
    $('#overlay')
    .css({
    'top': loading_height/2-50,
    'left': (loading_innerWidth)/2-75,
    });
    $('#overlay1')     
        .css({     
        'top': loading_height/2-50,
        'left': (loading_innerWidth)/2-75,
        });
});

//asjust picture size location
function resize_window(){
    var col_num = 2;
    var navHeight = 61;
    $("#row1").height(($("#row1").width()-col_num*30)/((4*col_num)/3));
    padding_main = ((window.innerHeight - navHeight)/2 + navHeight) - $("#row1").height()/2;
    $(".main").css("padding-top", padding_main);
}

resize_window();


// layout of images to show
var tileSources = new Array();
var viewers = new Array();
var option = {
    id:  "img1",
    prefixUrl: root_prefixUrl,
    debugMode: false, //debug mode
    //debugGridColor:'#1B9E77', //grid color under debug mode
    minZoomLevel: 0.5,  //minimum possible zoom level 
    showNavigator:false,
    navigatorOpacity:1,
    minPixelRatio:0.5,
    minZoomImageRatio:0,
    //controlsFadeDelay:100,
    //controlsFadeLength:0,
    showZoomControl:false,
    showFullPageControl:false,
    showHomeControl:false,
    gestureSettingsMouse:{clickToZoom:false},
}

for(i = 0;i<img_num;i++){
    tileSources[i] = new OpenSeadragon.TileSource;
    tileSources[i] = {
        Image: 
        {
            xmlns:  "http://schemas.microsoft.com/deepzoom/2009",
            Url: "",
            Overlap: "1",
            TileSize: "256",
            Format : "jpg",
            Size:
            {
                Height: "",
                Width:  "",
            }
        }
    }
    imgid = i+1;
    option.id = "img"+imgid;
    viewers[i] = OpenSeadragon(option);
}

var op_log1 = function(){
    op1 = op1 + 1;
}

var op_log2 = function(){
    op2 = op2 + 1;
}


viewers[0].addHandler( 'canvas-drag-end', op_log1);
viewers[1].addHandler( 'canvas-scroll', op_log2);

viewers[0].addHandler( 'canvas-drag-end', op_log1);
viewers[1].addHandler( 'canvas-scroll', op_log2);

viewers[0].addHandler( 'canvas-click', ck_left);
viewers[1].addHandler( 'canvas-click', ck_right);

//show gif while loading
img_loding = '<img id="overlay" src ="'+static_root+'3.gif">';
$('#img1').append('<div id="overlay">Loading...</div>');
loading_height = $('#img1').height();
loading_width = $('#img1').width();
loading_innerWidth = $('#img1').innerWidth();
div_height = $('#overlay').height();
div_width = $('#overlay').width();
$('#overlay')
    //.height(docHeight)
    .css({
    //'opacity': .9, //opacity
    'position': 'absolute',
    'font-size':'30px',
    'top': loading_height/2-50,
    'left': (loading_innerWidth)/2-75,
    //'background-color': 'black',
    'width': '150px',
    'height': '50px',

    'z-index': 5000 // guarantee to show this layer on top of all others
    });

$('#img2').append('<div id="overlay1">Loading...</div>');
$('#overlay1')
    //.height(docHeight)
    .css({
    //'opacity': .9, //opacity
    'position': 'absolute',
    'font-size':'30px',
    'top': loading_height/2-50,
    'left': (loading_innerWidth)/2-75,
    //'background-color': 'black',
    'width': '150px',
    'height': '50px',

    'z-index': 5000 //guarantee to show this layer on top of all others
    });

var fade_loading1 = function(){
    $('#overlay').hide();
}

var fade_loading2 = function(){
    $('#overlay1').hide(); 
}

var show_loading1 = function(){
    $('#overlay').show();
}

var show_loading2 = function(){
    $('#overlay1').show();
}

var enable_btn = function(){
    if($("#start-btn").html() == 'Next'){
        $("#li-nextimg").removeClass("disabled");
        $("#nextimg").unbind("click");
        $("#nextimg").click(function(){
            resetChoice();
            getRecords_Next();
            img_has_test+=1;
        })
    }
    $("#start-btn").unbind("click");
    $("#start-btn").click(function(){
        img_has_test+=1;
        clickButton();
        
    })
}
var disable_btn = function(){
    $("#li-nextimg").addClass("disabled");
    $("#nextimg").unbind("click");
    $("#start-btn").unbind("click");
}


viewers[0].addHandler( 'tile-drawn', fade_loading1);
viewers[1].addHandler( 'tile-drawn', fade_loading2);

viewers[0].addHandler( 'close', show_loading1);
viewers[1].addHandler( 'close', show_loading2);


// tutorial
var introduce_step = 1;
var html_array = ['These photos are precessed with different algorithms. Please choose <span class = "tips"><strong>which one is better</strong>. </span><span class = "tips"><strong>experiment session',
    'To allow detailed comparison, you can use mouse to <span class = "tips"><strong>synchronized or unsynchronized </strong></span>的<span class = "tips"><strong>zoom and pan</strong></span>，Press <span class = "tips"><strong>Restore</strong></span>Initialize.',
    'If it is impossible to judge, you can press <span class = "tips"><strong>Skip</strong></span>.',
    'After completing a selection, you can continue by pressing <span class = "tips"><strong>Return</strong></span> key or pressing the next button.'];
var intro_array = ["[intro = 1]","[intro = 2]","[intro = 3]","[intro = 1]"];

$("#itro-btn-pass").click(function(){
        $("#itro").hide();
        initFirstImg();
});
$("#itro-btn-next").click(introduce);
introduce();
$("#itro-btn-pass").show();
$("#tips").click(function(){
    introduce_step = 1;
    introduce();
    $("#itro-btn-pass").show();
    $("#itro-btn-next").html("Next");
});

function introduce(){
    if(introduce_step == 5){
        introduce_step = 1;
        $("#itro").hide();
        initFirstImg();
    }
    else{
        if(introduce_step == 4){
            $("#itro-btn-next").html("Complete");
            $("#itro-btn-pass").hide();
        }
        //$("[itro-pop]").remove();
        select = $("#itro");
        select.show();
        select.css("top", $(intro_array[introduce_step-1]).css("height"));
        select.css("left", "-276px");
        //select.css("right", "200px");
        $("#itro-title").html(introduce_step+" / 4");
        $("#itro-content").html(html_array[introduce_step-1]);
        $(intro_array[introduce_step-1]).after(select);
        introduce_step++;
    } 
}




// turn on/off the 'synchronize' switch 
$("#my-checkbox").bootstrapSwitch(
    {
        "size":"small",
        "labelText":'Synchronize',
        "labelWidth": 30,
    }
);
$("#my-checkbox").on('switchChange.bootstrapSwitch', function(event, state){
    sync_tab(); 
});


sync_tab(); 


$("#start-btn").click(function(){
    resetChoice();
    url_xml_1 = rootpath+"D1/co1/xml/"+test_pho1+".xml"
    url_1 = rootpath+"D1/co1/"+test_pho1+"/";
    url_xml_2 = rootpath+"D2/co1/xml/"+test_pho2+".xml"
    url_2 = rootpath+"D2/co1/"+test_pho2+"/";
    get_tileSource(tileSources[0],viewers[0], url_xml_1,url_1);
    get_tileSource(tileSources[1],viewers[1], url_xml_2,url_2);

    test_pho1++;
    test_pho2++;
    if(test_pho1 == 59){
        test_pho1 = 1;
        test_pho2 = 2;
    }
})
$("#nextimg").click(function(){
    $("#start-btn").trigger("click");
});
$("#start-btn").trigger("click");



$(document).keyup(function(event){
    if(event.keyCode ==13){
      $("#start-btn").trigger("click");
    }
});

$("#reset-img").click(function(){
    //alert("Window:"+window.innerWidth+"Screen:"+ screen.width);
    viewers[0].viewport.goHome();
    viewers[1].viewport.goHome();
});

$("#reset-choice").click(resetChoice);

$("#btnModal-for-question").click(question);


function clickButton(){
    if(check_right || check_left)
    {
        getRecords_Next();
        resetChoice();
    }
    else{
        if($("#start-btn").html() == 'Next'){
            showModalButton("Show", "You haven't made selection. If it's impossible to judge, press Skip.");
            $("#btnModal").click(getRecords_Next);
        }
        else{
            getRecords_Next();
        }
    }
}

function getRecords_Next(){
    viewers[0].close();
    viewers[1].close();
    var result = 0;
    if(check_left){
        result = 0;
    }
    else if(check_right){
        result = 1;
    }
    else{
        result = -1;
    }

    dataToPost = {result:result,operation:op1,operation_scroll:op2};

    $.ajax({
        type:"post",
        url:"/record/",
        //async : false,
        data:dataToPost,
        dataType:"json",
        success:function(msg){
            if(msg.state=='fail'){
                alert("!");
            }
            else if(msg.state=='ok'){
                D_1 = msg.device1;
                D_2 = msg.device2;
                CO_1 = msg.co1;
                CO_2 = msg.co2;
                pho1 = msg.photo_num1;
                pho2 = msg.photo_num2;
                url_xml_1 = rootpath+"D"+D_1+"/co"+CO_1+"/xml/"+pho1+".xml"
                url_1 = rootpath+"D"+D_1+"/co"+CO_1+"/"+pho1+"/";
                url_xml_2 = rootpath+"D"+D_2+"/co"+CO_2+"/xml/"+pho2+".xml"
                url_2 = rootpath+"D"+D_2+"/co"+CO_2+"/"+pho2+"/";

                
                //alert(msg.now);
                progress = msg.progress;
                $(".progress-bar").css('width', (msg.progress)*100+'%');
                if(msg.progress == 1){
                    $("#li-nextimg").addClass("disabled");
                    $("#nextimg").unbind("click");
                    $("#start-btn").html("Submit");
                }
                get_tileSource(tileSources[0],viewers[0], url_xml_1,url_1);
                get_tileSource(tileSources[1],viewers[1], url_xml_2,url_2);

            }
            else{
                $('#overlay1').hide();
                $('#overlay').hide();
                $("#myModal-for-question").modal();                
            }
        },
        error: function(e){
            alert(e.responseText);
        }

       })

    op1 = 0;
    op2 = 0;
 }


 function initFirstImg(){
    
    viewers[0].addHandler( 'tile-drawn', enable_btn);
    viewers[1].addHandler( 'tile-drawn', enable_btn);

    viewers[0].addHandler( 'close', disable_btn);
    viewers[1].addHandler( 'close', disable_btn);
    viewers[0].close();
    viewers[1].close();
    resetChoice();


    $.ajax({
        type:"post",
        url:"/creatRecordList/",
        //async : false,
        data:{screen_width:screen.width,screen_height:screen.height,window_width:window.innerWidth,window_height:window.innerHeight,screen_colorDepth:screen.colorDepth},
        dataType:"json",
        success:function(msg){
            if(msg.state=='fail'){
                alert("creatRecordList fail!");
            }
            else{
                D_1 = msg.device1;
                D_2 = msg.device2;
                CO_1 = msg.co1;
                CO_2 = msg.co2;
                pho1 = msg.photo_num1;
                pho2 = msg.photo_num2;
                url_xml_1 = rootpath+"D"+D_1+"/co"+CO_1+"/xml/"+pho1+".xml"
                url_1 = rootpath+"D"+D_1+"/co"+CO_1+"/"+pho1+"/";
                url_xml_2 = rootpath+"D"+D_2+"/co"+CO_2+"/xml/"+pho2+".xml"
                url_2 = rootpath+"D"+D_2+"/co"+CO_2+"/"+pho2+"/";    
                img_to_test = msg.all;
                img_has_test = msg.now;
                $(".progress-bar").css('width', (msg.progress)*100+'%');
                if(msg.progress == 1){
                    $("#li-nextimg").addClass("disabled");
                    $("#nextimg").unbind("click");
                    $("#start-btn").html("Submit");
                }
                get_tileSource(tileSources[0],viewers[0], url_xml_1,url_1);
                get_tileSource(tileSources[1],viewers[1], url_xml_2,url_2);
            }
        },
        error: function(e){
            alert(e.responseText);
        }
    });
}

function question(){
    var options = $("[name = 'optionsRadios']:checked").val();
    
    if(options=='option4'){
        var extra = $("#my-extra").val()
        if(!extra){$("#my-extra").attr('placeholder', 'Please fill in!');return}
        options = extra;
    }

    $.ajax({
        type:"post",
        url:"/hand_form_last/",
        //async : false,
        data:{"options":options},
        dataType:"json",
        success:function(msg){
            if(msg.state=='fail'){
                alert("!");
            }
            else{
                window.location ="/submit_success/";
            }
        },
        error: function(e){
            alert(e.responseText);
        }

    })
  
}

function resetChoice(){
    check_right = false;
    check_left = false;
    $('#label_left').removeClass("labelActive");
    $('.openseadragon-container:first').removeClass("imgchosen");
    $('#label_right').removeClass("labelActive");
    $('.openseadragon-container:last').removeClass("imgchosen");
}


function ck_left(){
    if(!check_left&&!check_right){
        $('#label_left').addClass("labelActive");
        $('.openseadragon-container:first').addClass("imgchosen");
        check_left = true;
    }
    else if(check_left){
        //$('#label_left').removeClass("labelActive");
        //$('.openseadragon-container:first').removeClass("imgchosen");
        //check_left = false;
    }
    else{
        $('#label_left').addClass("labelActive");
        $('.openseadragon-container:first').addClass("imgchosen");
        $('#label_right').removeClass("labelActive");
        $('.openseadragon-container:last').removeClass("imgchosen");
        check_left = true;
        check_right = false;
    }
}

function ck_right(){
    if(!check_left&&!check_right){
        $('#label_right').addClass("labelActive");
        $('.openseadragon-container:last').addClass("imgchosen");
        check_right = true;
    }
    else if(check_right){
        //$('#label_right').removeClass("labelActive");
        //$('.openseadragon-container:last').removeClass("imgchosen");
        //check_right = false;
    }
    else{
        $('#label_right').addClass("labelActive");
        $('.openseadragon-container:last').addClass("imgchosen");
        $('#label_left').removeClass("labelActive");
        $('.openseadragon-container:first').removeClass("imgchosen");
        check_right = true;
        check_left = false;
    }
}

function get_tileSource(tileSource,viewer,xml_url,image_url)
{
    $.ajax({
    type:"get",
    url:xml_url,
    data:{},
    dataType:"xml",
    success:function(data){
        tileSource["Image"]["Overlap"]  = data.getElementsByTagName("Image")[0].getAttribute("Overlap");
        tileSource["Image"]["TileSize"] = data.getElementsByTagName("Image")[0].getAttribute("TileSize");
        tileSource["Image"]["Format"]   = data.getElementsByTagName("Image")[0].getAttribute("Format");
        tileSource["Image"]["Size"]["Height"] = data.getElementsByTagName("Size")[0].getAttribute("Height");
        tileSource["Image"]["Size"]["Width"]  = data.getElementsByTagName("Size")[0].getAttribute("Width");
        tileSource["Image"]["Url"] = image_url;
        viewer.open(tileSource);
    }
   })
}

function sync_tab(){
    if(!IS_sync){
        IS_sync = true;
        viewers.forEach(function (viewer) {

            var changeHandler = function () {
                if (leadingViewer && self.leadingViwer !== viewer) {
                    return;
                }
    
                leadingViewer = viewer;
                viewers.forEach(function (viewer_now) {
                    if (viewer_now === viewer) {
                        return;
                    }
    
                    viewer_now.viewport.zoomTo(viewer.viewport.getZoom());
                    viewer_now.viewport.panTo(viewer.viewport.getCenter());
                });
    
                leadingViewer = null;
            };
    
            viewer.addHandler('zoom', function () {
                changeHandler();
            });
    
            viewer.addHandler('pan', function () {
                changeHandler();
            });
        });
    }
    else{
        IS_sync = false;
        viewers.forEach(function (viewer) {
            viewer.removeAllHandlers('zoom');
            viewer.removeAllHandlers('pan');
        });
    }
}

function showModalButton(header, contain) {
    $('#myModalLabel').html(header);
    $('#myModalBody').html(contain);
    
    $('#myModalFooter').html('<button type="button" id = "btnModal" data-dismiss="modal" class="btn btn-primary">Confirm</button>');
    
    $("#myModal").modal();
}

})