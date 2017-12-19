var utils;
window.utils=utils={
	getMenu:function(menuName,modelName){
		if(sessionStorage.menu==null){
			//获取菜单
			$.ajax({
		        type: "post",
		        async : false,
		        url: "http://localhost:8080/ServicePortal_webapi/api/authority/getMenuById",
		        dataType: "json",
		        contentType: "application/json;charset=utf-8",
		        data:JSON.stringify({loginUserId:JSON.parse(sessionStorage.userInfo).id
		        }),
		        success: function (data) {
		        	if(data.code==0){
		        		sessionStorage.setItem("menu",JSON.stringify(data));
		        	}else{
		        		bootbox.alert({
		        		    message: data.message,
		        		    buttons: {
		        		        ok: {
		        		            label: '确定'
		        		        }
		        		    },
		        		    callback: function (result) {
		        		    }
		        		});
		        	}
		        },
		        error: function (XMLHttpRequest, textStatus, errorThrown) {
		        	bootbox.alert({
		    		    message: "系统错误",
		    		    buttons: {
		    		        ok: {
		    		            label: '确定'
		    		        }
		    		    }
		    		});
		        }
		    });
		}
		var menu =JSON.parse(sessionStorage.menu);
		for(var i=0;i<menu.obj.length;i++){
			if(menu.obj[i].menuName==menuName){
				var code = '<li class="active"><a class="dropdown-collapse in" href="#"><i class="'+menu.obj[i].icon+'"></i> <span>'+menu.obj[i].menuName+'</span> <i class="icon-angle-down angle-down"></i> </a> <ul class="in nav nav-stacked">';
			}else{
				var code = '<li><a class="dropdown-collapse" href="#"><i class="'+menu.obj[i].icon+'"></i> <span>'+menu.obj[i].menuName+'</span> <i class="icon-angle-down angle-down"></i> </a> <ul class="nav nav-stacked">';
			}
			for(var m=0;m<menu.obj[i].child.length;m++){
				if(menu.obj[i].child[m].modelName==modelName){
					code =code+'<li class="active"><a href="'+menu.obj[i].child[m].modelUrl+'"> <i class="icon-caret-right"></i> <span>'+menu.obj[i].child[m].modelName+'</span></a></li>';
				}else{
					code =code+'<li class=""><a href="'+menu.obj[i].child[m].modelUrl+'"> <i class="icon-caret-right"></i> <span>'+menu.obj[i].child[m].modelName+'</span></a></li>';
				}
			}
			code =code+'</ul></li>';
			$("#menu").append(code);
		}
	},
	getTime:function(){
		var now=new Date();
		var year=now.getFullYear();
		var month=now.getMonth()+1;
		if(month<10){
			month="0"+month;
		}
		var day=now.getDate();
		if(day<10){
			day="0"+day;
		}
		var hours=now.getHours();
		if(hours<10){
			hours="0"+hours;
		}
		var minutes=now.getMinutes();
		if(minutes<10){
			minutes="0"+minutes;
		}
		var seconds=now.getSeconds();
		if(seconds<10){
			seconds="0"+seconds;
		}
		return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
	}
}
