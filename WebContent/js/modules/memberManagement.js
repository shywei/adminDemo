var display_mode =0;//显示模式0图片，1表格
var userList=null;
utils.getMenu("戒毒人员","人员管理");
var selectImgTake = {
	"init" : function(divId, maxSelectNumber) {
		if (maxSelectNumber == null || maxSelectNumber == "") {
			selectImgTake.initSelectEvent(divId, -1);
		} else {
			selectImgTake.initSelectEvent(divId, maxSelectNumber);
		}
	},
	"initSelectEvent" : function(divId, maxSelectNumber) {
		$("#" + divId + " .item").on(
			"click",
			function() {
				var i_display = $(this).find(
						".img_isCheck i").css("visibility");
				if (i_display == "hidden") {
					if (maxSelectNumber != -1) {
						var selectImgDivs = selectImgTake
								.getSelectImgs(divId);
						if (selectImgDivs.length >= maxSelectNumber) {
							alert("最多只能选择"
									+ maxSelectNumber
									+ "张图片");
							return;
						}
					}
					$(this).find(".img_isCheck i").css(
							"visibility", "visible");
					$(this).attr("ischecked", "true");
				} else {
					$(this).find(".img_isCheck i").css(
							"visibility", "hidden");
					$(this).removeAttr("ischecked");
				}
			});
	},
	"getSelectImgs" : function(divId) {
		var selectImgDivs = $("#" + divId + " .item[ischecked='true']");
		return selectImgDivs;
	},
	"cancelInit" : function(divId) {
		$(".img_isCheck i").css("visibility", "hidden");
		$("#" + divId + " .item").removeAttr("ischecked");
	},
	"allSelect" : function(divId) {
		$(".img_isCheck i").css("visibility", "visible");
		$("#" + divId + " .item").attr("ischecked", "true");
	}
}


//检索
function getUserList(con){
	userList=null;
	//获取人员列表
	var params ={
			userName:$("#userName").val(),
			officalNumber:$("#officalNumber").val(),
			userState :$("#userState").val(),
			createTime :$("#createTime").val(),
			deptId:$("#deptId").val(),
			confirmChangeDept:$("#confirmChangeDept").val(),
			pageSize:$("#per-page").val(),
		};
	$.ajax({
		type: "post",
		async : false,
		url: utils.api_path+"/user/getUserList",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data:JSON.stringify($.extend(params,con)),
		success: function (data) {
			if(data.code==0){
				userList=data.obj;
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
				message: "请求发生错误",
				buttons: {
					ok: {
						label: '确定'
					}
				}
			});
		}
	});
	if(userList!=null){
		if(userList.results.length==0){
			$("#data_area").hide();
			$("#no_data").show();
			return;
		}
		$("#data_area").show();
		$("#no_data").hide();
		if(display_mode==0){
			$("#selectItemDiv").empty();
			//图片显示
			for(var i =0;i<userList.results.length;i++){
				var user_data=userList.results[i];
				$("#selectItemDiv").append('<div class="item"><div class="img_show"><img src="img/'
						+user_data.photoUrl+"\" onerror='this.onerror=null;this.src='img/no-people.png'\" /></div>"
						+'<div class="img_isCheck"><i class="iconfont icon-xuanzhong"></i></div></div>');
			}
			selectImgTake.init('selectItemDiv', -1);
		}else{
			$("#table_body").empty();
			//图片显示
			for(var i =0;i<userList.results.length;i++){
				var user_data=userList.results[i];
				$("#table_body").append('<tr><td></td><td>'+user_data.userName+'</td><td>'+user_data.officalNumber
						+'</td><td>'+user_data.userState+'</td><td>'+user_data.createTime+'</td><td>'+user_data.deptId+'</td><td>'+user_data.createTime
						+'</td><td>'+user_data.hasMetacarpalVein+'</td></tr>');
			}
		}
		$('#paging').paging({
			initPageNo : userList.page.currentPage, // 初始页码
			totalPages : userList.page.pageCount, //总页数
			totalCount : '合计' + userList.page.recordCount + '条数据', // 条目总数
			jump : true //是否支持跳转
		});

		$("#firstPage").click(function() {
			getUserList({pageNo:1});
		});
		$("#prePage").click(function() {
			getUserList({pageNo:userList.page.currentPage-1});
		});
		$("#nextPage").click(function() {
			getUserList({pageNo:userList.page.currentPage+1});
		});
		$("#lastPage").click(function() {
			getUserList({pageNo:userList.page.pageCount});
		});
		$("#jumpBtn").click(function() {
			getUserList({pageNo:$("#jumpText").val()});
		});
		$("#pageSelect li").click(function() {
			getUserList({pageNo:$(this).text()});
		});

	}else{
		$("#data_area").hide();
		$("#no_data").hide();
	}
}

$(document).ready(function() {	
	$("#cancel").click(function() {
		selectImgTake.cancelInit('selectItemDiv');
	});
	$("#selectAll").click(function() {
		selectImgTake.allSelect('selectItemDiv');
	});
	$("#display_table").click(function() {
		display_mode=1;
		$("#per-page").val(10);
		getUserList({pageNo:1});
	});
	$("#display_pic").click(function() {
		display_mode=0;
		$("#per-page").val(10);
		getUserList({pageNo:1});
	});
	$("#register").click(function() {
		$("#modal-example2").modal('show');
	});
	$("#edit_status").click(function() {
		bootbox.prompt({
		    title: "修改人员状态",
		    inputType: 'select',
		    inputOptions: [
		        {
		            text: '状态一',
		            value: '0',
		        },
		        {
		            text: '状态二',
		            value: '1',
		        },
		        {
		            text: '状态三',
		            value: '2',
		        },
		        {
		            text: '状态四',
		            value: '3',
		        }
		    ],
		    buttons: {
		        cancel: {
		            label: '取消'
		        },
		        confirm: {
		            label: '确定'
		        }
		    },
		    callback: function (result) {
		        console.log(result);
		    }
		});
	});
	$("#delete").click(function(){
		bootbox.confirm({
		    title: "释放人员",
		    message: "选定人员将离所不在册，请确认",
		    buttons: {
		        cancel: {
		            label: '取消'
		        },
		        confirm: {
		            label: '确定'
		        }
		    },
		    callback: function (result) {
		        console.log('This was logged in the callback: ' + result);
		    }
		});
	});

	$('.form_date').datetimepicker({
		language:  'zh-CN',
		weekStart: 1,
		todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
	});

	$("#search_form").validate({
		rules : {
			name : {
				required : true,
				minlength : 2
			},
			number : {
				required : true,
				minlength : 5
			}
		},
		messages : {
			name : {
				required : "请输入用户名",
				minlength : "用户名必需由两个字母组成"
			},
			number : {
				required : "请输入密码",
				minlength : "密码长度不能小于 5 个字母"
			}
		},
		submitHandler : function(form) {
			alert("提交事件!");
		}
	});

	getUserList({pageNo:1});
});