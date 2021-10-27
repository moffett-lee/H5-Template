
//页面加载完毕加载的脚本
$(function () {
    //控制说明显示
    $(".fold_b").click(function () {
        $(this).parent("div").parent("div").parent("div").children(".g_c").children(".m_c,.recommend").addClass("hidden");
        $(this).parent("div").parent("div").parent("div").children(".g_c").children(".tit_t,.bl").children("a").removeClass("fold_up");
        $(this).parent("div").parent("div").children(".m_c,.recommend").removeClass("hidden");
        $(this).addClass("fold_up");
        //锚点
        var a = $(this).parent("div").parent("div").attr("id");
        if (a != "") {
            $("html,body").animate({ scrollTop: $("#" + a).offset().top }, 1);
        }
    });
});

//价格列表页面跳转
function JumpOnclick(productID, confirmType, type, wapDomain) {
    var jumpPage = $("#input_jump").val();
    if (type == 1) {
        window.location.href = wapDomain + "/Product/FreeTourSalesList?productID=" + productID + "&confirmType=" + confirmType + "&pageNow=" + jumpPage;
    } else {
        window.location.href = wapDomain + "/Product/GroupTourSalesList?productID=" + productID + "&confirmType=" + confirmType + "&pageNow=" + jumpPage;
    }
}
//参团出行人数改变
function GroupPersonChange(price) {
    var personNum = $("#sel_person").val();
    if (parseInt(personNum)) {
        personNum = parseInt(personNum);
    } else {
        personNum = 1;
    }
    $("#sel_person").val(personNum);
    $("#i_price").html("￥" + personNum * parseInt(price));
}
//自由行出行人数和房间改变
function FreePersonOnchange() {
    var adultAirPrice = $("#hid_adultAirPrice").val();
    var childAirPrice = $("#hid_childAirPrice").val();
    var roomPrice = $("#hid_roomPrice").val();
    var adultNum = $("#sel_adult").val();
    var childNum = $("#sel_child").val();
    var roomNum = $("#input_room").val();
    if (parseInt(adultNum)) {
        adultNum = parseInt(adultNum);
    } else {
        adultNum = 1;
    }
    if (parseInt(childNum)) {
        childNum = parseInt(childNum);
    } else {
        childNum = 0;
    }
    if (parseInt(roomNum)) {
        roomNum = parseInt(roomNum);
    } else {
        roomNum = 1;
    }
    var maxRoomNum = parseInt(adultNum);
    var minRoomNum = parseInt(parseInt(adultNum) / 2);
    if ((parseInt(adultNum) % 2) > 0) {
        minRoomNum = parseInt(parseInt(adultNum) / 2) + 1;
    }
    if (roomNum < minRoomNum) {
        roomNum = minRoomNum;
    } else if (roomNum > maxRoomNum) {
        roomNum = maxRoomNum;
    }

    $("#sel_adult").val(adultNum);
    $("#sel_child").val(childNum);
    $("#input_room").val(roomNum);
    var priceCount = adultNum * parseInt(adultAirPrice) + childNum * parseInt(childAirPrice) + roomNum * parseInt(roomPrice);
    $("#i_price").html("￥" + priceCount);
}
//抢优惠出行人数变更
function QiangPersonChange(discountID, maxNum, wapDomain) {
    var personNum = $("#input_person").val();
    if (parseInt(personNum)) {
        personNum = parseInt(personNum);
    } else {
        personNum = 1;
    }
    if (personNum > maxNum) {
        personNum = maxNum;
    }
    $("#input_person").val(personNum);
    var roomNum = $("#input_room").val();
    if (parseInt(roomNum)) {
        roomNum = parseInt(roomNum);
    } else {
        roomNum = 1;
    }
    var maxRoomNum = parseInt(personNum);
    var minRoomNum = parseInt(parseInt(personNum) / 2);
    if ((parseInt(personNum) % 2) > 0) {
        minRoomNum = parseInt(parseInt(personNum) / 2) + 1;
    }
    if (roomNum < minRoomNum) {
        roomNum = minRoomNum;
    } else if (roomNum > maxRoomNum) {
        roomNum = maxRoomNum;
    }
    $("#input_room").val(roomNum);
    $.ajax({
        type: "POST",
        url: wapDomain + "/Order/GetQiangOrderPrice",
        data: "discountID=" + discountID + "&personNum=" + personNum + "&roomNum=" + roomNum,
        success: function (msg) {
            $("#i_price").html("￥" + msg);
        }
    });


}
//参团产品预定
function ValidAndSubmitGroupReserve() {
    $("#i_error").html("");
    var email = $("#input_email").val();
    var phone = $("#input_phone").val();
    var person = $("#sel_person").val();
    var name = $("#input_name").val();
    if (email == "") {
        $("#i_error").html("联系人邮箱不能为空");
        return false;
    } else if (!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        $("#i_error").html("联系人邮箱格式错误");
        return false;
    } else if (phone == "") {
        $("#i_error").html("联系人手机号不能为空");
        return false;
    } else if (!phone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
        $("#i_error").html("联系人手机号输入错误");
        return false;
    } else if (name == "") {
        $("#i_error").html("联系人姓名不能为空");
        return false;
    }
    $("#sub").click();
    //参团产品预定
    //window.location.href = wapDomain + "/Order/GroupOrder?userName=" + escape(name) + "&email=" + email + "&mobile=" + phone + "&productID=" + productID + "&groupID=" + groupID + "&guestNum=" + person + "&confirmType=" + confirmType + "&departDate=" + departDate + "&productName=" + productName;
}


