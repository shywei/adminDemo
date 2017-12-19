$(function() {
			if(sessionStorage.userInfo==null){
	    		window.location.href='login.html';
	    	}
			$("#head").load("header.html",
					function(responseTxt, statusTxt, xhr) {
						$("#time").text(utils.getTime());
						$("#userName").text(JSON.parse(sessionStorage.userInfo).userName);
						$("#logout").click(function() {
							bootbox.confirm({
								message : "确定退出吗？",
								buttons : {
									confirm : {
										label : '确定'
									},
									cancel : {
										label : '取消'
									}
								},
								callback : function(result) {
									if(result){
										sessionStorage.clear();
										window.location.href='login.html';
									}
								}
							});
						});
					});
		});