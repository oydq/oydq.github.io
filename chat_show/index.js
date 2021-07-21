$(function(){
	//LeanCloud初始化
	AV.init({
	  appId: "8voQy2KbUllhQ6T1eXEtrK9p-gzGzoHsz",
	  appKey: "eaSfopp9PqWpKoxovXSgbCLm"
	});
	//登录密匙框显示
	$("#bg").show();
	$("#window").show();
	
    //设置昵称按钮逻辑，显示设置昵称框
	$("#bottom").click(function(){
	    $("#bg2").show();
	    $("#window2").show();
	});
	
	//登录密匙框逻辑
    $("#setting").click(function(){
		var key = $("#key").val();
		var query=new AV.Query('chat');
		query.equalTo('key', key);
		query.find().then((chats) => {
			if(chats!=""){//查到密匙		
			//查询昵称设置标题
				chats.forEach (function (chat) {
				    $("#nicheng").val(chat.attributes.nickname);
					$("#nc").val(chat.attributes.nickname);
					$("#title").text("在线聊天，欢迎您！"+chat.attributes.nickname);
				});
			//隐藏登录密匙框
			$("#bg").hide();
			$("#window").hide();
			//每秒定时读取聊天内容，设置聊天框
			window.oldlength=0;
			window.rmsg3=setInterval(function(){
			     var query=new AV.Query('chat');
				 query.ascending('createdAt');
			     query.find().then((chats) => {
					  if(chats.length!=oldlength){//新消息条数不等于旧消息条数，则刷新聊天框，并且显示新消息提示框
					//刷新聊天框
					 $("#chat .window").html("");
					 chats.forEach (function (chat) {
					 						$("#chat .window").append( "<span style='color:#FF0000'>"+chat.attributes.nickname+"</span>\t<span style='color:green;'>"+chat.attributes.time+" </span><br/>"+
					 						chat.attributes.content+"<p><p/>"); 
											window.end=chat.attributes.nickname;
					 });
					if(end!=$("#nc").val()){
					var newmsg=chats.length-oldlength;
						 $("#chat .tishi").show();
						 $("#chat .tishi").html("<b>有新消息</b><span  style='cursor:pointer;color:blue' id='read'>[点击查看]</span>");
						 //点击了新消息提示框
						 $("#read").click(function(){
									//下移到最新消息，并且隐藏新消息提示框
						 		 	$("#chat .window").scrollTop($("#chat .window")[0].scrollHeight);
						 			 $("#chat .tishi").hide();
						 });
						 }else{
							 $("#chat .window").scrollTop($("#chat .window")[0].scrollHeight);
						 }
					 
				  }
				 //执行后本消息条数变为旧消息条数
				  oldlength=chats.length;

			     });
			 },1000);		
			}else{//未查到密匙
			alert("--登录密匙不存在--登录失败!--");}
		});
	});
	
	//设置昵称框逻辑
	$("#setting2").click(function(){
		var key = $("#key").val();
		var query=new AV.Query('chat');
		query.equalTo('key', key);
		query.find().then((chats) => {
			chats.forEach (function (chat) {
			var schat= AV.Object.createWithoutData('chat',chat.id);
			schat.set('nickname', $("#nc").val());
			schat.save();
			});
			//更新标题
			$("#title").text("在线聊天，欢迎您！"+$("#nc").val());
			$("#nicheng").val($("#nc").val());
			alert("设置成功!");
		});
		//隐藏设置昵称框
			$("#bg2").hide();
			$("#window2").hide();
	});
	
	//获取当前时间，用于存数据设置time
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
							
	//发送按钮逻辑	
    $("#send").click(function(){
		
        var content = $("#content").val();
        var nicheng = $("#nicheng").val();
		var key = $("#key").val();

    var Chat= AV.Object.extend('chat');
    var chat= new Chat();
    chat.set('nickname', nicheng);
    chat.set('content',content);
	chat.set('key',key);
    chat.set('time',year+"-"+month+"-"+day+"\t"+hour+":"+minute+":"+second);
	chat.save().then((chat) => {
	
	}, (error) => {
		alert("发送失败！");
	});
	//聊天输入框内容清空
   $("#content").val(null);
    });  
	
	
});