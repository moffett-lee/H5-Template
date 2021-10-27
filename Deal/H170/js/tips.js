$.fn.extend({
    tips: function (options) {
        var o = {
            delay: 200,
            relation: '',
            parent: window,
            reMaxWidth: 'auto',
            tgClass: '',
            padding: { l: 0, r: 0, b: 2, t: 2 },
            offset: false,
            //position: 'r', // t,r,b,l,lt,lb,rt,rb
            slide: 100
        };
        $.extend(o, options);
        var re = $(o.relation),
reMaxWidth = o.reMaxWidth,
margin = o.margin,
aTimer = null,
self = this;
        this.hover(
function () {
    aTimer = setTimeout(function () {
        var offset = self.position(), l, t, position = o.position;
        //if (o.offset) offset = self.offset();
        if (o.tgClass) self.addClass(o.tgClass);
        re.slideDown(o.slide);
        //alert(re.outerWidth())
        //璁＄畻relation鐨勫搴�
        if (reMaxWidth != 'auto') {
            //璁＄畻閲岄潰鍏冪礌瀹藉害鍊煎拰
            var allwidth = 0;
            re.children().each(function () {
                allwidth += $(this).outerWidth(true);
            });
            //debugger;
            if (allwidth > reMaxWidth) {
                re.width(reMaxWidth);
            }
            else {
                re.width(allwidth);
            }
        }
        var reWidth = re.outerWidth(), reBlankWidth = reWidth - re.width();
        //alert(re.outerWidth());
        //alert(reBlankWidth);
        //debugger;
        //璁＄畻闇€鎽嗘斁鐨勪綅缃�
        if (position == 'r') {
            var leftWidth = offset.left,
reParent = o.parent,
rightWidth = (reParent == window ? $(reParent).width() : $(reParent).outerWidth()) - leftWidth - self.outerWidth();
            alert(leftWidth);
            alert(reParent);
            alert(rightWidth);
            //alert(( o.parent == window ? $(o.parent).width() : $(o.parent).outerWidth) +'-'+ leftWidth +'-'+ self.outerWidth() +'='+ rightWidth +'<'+ reWidth);
            //debugger;
            if (rightWidth < reWidth) {
                if (rightWidth < leftWidth) {
                    if (leftWidth < reWidth) {
                        re.width(leftWidth - reBlankWidth - 2);
                    }
                    position = 'l';
                }
                else {
                    if (rightWidth < reWidth) {
                        re.width(rightWidth - reBlankWidth - 2);
                    }
                }
            }
        }
//        // else if(position == 'b'){
//        //
//        // }
        switch (position) {
            case 'r':
                l = offset.left + self.outerWidth() + margin.l;
                t = offset.top + margin.t;
                break;
            case 'l':
                l = offset.left - re.outerWidth() + margin.l;
                t = offset.top + margin.t;
                break;
            case 'b':
                //l = offset.left + margin.l;
                //t = offset.top + self.outerHeight() + margin.t;

                l = offset.left + self.outerWidth()/2-25;
                //alert(offset.left);
                //alert(self.outerWidth());
                //alert(l);
                t = self.height();
                //alert(l);
                //alert(offset.width);
                //alert(margin.l);
                //alert(t);                
                break;
            default: break;
        }
        //alert(l +'--'+ t)
        re.css({ 'left': l, 'top': t }).slideDown(o.slide);
    }, o.delay);
}, function () {
    clearTimeout(aTimer);
    aTimer = setTimeout(function () {
        self.removeClass(o.tgClass);
        re.slideUp(o.slide);
    }, o.delay);
}
)
        re.hover(
function () {
    clearTimeout(aTimer);
    $(this).slideDown(o.slide);
},
function () {
    clearTimeout(aTimer);
    aTimer = setTimeout(function () {
        self.removeClass(o.tgClass);
        re.slideUp(o.slide);
    }, o.delay);
}
);
    }
})