////自由行产品预定
function ValidAndSubmitFreeReserve() {
    $("#i_error").html("");
    var email = $("#input_email").val();
    var name = $("#input_name").val();
    var phone = $("#input_phone").val();
    var adult = $("#sel_adult").val();
    var child = $("#sel_child").val();
    var room = $("#input_room").val();
    var name = $("#input_name").val();
    if (email == "") {
        $("#i_error").html("联系人邮箱不能为空");
        return false;
    } else if (!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        $("#i_error").html("联系人邮箱格式错误");
        return false;
    } else if (phone == "") {
        $("#i_error").html("联系人手机号不能为空");
        return false;
    } else if (!phone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
        $("#i_error").html("联系人手机号输入错误");
        return false;
    } else if (room == "") {
        $("#i_error").html("房间数不能为空");
        return false;
    } else if (parseInt(room)) {
        if (parseInt(room) <= 0) {
            $("#i_error").html("房间数不能小于“0”");
            return false;
        }
    } else if (name == "") {
        $("#i_error").html("联系人姓名不能为空");
        return false;
    }
    $("#sub").click();
}

//抢优惠产品预定
function ValidAndSubmitQiangReserve(activityID, wapDomain, productName) {
    $("#i_error").html("");
    var email = $("#input_email").val();
    var phone = $("#input_phone").val();
    var person = $("#input_person").val();
    var name = $("#input_name").val();
    var roomNum = $("#input_room").val();
    var maxBookingNum = $("#maxBookingNum").val();
    var minBookingNum = $("#minBookingNum").val();
    if (email == "") {
        $("#i_error").html("联系人邮箱不能为空");
        return false;
    } else if (!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        $("#i_error").html("联系人邮箱格式错误");
        return false;
    } else if (phone == "") {
        $("#i_error").html("联系人手机号不能为空");
        return false;
    } else if (!phone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
        $("#i_error").html("联系人手机号输入错误");
        return false;
    } else if (person == "") {
        $("#i_error").html("出行人数不能为空");
        return false;
    } else if (name == "") {
        $("#i_error").html("联系人姓名不能为空");
        return false;
    }
    if (roomNum == "") {
        $("#i_error").html("房间数不能为空");
        return false;
    } else if (parseInt(roomNum,10)) {
        if (parseInt(roomNum) <= 0) {
            $("#i_error").html("房间数不能小于“0”");
            return false;
        }
    }else {
        $("#input_room").val("1");
        return false;
    }
    if (parseInt(minBookingNum, 10) && parseInt(person, 10)) {
        if (parseInt(person, 10) < parseInt(minBookingNum, 10)) {
            $("#i_error").html("该产品一次最少预订" + parseInt(minBookingNum, 10) + "人");
            return false;
        }
    }

    if (parseInt(maxBookingNum, 10) && parseInt(person, 10)) {
        if (parseInt(person, 10) > parseInt(maxBookingNum, 10)) {
            $("#i_error").html("该产品一次最多预订" + parseInt(maxBookingNum, 10) + "人");
            return false;
        }
    }

    $("#sub").click();
    //抢优惠产品预定
    //window.location.href = wapDomain + "/Order/QiangOrder?userName=" + escape(name) + "&email=" + email + "&mobile=" + phone + "&activityID=" + activityID + "&guestNum=" + person + "&roomNum=" + roomNum + "&productName=" + productName;
}