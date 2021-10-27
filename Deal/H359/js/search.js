function SearchSubmit(field, e)
{
    var keystr = field;
    if (keystr == "")
    {
        return false;
    }
    else if (keystr.length > 30)
    {
        return false;
    }
    var url = "http//msearch.jianke.com/prod?wd=" + encodeURI(keystr.replace("<", "").replace(">", "")).toLowerCase()+"&lg=1";
    window.location.href = url;
    if (window.event)
    {
        window.event.returnValue = false;
    }
    else e.preventDefault();
}

function checksearch(e)
{

    field = document.getElementById("wd").value;
    var eve = e || window.event;
    if (field == "" && eve.keyCode == 13)
    {

        alert("请输入搜索内容！");
        return false;
    }
    else if (eve.keyCode == 13)
    {
        SearchSubmit(field);
        return false;
    }
}