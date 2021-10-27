//各种产品状态校验
function InitCart(jsonDate) {
    if (jsonDate.PrescriptionType == 4 || jsonDate.PrescriptionType == 5) {
        mesgbox('咨询', '&nbsp;&nbsp;本药属国家处方类药品，为了保证用药安全，需要在医师指导下用药或凭<p>医师处方购买。如需用药指导，请联系在线医生或致电4006666800，谢谢！</p>', openchat);
        return false;
    }
    if (jsonDate.OurPrice < 1) {
        alert("对不起当前产品价格为0，不能加入购物车!");
        return false;
    }
    switch (jsonDate.ProductStatusType) {
        case 4:
            alert("对不起当前产品缺货，不能加入购物车!"); return false;
            break;
        case 3:
        case 8:
        case 9:
            alert("对不起当前产品已下架，不能加入购物车!"); return false;
            break;
    }
    return true;
}

//购买数量校验
function IsPcount(pcount, Promotions, Restriction) {
    if (!isnum("" + pcount + "") || pcount == "" || pcount < 1) {
        alert("购买数量必须是大于0的正整数！");
        return false;
    }
    if (Promotions == "1" && Restriction > 0) {
        if (parseInt(pcount) > parseInt(Restriction)) {
            alert("对不起，当前产品最大限购数量为：" + Restriction);
            return false;
        }
    }
    return true;
}
//立即购买
function BuyNow(jsonDate, pcount) {
    if (InitCart(jsonDate) == false) {
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/purchase/InitCart",
        cache: "false",
        data: { productCode: jsonDate.pid, pcount: pcount, NoCache: Math.random() },
        success: function (result) {
            if (result != "") {
                eval("result =" + result);
                if (result.BuyStatus != undefined) {
                    if (result.BuyStatus == 800) {
                        alert("本药属国家处方类药品,请联系在线医生或致电4006666800，谢谢！");                        
                        return false;
                    }
                    if (result.BuyStatus == 801) {
                        alert("对不起当前产品缺货，如需购买请联系客服处理。");
                        return false;
                    }
                }
                if (result.pcount != undefined) {
                    IsPcount(result.pcount, result.IsControl, result.ControlNumber)
                }
                window.location.href = "/purchase/shoppingcart?backurl=" + escape(document.URL);
            }
        }
    });
}

//加入购物车
function AddCart(jsonDate, pcount) {
    if (InitCart(jsonDate) == false) {
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/purchase/InitCart",
        data: { productCode: jsonDate.pid, pcount: pcount, NoCache: Math.random() },
        success: function (result) {
            if (result != "") {
                eval("result =" + result);
                if (result.BuyStatus != undefined) {
                    if (result.BuyStatus == 800) {
                        alert("本药属国家处方类药品,请联系在线医生或致电4006666800，谢谢！");
                        return false;
                    }
                    if (result.BuyStatus == 801) {
                        alert("对不起当前产品缺货，如需购买请联系客服处理。");
                        return false;
                    }
                }
                if (result.pcount != undefined) {
                    if (!IsPcount(result.pcount, result.IsControl, result.ControlNumber)) {
                        return false;
                    }
                }
                if (jsonDate.AddType == 2) {
                    AlertLeftNumber(result.TotalNum);
                }
                else {
                    AlertLeftNumber(result.TotalNum);
                }
            }
        }
    });
}

function AlertLeftNumber(TotalNum) {
    $("#shoppingNumber").html(TotalNum);
    alert("添加成功！");
}

function AddMyFav(pid)
{
    $.ajax({
        type: "POST",
        url: "/ajax/AddMyFav",
        data: { productCode: pid },
        success: function (result)
        {
            if (result == "801")
            {
                alert("产品收藏成功！")
            }
            if (result == "802")
            {
                alert("您已经收藏过该产品！");
            }
            if (result == "800")
            {
                alert("请先登录后再收藏！");
                window.location.href = "/user/login?backurl=" + escape(document.URL);
            }
        }
    });
}
//文本框焦点离开事件
function CarProdUpdateText(jsonDate) {
    var $this = $("#text_" + jsonDate.pid);
    if (!IsPcount($this.val(), jsonDate.Promotions, jsonDate.Restriction)) {
        $this.val($this.attr("val"));
        $this.focus();
        return false;
    }
    if ($this.val() != $this.attr("val")) {
        UpdateItem(jsonDate.pid, $this.val(), jsonDate.mark);
    }
}

//修改购买数量
function EditQuantity(val) {
    switch (val) {
        case "+":
            if ($("#ControlNumber")[0]) {
                if (parseInt($("#QuantityText").val()) == parseInt($("#ControlNumber").html()))                    
                    return false;
            }
            $("#QuantityText").val(parseInt($("#QuantityText").val()) + 1);
            break;
        case "-":
            if ($("#QuantityText").val() == 1) return false;
            $("#QuantityText").val(parseInt($("#QuantityText").val()) - 1);
            break;
    }
}
//文本框修改数量
function ProdUpdateText($this) {
    if (!isnum($this.value) || $this.value == "" || $this.value < 1) {
        $this.focus();
        $this.value = 1;
        return false;
    }
    if ($("#ControlNumber")[0]) {
        if (parseInt($this.value) > parseInt($("#ControlNumber").html())) {
            $this.value = 1;
            shake($("#spanContorlnumber"), "red", 4);
            $this.focus();
            return false;
        }
    }
}
//获取评价总数
function GetEvaluateCount(pid)
{
    $.ajax({
        type: "Get",
        url: "/ajax/GetFavCount",
        data: "productCode=" + pid,
        success: function (result)
        {
            result = eval(result);
            $("#Evaluate").attr("Score", result[0].TotalEvaluate);
            $("#PjCount").html(result[0].Evaluate);
        }
    });
}

function ProdEvaluate(pcode, type)
{
    if ($("#PjCount").html() == '0')
    {
        $("#pinglunlist").html("<span>暂无产品评价！</span>");
        showIntroMore('divEvalMore');
    }
    else
    {
        $.ajax({
            type: "Get",
            url: "/ajax/ProdEvaluate",
            data: "productCode=" + pcode + "&type=" + type + "",
            success: function (result)
            {
                $("#pinglunlist").html(result);
		showIntroMore('divEvalMore');
            }
        });
    }
}
//优惠组合购买
function PreferentialAddCart(productCode)
{
    $.ajax({
        type: "POST",
        url: "/purchase/PreferentialAddCart",
        cache: "false",
        data: { id: productCode, NoCache: Math.random() },
        success: function (result)
        {
            if (result != "")
            {
                eval("result =" + result);
                if (result.pcount != undefined)
                {
                    IsPcount(result.pcount, result.IsControl, result.ControlNumber)
                }
                window.location.href = "/purchase/shoppingcart?backurl=" + escape(document.URL);
            }
        }
    });
}