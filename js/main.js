// JavaScript Document
window.onload=function(){
	jd.app.tosend();
	jd.app.tonav();
	jd.app.tofocus();
	jd.app.totodays();
	jd.app.toclothes();
	
}

var jd={};
/*--------tools--------------------*/
jd.tools={};
jd.tools.getByClass=function(oParent,sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	var re=RegExp('\\b'+sClass+'\\b','i');//多个class情况
	
	for(i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}
jd.tools.getStyle=function (obj,attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj,false)[attr];
	}
}
jd.tools.hasClass=function(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
jd.tools.addClass=function(obj, cls) {  
    if (!jd.tools.hasClass(obj, cls))
	{
		obj.className += " " + cls;
	}
}  
  
jd.tools.removeClass=function(obj, cls) {  
    if (jd.tools.hasClass(obj, cls))
	{  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
/*--------ui--------------------*/
jd.ui={};
jd.ui.show=function(obj){
	obj.style.display='block';
}
jd.ui.hide=function(obj){
	obj.style.display='none';
}
jd.ui.fadeIn=function(obj){
	var attr=comp.tools.getStyle(obj,'opacity');
	if(attr==100)
	{
		return false;
	}
	var value=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var speed=5;
		if(value==100)
		{
			clearInterval(obj.timer);
		}
		else
		{
			value+=speed;
			obj.style.opacity=value/100;
			obj.style.filter='alpha(opacity:'+value+')';
		}
	},30);
}

jd.ui.fadeOut=function(obj){
	var attr=comp.tools.getStyle(obj,'opacity');
	if(attr==0)
	{
		return false;
	}
	var value=100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var speed=-5;
		if(value==0)
		{
			clearInterval(obj.timer);
		}
		else
		{
			value+=speed;
			obj.style.opacity=value/100;
			obj.style.filter='alpha(opacity:'+value+')';
		}
	},30);
}
//弹性运动
jd.ui.elasticMove=function(obj,iTarget){
	var iSpeed=0;
	var left=obj.offsetLeft;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		iSpeed+=(iTarget-obj.offsetLeft)/5;
		iSpeed*=0.7;
		left+=iSpeed;
		if(Math.abs(iSpeed)<1&& Math.abs(left-iTarget)<1) //判断速度和距离同时足够小
		{
			clearInterval(obj.timer);
			obj.style.left=iTarget+'px';  //保证停留在目标点上
		}
		else
		{
			obj.style.left=left+'px';
		}
	},30)
};

