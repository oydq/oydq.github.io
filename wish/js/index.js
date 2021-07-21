$(function () {
	$( '#main' ).height( $( window ).height() - $( '#top' ).height() - 45);
		//读取卡片
	AV.init({
  		appId: "8voQy2KbUllhQ6T1eXEtrK9p-gzGzoHsz",
  		appKey: "eaSfopp9PqWpKoxovXSgbCLm"
	});

	var query=new AV.Query('wish');
	query.find().then((wishes) => {
	wishes.forEach (function (wish) {
			var msgbg="a"+(Math.floor(Math.random()*5)+1);
				var sendmsg="<dl class='paper "+msgbg+"'>"+
				"<button class='button' data-clipboard-text="+wish.id+">复制许愿号</button>"+
					"<dt>"+
						"<span class='username'>"+wish.attributes.wishnickname+"</span>"+
					"</dt>"+
					"<dd class='content'>"+wish.attributes.wishtext+"</dd>"+
					"<dd class='bottom'>"+
						"<span class='time'>"+wish.attributes.wishtime+"<br/>"+wish.id+"</span>"+
					"</dd>"+
					"</dl>";
				var hymsg="<dl class='paper "+msgbg+"'>"+
				"<button class='button' data-clipboard-text="+wish.id+">复制许愿号</button>"+
					"<dt>"+
						"<span class='username'>恭喜["+wish.attributes.wishnickname+"]完成心愿!</span>"+
					"</dt>"+
					"<dd class='content'>"+wish.attributes.wishtext+"</dd>"+
					"<dd class='bottom'>"+
						"<span class='time'>"+wish.attributes.wishtime+"<br/>"+wish.id+"</span>"+
					"</dd>"+
					"</dl>";
					if(wish.attributes.ishy){$("#main").append(hymsg);	}else{$("#main").append(sendmsg);	}
					load();					
		});
	});

	

function load(){

	var paper = $( '.paper' );
	var FW = $( window ).width();
	var FH = $( '#main' ).height();
	for (var i = 0; i < paper.length; i++) {
		var obj = paper.eq(i);
		obj.css( {
			left : parseInt(Math.random() * (FW - obj.width())) + 'px',
			top : parseInt(Math.random() * (FH - obj.height())) + 'px'
		} );
		drag(obj, $( 'dt', obj ));
	}

	paper.click( function () {
		$( this ).css( 'z-index', 1 ).siblings().css( 'z-index', 0 );
	} );
}

	$( '#send' ).click( function () {
		$( '<div id="windowBG"></div>' ).css( {
			width : $(document).width(),
 			height : $(document).height(),
 			position : 'absolute',
 			top : 0,
 			left : 0,
 			zIndex : 998,
 			opacity : 0.3,
 			filter : 'Alpha(Opacity = 30)',
 			backgroundColor : '#000000'
		} ).appendTo( 'body' );

		var obj = $( '#send-form' );
		obj.css( {
			left : ( $( window ).width() - obj.width() ) / 2,
			top : $( document ).scrollTop() + ( $( window ).height() - obj.height() ) / 2
		} ).fadeIn();
	} );


	$( '#huanyuan' ).click( function () {
		$( '<div id="windowBG"></div>' ).css( {
			width : $(document).width(),
 			height : $(document).height(),
 			position : 'absolute',
 			top : 0,
 			left : 0,
 			zIndex : 998,
 			opacity : 0.3,
 			filter : 'Alpha(Opacity = 30)',
 			backgroundColor : '#000000'
		} ).appendTo( 'body' );

		var obj = $( '#huanyuan-form' );
		obj.css( {
			left : ( $( window ).width() - obj.width() ) / 2,
			top : $( document ).scrollTop() + ( $( window ).height() - obj.height() ) / 2
		} ).fadeIn();
	} );


	$( '#close' ).click( function () {
		$( '#send-form' ).fadeOut( 'slow', function () {
			$( '#windowBG' ).remove();
		} );
		return false;
	} );
	$( '#close2' ).click( function () {
		$( '#huanyuan-form' ).fadeOut( 'slow', function () {
			$( '#windowBG' ).remove();
		} );
		return false;
	} );

	
	$('#send-btn').click(function(){
		if($( '#username' ).val()==""){ alert("留下您的姓名。");}else{
			if($( 'textarea[name=content]' ).val()==""){
				alert("别忘了许愿哦~");
			}else{
				var time=new Date();
				var year=time.getFullYear();
				var month=time.getMonth()+1;
				if(month<10){month="0"+month;}
				var day=time.getDate();
				if(day<10){day="0"+day;}
				var hour=time.getHours();
				if(hour<10){hour="0"+hour;}
				var minute=time.getMinutes();
				if(minute<10){minute="0"+minute;}
				var second=time.getSeconds();
				if(second<10){second="0"+second;}
				var week=time.getDay();

				var nickname=$( '#nickname' ).val();
				var username=$( '#username' ).val();
				var xyid=localStorage.pagecount;
				var xytext=$('textarea[name=content]' ).val();
				var datetime=year+"年"+month+"月"+day+"日"+hour+":"+minute+":"+second;
				//存入卡片
				var Wish= AV.Object.extend('wish');
				var wish= new Wish();
				wish.set('wishnickname', nickname);
				wish.set('wishname', username);
				wish.set('wishtext',xytext);
				wish.set('wishtime',datetime);
				wish.set('ishy',false);
				// 将对象保存到云端
				wish.save().then((wish) => {
  				console.log(nickname+'=>许愿成功。');
				}, (error) => {
				});


		var query=new AV.Query('wish');
				query.equalTo('wishtime', datetime);
				query.find().then((wishes) => {
					wishes.forEach (function (wish) {
					var msgbg="a"+(Math.floor(Math.random()*5)+1);
						var sendmsg="<dl class='paper "+msgbg+"'>"+
					"<button class='button' data-clipboard-text="+wish.id+">复制许愿号</button>"+
						"<dt>"+
							"<span class='username'>"+nickname+"</span>"+
						"</dt>"+
						"<dd class='content'>"+xytext+"</dd>"+
						"<dd class='bottom'>"+
							"<span class='time'>"+datetime+"<br/>"+wish.id+"</span>"+
						"</dd>"+
						"</dl>";
						console.log(wish.id);
						$("#main").append(sendmsg);
						alert("许愿成功~");
						load();
						$( '#send-form' ).fadeOut( 'slow', function () {
							$( '#windowBG' ).remove();
						});
						});
					});
		}
		}
	});
	var point=false;
	$('#huanyuan-btn').click(function(){
		
		var query=new AV.Query('wish');
			query.find().then((wishes) => {
			wishes.forEach (function (wish) {	
			if($('#hyid').val()==wish.id&&$('#husername').val()==wish.attributes.wishname){ 
				console.log($('#hyid').val());
				console.log($('#husername').val());
				console.log(wish.id);
				console.log(wish.attributes.wishname);
				point=true;
				alert("还愿成功！");
				var wish= AV.Object.createWithoutData('wish', wish.id);
				wish.set('ishy', true);
				wish.save().then((wish) => {
  				console.log(wish.attributes.username+'=>还愿成功。');
				location.reload();	
				}, (error) => {
				});
			}
		});
			if(point==false){alert("这个愿望不是您的~");}		
		});
		$( '#huanyuan-form' ).fadeOut( 'slow', function () {

						$( '#windowBG' ).remove();
		});
	});

	$( 'textarea[name=content]' ).keyup( function () {
		var content = $(this).val();
		var lengths = check(content);  //调用check函数取得当前字数

		//最大允许输入50个字
		if (lengths[0] >= 50) {
			$(this).val(content.substring(0, Math.ceil(lengths[1])));
		}

		var num = 50 - Math.ceil(lengths[0]);
		var msg = num < 0 ? 0 : num;
		//当前字数同步到显示提示
		$( '#font-num' ).html( msg );
	} );

	$( '#phiz img' ).click( function () {
		var phiz = '[' + $( this ).attr('alt') + ']';
		var obj = $( 'textarea[name=content]' );
		obj.val(obj.val() + phiz);
	} );

});

