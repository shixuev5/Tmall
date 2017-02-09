var clock=true,
    len=$(".loft").length,
    winH=$(window).height(),
    loftOffsetTop=[];

/*绑定scroll事件*/
$(window).on("scroll",function(){
    scrollTop=$(window).scrollTop();
    if(clock){
        clearTimeout(clock);
    }
    clock=setTimeout(function(){
        atLoft();
        lazyLoad();
    },100)
})
/*左侧广告*/
/*关闭广告*/
$("#float-ad-left").on("click",".left-ad-close",function(event){
    event.stopPropagation();
    $("#float-ad-left").attr("hidden","hidden");
})
/*右侧广告*/
/*楼层高亮*/
$(".loft").each(function(){
    loftOffsetTop.push($(this).offset().top-280);
})
loftOffsetTop.push(loftOffsetTop[len-1]+$(".loft:last").height()-280);
function atLoft(){
    if(scrollTop<loftOffsetTop[0]){
        $(".loft-link").removeClass("at-loft");
        return;
    }else if(scrollTop>loftOffsetTop[len]){
        $(".loft-link").removeClass("at-loft");
        return;
    }else{
        for(var i=0;i<loftOffsetTop.length;i++){
            if(scrollTop>=loftOffsetTop[i]&&scrollTop<loftOffsetTop[i+1]){
                loftId="#loft"+i;
                $(loftId).addClass("at-loft").siblings().removeClass("at-loft");
                return;
            }
        }    
    }     
}
/*图片懒加载*/
function lazyLoad(){
    $(".lazy-load").each(function(){
        var $this=$(this);
        if(isJustVisiable($this)){
            if(!$this.data("load")){
                $this.attr("src",$this.data('img')).data("load",true);
            }
        }
    })
}
function isJustVisiable($node){
    var offsetTop=$node.offset().top;
            
    if(offsetTop<winH+scrollTop+100){
        if(!$node.data("show")){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
/*返回顶部*/
$("#gotop").on("click",function(){
    $("html,body").animate({scrollTop:0},500);
})



















