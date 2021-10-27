(function(X) {
	if(!X)return;
	window.NTUI = {};	
	/*nav*/
	NTUI.htmlHelper = {};
	NTUI.htmlHelper.navigator = function(){
		var sitemapHolder = X('.navArea>nav');
		X('.navBtnBottom').click(function(){
			var t=this,triIcon = t.children[0],container=X(t.parentNode),navArea = container.find('.navArea');
			if(triIcon.className==='triUp'){
				triIcon.className='triDown';
			}
			else{
				triIcon.className='triUp';
			}
			navArea.toggleClass('hide');
			container.toggleClass('active');
			setTimeout(function(){NTUI.scrollToEl(t)},10);
		});
		X('.navBtnTop').click(function(){
			var t=this,triIcon = t.children[0],container=X(t.parentNode),navArea = container.find('.navArea');
			if(triIcon.className==='triUp'){
				triIcon.className='triDown';
			}
			else{
				triIcon.className='triUp';
			}
			navArea.toggleClass('hide');
			container.toggleClass('active');
		});
	}
	
	NTUI.scrollToEl = function(el) {
        var y = 0;
        while (el != null) {
            y += el.offsetTop;
            el = el.offsetParent;
        }
        scrollTo(0, y);
    }
	
	/*图片轮播*/	
    var nav = navigator;
    NTUI.iOS5 = nav.userAgent.match(/OS 5_/i) != null;
    NTUI.hasTouch = hasTouch = 'ontouchstart' in window,
    NTUI.has3d = has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
    NTUI.vendor = vendor = (/webkit/i).test(nav.appVersion) ? 'webkit': (/firefox/i).test(nav.userAgent) ? 'Moz': 'opera' in window ? 'O': (/MSIE/i).test(nav.userAgent) ? 'ms': '',
    RESIZE_EV = 'onorientationchange' in window ? 'orientationchange': 'resize',
    START_EV = hasTouch ? 'touchstart': 'mousedown',
    MOVE_EV = hasTouch ? 'touchmove': 'mousemove',
    END_EV = hasTouch ? 'touchend': 'mouseup',
    CANCEL_EV = hasTouch ? 'touchcancel': 'mouseup',
    TRANSITIONEND_EV = 'webkitTransitionEnd';
    if (vendor === 'Moz') {
        TRANSITIONEND_EV = 'transitionend';
    }
    else if (vendor === 'O') {
        TRANSITIONEND_EV = 'oTransitionEnd';
    }
    else if (vendor === 'ms') {
        TRANSITIONEND_EV = 'MSTransitionEnd';
    }
    NTUI.trnOpen = trnOpen = 'translate' + (has3d ? '3d(': '('),
    NTUI.trnClose = trnClose = has3d ? ',0)': ')',
    NTUI.slide = function(el, options) {
        this.wrapper = el;
        this.slider = this.wrapper.children[0];
        this.wrapper.style.overflow = 'hidden';
        this.options = {
            enabled: true,
            autoInit: true,
            autoSize: true,
            varyHeight: false,
            loop: true,
            bounce: true,
            lockDirection: true,
            page: this.slider.children.length,
            wrapperW: null,
            sliderW: null,
            onBeforeSlideStart: function(e) {
                e.preventDefault();
            },
            onSlideStart: null,
            onBeforeSlideMove: null,
            onSlideMove: null,
            onBeforeSlideEnd: null,
            onSliding: null,
            onTouchEnd: null,
            onDestroy: null,
            onInit: null
        };
        var i;
        for (i in options) this.options[i] = options[i];
        if (this.options.autoInit) {
            this.refresh();
        }
        if (this.options.varyHeight) this.slider.style.overflow = 'hidden';
        this._bind(START_EV);
    };
    NTUI.slide.prototype = {
        x: 0,
        cp: 0,
        handleEvent: function(e) {
            var t = this;
            switch (e.type) {
            case START_EV:
                if (!hasTouch && e.button !== 0) return;
                t._start(e);
                break;
            case MOVE_EV:
                t._move(e);
                break;
            case END_EV:
            case CANCEL_EV:
                t._end(e);
                break;
            case TRANSITIONEND_EV:
                t._transitionend(e);
                break;
            }
        },
        _pos: function(x, time) {
            if (!this.options.enabled) return;
            if (time) {
                this.slider.style[vendor + 'TransitionDuration'] = time + 's';
            }
            else {
                this.slider.style[vendor + 'TransitionDuration'] = '0s';
            }
            this.slider.style[vendor + 'Transform'] = trnOpen + x + 'px,0' + trnClose;
            if (this.options.onSliding) this.options.onSliding.call(this, this.deltaX);
        },
        _bind: function(type, el, bubble) { (el || this.slider).addEventListener(type, this, !!bubble);
        },
        _unbind: function(type, el, bubble) { (el || this.slider).removeEventListener(type, this, !!bubble);
        },
        refresh: function() {
            var t = this;
            t.offset = t.cp = t.preP = 0;
            t.wrapperW = t.options.wrapperW ? t.options.wrapperW: t.wrapper.clientWidth ? t.wrapper.clientWidth: screen.width;
            t.sliderW = t.options.sliderW ? t.options.sliderW: t.wrapperW * t.options.page;
            var s = t.slider,
            sc = s.children;
            sc[0].style.webkitPerspective = sc[sc.length - 1].style.webkitPerspective = '1000';
            if (t.options.autoSize) s.style.width = t.options.page * t.wrapperW + 'px';
            t.maxScrollX = t.wrapperW - t.sliderW;
            if (t.options.loop) {
                var tmp = sc[sc.length - 1].cloneNode(true);
                tmp.id = null;
                tmp.style.webkitPerspective = '1000';
                s.insertBefore(tmp, sc[0]);
                tmp = sc[1].cloneNode(true);
                tmp.id = null;
                s.appendChild(tmp);
                var newpage = t.options.page + 2,
                i = 0;
                if (t.options.autoSize) {
                    s.style.width = newpage * t.wrapperW + 'px';
                    for (; i < newpage; i++) {
                        sc[i].style.width = t.wrapperW + 'px';
                    }
                }
                t.deltaX = 0;
                t.offset = -t.wrapperW;
                t._pos(t.offset);
            }
            if (t.options.varyHeight) {
                for (var i = 0; i < sc.length; i++) {
                    sc[i].style.webkitPerspective = '1000';
                }
                t.adjustHeight();
            }
            if (t.options.onInit) t.options.onInit.call(t);
        },
        _resize: function() {
            var t = this;
            t.wrapperW = t.options.wrapperW ? t.options.wrapperW: t.wrapper.clientWidth ? t.wrapper.clientWidth: screen.width;
            t.sliderW = t.options.sliderW ? t.options.sliderW: t.wrapperW * t.options.page;
            t.maxScrollX = t.wrapperW - t.sliderW;
            t.offset = -t.wrapperW * t.options.loop ? t.cp + 1: t.cp;
            t._pos(t.offset);
            if (t.options.varyHeight) setTimeout(function() {
                t.adjustHeight()
            },
            10);
        },
        slideToPage: function(pno, time, triggerEndEvent) {
            var t = this;
            pno = parseInt(pno);
            if (t.cp - pno) {
                t.preP = t.cp;
                t.cp = pno;
                t.offset = t.options.loop ? -(pno + 1) * t.wrapperW: -pno * t.wrapperW;
                t._pos(t.offset, time);
            }
            if (triggerEndEvent && t.options.onTouchEnd) t.options.onTouchEnd.call(t, null, t.cp, t.preP);
            if (t.options.varyHeight && time) setTimeout(function() {
                t.adjustHeight()
            },
            time * 1000);
        },
        next: function(time, triggerEndEvent) {
            var t = this;
            if (t.cp + 1 === t.options.page) {
                if (t.options.loop) {
                    t.cp = 0;
                    t.offset -= t.wrapperW;
                    t._bind(TRANSITIONEND_EV);
                    t.endCallBack = function() {
                        t._unbind(TRANSITIONEND_EV);
                        t.offset = -t.wrapperW;
                        t._pos(t.offset);
                    }
                    t._pos(t.offset, time);
                    if (triggerEndEvent && t.options.onTouchEnd) t.options.onTouchEnd.call(t, null, t.cp, t.preP);
                }
            }
            else {
                t.slideToPage(t.cp + 1, time, triggerEndEvent);
            }
            if (t.options.varyHeight && time) setTimeout(function() {
                t.adjustHeight()
            },
            time * 1000);
        },
        prev: function(time, triggerEndEvent) {
            var t = this;
            if (t.cp === 0) {
                if (t.options.loop) {
                    t.cp = t.options.page - 1;
                    t.offset += t.wrapperW;
                    t._bind(TRANSITIONEND_EV);
                    t.endCallBack = function() {
                        t._unbind(TRANSITIONEND_EV);
                        t.offset = -t.wrapperW * t.options.page;
                        t._pos(t.offset);
                    }
                    t._pos(t.offset, time);
                    if (triggerEndEvent && t.options.onTouchEnd) t.options.onTouchEnd.call(t, null, t.cp, t.preP);
                }
            }
            else {
                t.slideToPage(t.cp - 1, time, triggerEndEvent);
            }
            if (t.options.varyHeight && time) setTimeout(function() {
                t.adjustHeight()
            },
            time * 1000);
        },
        adjustHeight: function() {
            var cEl = this.options.loop ? this.slider.children[this.cp + 1] : this.slider.children[this.cp];
            if (cEl) this.slider.style.height = getComputedStyle(cEl, null).height;
        },
        _start: function(e) {
            var t = this,
            point = hasTouch ? e.touches[0] : e,
            matrix,
            x;
            if (t.endCallBack) return;
            if (!t.options.enabled) return;
            if (t.options.onBeforeScrollStart) t.options.onBeforeScrollStart.call(t, e);
            t.absDistX = 0;
            t.absDistY = 0;
            t.pointX = point.pageX;
            t.pointY = point.pageY;
            t.directionLocked = false;
            if (t.options.onSlideStart) t.options.onSlideStart.call(t, e);
            t._bind(MOVE_EV);
            t._bind(END_EV);
            t._bind(CANCEL_EV);
        },
        _move: function(e) {
            var t = this,
            newX,
            point = hasTouch ? e.touches[0] : e,
            deltaX = point.pageX - t.pointX,
            deltaY = point.pageY - t.pointY;
            if (t.directionLocked === 'y') {
                return;
            }
            else if (t.directionLocked === 'x') {
                e.preventDefault();
            }
            else {
                if (t.options.lockDirection) {
                    t.absDistX = Math.abs(deltaX);
                    t.absDistY = Math.abs(deltaY);
                    if (t.absDistX < 4) {
                        return;
                    }
                    if (t.absDistY > t.absDistX * 0.58) {
                        t.deltaX = 0;
                        t.directionLocked = 'y';
                        return;
                    }
                    else {
                        e.preventDefault();
                        t.directionLocked = 'x';
                    }
                }
            }
            newX = t.offset + deltaX;
            if (t.options.onBeforeScrollMove) t.options.onBeforeScrollMove.call(t, e);
            if (!t.options.loop && (deltaX > 0 && t.cp === 0 || newX < t.maxScrollX && t.cp === t.options.page - 1)) {
                newX = t.options.bounce ? t.offset + (deltaX / 2) : newX >= 0 || t.maxScrollX >= 0 ? 0: t.maxScrollX;
            }
            t.deltaX = deltaX;
            t._pos(newX);
        },
        _end: function(e) {
            if (hasTouch && e.touches.length != 0) return;
            var t = this,
            point = hasTouch ? e.changedTouches[0] : e,
            target,
            ev,
            newPosX = t.x;
            t._unbind(MOVE_EV);
            t._unbind(END_EV);
            t._unbind(CANCEL_EV);
            if (t.options.onBeforeSlideEnd) t.options.onBeforeSlideEnd.call(t, e);
            t._bind(TRANSITIONEND_EV);
            e.moved = false;
            t.preP = t.cp;
            var loop = t.options.loop;
            if (t.deltaX < -50) {
                t.deltaX = 0;
                if (++t.cp === t.options.page) {
                    if (loop) {
                        t.cp = 0;
                        t.offset -= t.wrapperW;
                        t.endCallBack = function() {
                            t._unbind(TRANSITIONEND_EV);
                            t.offset = -t.wrapperW;
                            t._pos(t.offset);
                        }
                        t._pos(t.offset, 0.4);
                        e.moved = 'left';
                    }
                    else {
                        t.cp--;
                        t._pos(t.offset, 0.4);
                    }
                }
                else {
                    t.offset -= t.wrapperW;
                    t._pos(t.offset, 0.4);
                    e.moved = 'left';
                }
            }
            else if (t.deltaX > 50) {
                t.deltaX = 0;
                if (--t.cp === -1) {
                    if (loop) {
                        t.cp = t.options.page - 1;
                        t.offset += t.wrapperW;
                        t.endCallBack = function() {
                            t._unbind(TRANSITIONEND_EV);
                            t.offset = -t.wrapperW * t.options.page;
                            t._pos(t.offset);
                        }
                        t._pos(t.offset, 0.4);
                        e.moved = 'right';
                    }
                    else {
                        t.cp++;
                        t._pos(t.offset, 0.4);
                    }
                }
                else {
                    t.offset += t.wrapperW;
                    t._pos(t.offset, 0.4);
                    e.moved = 'right';
                }
            }
            else {
                t._pos(t.offset, 0.4);
            }
            if (t.options.onTouchEnd) t.options.onTouchEnd.call(t, e, t.cp, t.preP);
        },
        _transitionend: function(e) {
            var t = this;
            if (t.endCallBack) {
                t.endCallBack();
                t.endCallBack = null;
            }
            if (t.options.varyHeight) t.adjustHeight();
            t._unbind(TRANSITIONEND_EV);
        },
        _mouseout: function(e) {
            var t = e.relatedTarget;
            if (!t) {
                this._end(e);
                return;
            }
            while (t = t.parentNode) if (t == this.wrapper) return;
            this._end(e);
        },

    };
})(x$)