/**
* 元素拖拽
* @param  obj		拖拽的对象
* @param  element 	触发拖拽的对象
*/
function drag (obj, element) {
	var DX, DY, moving;

	element.mousedown(function (event) {
		obj.css( {
			zIndex : 1,
			opacity : 0.5,
 			filter : 'Alpha(Opacity = 50)'
		} );

		DX = event.pageX - parseInt(obj.css('left'));	//鼠标距离事件源宽度
		DY = event.pageY - parseInt(obj.css('top'));	//鼠标距离事件源高度

		moving = true;	//记录拖拽状态
	});

	$(document).mousemove(function (event) {
		if (!moving) return;

		var OX = event.pageX, OY = event.pageY;	//移动时鼠标当前 X、Y 位置
		var	OW = obj.outerWidth(), OH = obj.outerHeight();	//拖拽对象宽、高
		var DW = $(window).width(), DH = $(window).height();  //页面宽、高

		var left, top;	//计算定位宽、高

		left = OX - DX < 0 ? 0 : OX - DX > DW - OW ? DW - OW : OX - DX;
		top = OY - DY < 0 ? 0 : OY - DY > DH - OH ? DH - OH : OY - DY;

		obj.css({
			'left' : left + 'px',
			'top' : top + 'px'
		});

	}).mouseup(function () {
		moving = false;	//鼠标抬起消取拖拽状态

		obj.css( {
			opacity : 1,
 			filter : 'Alpha(Opacity = 100)'
		} );

	});
}

/**
 * 统计字数
 * @param  字符串
 * @return 数组[当前字数, 最大字数]
 */
function check (str) {
	var num = [0, 100];
	for (var i=0; i<str.length; i++) {
		//字符串不是中文时
		if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 255){
			num[0] = num[0] + 0.5;//当前字数增加0.5个
			num[1] = num[1] + 0.5;//最大输入字数增加0.5个
		} else {//字符串是中文时
			num[0]++;//当前字数增加1个
		}
	}
	return num;
}