/*--------app--------------------*/
jd.app={};
jd.app.tosend=function(){
	var oDiv=document.getElementById('top');
	var oScon=jd.tools.getByClass(oDiv,'send_content')[0];
	var oSend=jd.tools.getByClass(oDiv,'send_addr')[0];
	var oAlist=jd.tools.getByClass(oDiv,'addr_list')[0];
	var aAitem=jd.tools.getByClass(oAlist,'addr_list_item');
	oScon.onmouseover=function(){
		jd.ui.show(oAlist);
		jd.tools.addClass(oSend,'sendover');
	}
	oScon.onmouseout=function(){
		jd.ui.hide(oAlist);
		jd.tools.removeClass(oSend,'sendover');
	}
	for(i=0;i<aAitem.length;i++)
	{
		aAitem[i].onclick=function(){
			for(i=0;i<aAitem.length;i++)
			{
				jd.tools.removeClass(aAitem[i],'additem_active');
			}
			jd.tools.addClass(this,'additem_active');
			oSend.getElementsByTagName('span')[0].innerHTML=this.getElementsByTagName('a')[0].innerHTML;			
		}
	}
}
jd.app.tonav=function(){
	var oNav=document.getElementById('nav');
	var oNcon=document.getElementById('container');
	var oNlist=jd.tools.getByClass(oNav,'nav_list')[0];
	var oNlayer=jd.tools.getByClass(oNav,'nav_layer')[0];
	var aNitem=jd.tools.getByClass(oNlist,'nav_item');
	var aLitem=jd.tools.getByClass(oNlayer,'layer_item');
	var timer=null;
	for(i=0;i<aNitem.length;i++)
	{
		aNitem[i].onmouseover=function(){
			clearTimeout(timer);
			for(i=0;i<aNitem.length;i++)
			{
				aNitem[i].index=i;
				jd.tools.removeClass(aNitem[i],'itemhover');
				jd.ui.hide(aLitem[i]);	
			}
			jd.tools.addClass(this,'itemhover');
			jd.ui.show(oNlayer);
			jd.ui.show(aLitem[this.index]);
			
		}
		oNlayer.onmouseout=aNitem[i].onmouseout=function(){
			timer=setTimeout(function(){
				for(i=0;i<aNitem.length;i++)
				{
					jd.tools.removeClass(aNitem[i],'itemhover');
					jd.ui.hide(aLitem[i]);			
				}
				jd.ui.hide(oNlayer);	
			},300);
		}
	}	
	oNlayer.onmouseover=function(){
		clearTimeout(timer);		
	}	
}
jd.app.tofocus=function(){
	var oFoc=document.getElementById('focus');
	var oSmain=jd.tools.getByClass(oFoc,'slider_main')[0];
	var aSpanel=jd.tools.getByClass(oSmain,'slider_panel');
	var oSnav=jd.tools.getByClass(oFoc,'slider_nav')[0];
	var aSitem=jd.tools.getByClass(oSnav,'slider_item');
	var oPrev=jd.tools.getByClass(oFoc,'slider_prev')[0];
	var oNext=jd.tools.getByClass(oFoc,'slider_next')[0];
	var timer=null;	
	var iNow=0;
	for(i=0;i<aSitem.length;i++)
	{
		aSitem[i].onmouseover=function(){			
			for(i=0;i<aSitem.length;i++)
			{
				aSitem[i].index=i;
				jd.tools.removeClass(aSitem[i],'slider_item_selected');
				jd.tools.removeClass(aSpanel[i],'slider_panel_selected');
			}
			jd.tools.addClass(this,'slider_item_selected');
			jd.tools.addClass(aSpanel[this.index],'slider_panel_selected');
		}
	}
	timer=setInterval(auto,2000);
	function auto(){
		if(iNow==aSpanel.length-1)
		{
			iNow=0;
		}
		else
		{
			iNow++;
		}
		for(var i=0;i<aSpanel.length;i++)
		{
			jd.tools.removeClass(aSpanel[i],'slider_panel_selected');
			jd.tools.removeClass(aSitem[i],'slider_item_selected');
		}
		jd.tools.addClass(aSpanel[iNow],'slider_panel_selected');
		jd.tools.addClass(aSitem[iNow],'slider_item_selected');
	}
	oPrev.onmouseover=oNext.onmouseover=oSmain.onmouseover=function(){
		clearInterval(timer);
		jd.ui.show(oPrev);
		jd.ui.show(oNext);
	}
	oPrev.onmouseout=oNext.onmouseout=oSmain.onmouseout=function(){
		timer=setInterval(auto,2000);
		jd.ui.hide(oPrev);
		jd.ui.hide(oNext);
	}
	oPrev.onclick=function(){
		if(iNow==0)
		{
			iNow=aSpanel.length-1;
		}
		else
		{
			iNow--;
		}
		for(var i=0;i<aSpanel.length;i++)
		{
			jd.tools.removeClass(aSpanel[i],'slider_panel_selected');
			jd.tools.removeClass(aSitem[i],'slider_item_selected');
		}
		jd.tools.addClass(aSpanel[iNow],'slider_panel_selected');
		jd.tools.addClass(aSitem[iNow],'slider_item_selected');
	}
	oNext.onclick=function(){
		auto();
	}
}
jd.app.totodays=function(){
	var oToday=document.getElementById('recomm_todays');
	var oSec=jd.tools.getByClass(oToday,'td_clock_sec')[0];
	var oTdsli=jd.tools.getByClass(oToday,'td_slider_main')[0];
	var aLi=oTdsli.getElementsByTagName('li');
	var oPre=jd.tools.getByClass(oToday,'td_slider_prev')[0];
	var oNex=jd.tools.getByClass(oToday,'td_slider_next')[0];
	var iMove=aLi[0].offsetWidth;
	var iStep=aLi.length;
	var iTarget=0;	
	var iNum=0;
	/*---clock------*/	
	if(oSec){
	setInterval(function(){		
		if(iNum==19)
		{
			iNum=0;
		}
		else
		{
			iNum++;
		}
		oSec.style.transform="rotate("+iNum*18+"deg)";
		oSec.style.WebkitTransform="rotate("+iNum*18+"deg)";
		oSec.style.MozTransform ="rotate("+iNum*18+"deg)";		
		oSec.style.msTransform="rotate("+iNum*18+"deg)";
		oSec.style.OTransform="rotate("+iNum*18+"deg)";		
	},500);
	}
	
	
	/*----轮播-----*/
	oPre.onmouseover=oNex.onmouseover=oTdsli.onmouseover=function(){
		jd.ui.show(oPre);
		jd.ui.show(oNex);
	}
	oPre.onmouseout=oNex.onmouseout=oTdsli.onmouseout=function(){
		jd.ui.hide(oPre);
		jd.ui.hide(oNex);
	}
	oPre.onclick=function(){				
		var iLeft=oTdsli.offsetLeft;		
		if(iLeft<=-iMove*(iStep-2))
		{
			iTarget=-iMove;
		}
		else
		{
			iTarget=oTdsli.offsetLeft-iMove;
		}
		jd.ui.elasticMove(oTdsli,iTarget);
	}
	oNex.onclick=function(){
		var iLeft=oTdsli.offsetLeft;		
		if(iLeft>=-iMove)
		{
			iTarget=-iMove*(iStep-2);
		}
		else
		{
			iTarget=oTdsli.offsetLeft+iMove;
		}
		jd.ui.elasticMove(oTdsli,iTarget);
	}
}
jd.app.toclothes=function(){
	var oCth=document.getElementById('clothes');
	var oTab=jd.tools.getByClass(oCth,'tab')[0];
	var oTcon=jd.tools.getByClass(oCth,'cth_c')[0];
	var aTitem=jd.tools.getByClass(oTab,'tab_item');
	var aTmain=jd.tools.getByClass(oTcon,'main');
	var iWidth=0;
	/*------布局转换-------*/
	for(i=0;i<aTitem.length;i++)
	{
		iWidth+=aTitem[i].offsetWidth;
		aTitem[i].style.width=aTitem[i].offsetWidth+'px';		
		aTitem[i].style.left=aTitem[i].offsetLeft+'px';	
		aTitem[i].style.top=aTitem[i].offsetTop+'px';	
	}
	oTab.style.width=iWidth+'px';
	for(i=0;i<aTitem.length;i++)
	{
		aTitem[i].style.position='absolute';
		aTitem[i].style.margin='0';
		aTitem[i].getElementsByTagName('a')[0].style.width=(aTitem[i].getElementsByTagName('a')[0].offsetWidth-2)+'px';
		aTitem[i].getElementsByTagName('a')[0].style.padding='0';
	}
	jd.tools.addClass(aTitem[0],'tab_selected');
	/*-----------选项切换---------------*/
	for(i=0;i<aTitem.length;i++)
	{
		aTitem[i].onmouseover=function(){
			for(i=0;i<aTitem.length;i++)
			{
				aTitem[i].index=i;
				jd.tools.removeClass(aTitem[i],'tab_selected');
				jd.tools.removeClass(aTmain[i],'main_selected');
			}
			jd.tools.addClass(this,'tab_selected');
			jd.tools.addClass(aTmain[this.index],'main_selected');
		}
	}
}