/**
 * parachutejs - inertia scrolling/parallax jquery library
 * @version v0.0.5
 * @link https://github.com/derekborland/parachutejs#readme
 * @license MIT
 */
!function(t){"use strict";var r=function(){this.options,this.$window,this.$scrollContainer,this.$heightContainer,this.$anchorLinks,this.windowHeight,this.scrollTop=0,this.currentScrollTop=0,this.triggerArray=[],this.parallaxArr=[],this.disabled=!1};r.DEFAULTS={scrollContainer:"#scrollContainer",heightContainer:"#heightContainer",easingMultiplier:.075},r.prototype.init=function(){this.$window=t(window),this.onResize(),this.initEvents(),this.initAnchorLinks(),this.onEnterFrame()},r.prototype.reload=function(){this.reset(),this.onResize()},r.prototype.reset=function(){this.triggerArray.length=0,this.parallaxArr.length=0},r.prototype.disable=function(){this.disabled=!0},r.prototype.enable=function(){this.disabled=!1},r.prototype.initEvents=function(){this.$window.resize(t.proxy(this.onResize,this)),this.$window.scroll(t.proxy(this.onScroll,this))},r.prototype.initAnchorLinks=function(){var r=this;this.checkURLHash(),this.$anchorLinks=t('a[href^="#"]'),this.$anchorLinks.each(function(){var i=t(this);i.addClass("parachute-anchor-active"),i.on("click",function(){var t=i[0].hash.split("#")[1];r.scrollToAnchor(t)})})},r.prototype.checkURLHash=function(){var t=window.location.hash.split("#")[1];t&&this.scrollToAnchor(t)},r.prototype.scrollToAnchor=function(r){var i,o=t('a[id="'+r+'"]');o.length&&(i=o[0].getBoundingClientRect().top,setTimeout(function(){t(window).scrollTop(i)},0))},r.prototype.page=function(i){this.options=t.extend({},r.DEFAULTS,i),this.$scrollContainer=t(this.options.scrollContainer),this.$heightContainer=t(this.options.heightContainer)},r.prototype.onResize=function(){this.windowHeight=this.$window.height(),this.$heightContainer.css("height",this.$scrollContainer.height())},r.prototype.onScroll=function(){this.scrollTop=window.pageYOffset||document.documentElement.scrollTop},r.prototype.onEnterFrame=function(){requestAnimationFrame(t.proxy(this.onEnterFrame,this)),this.disabled||(this.scrollEasing(),this.triggerAnimations(),this.parallaxAnimations())},r.prototype.scrollEasing=function(){this.currentScrollTop+=(this.scrollTop-this.currentScrollTop)*this.options.easingMultiplier,this.currentScrollTop<1&&(this.currentScrollTop=0),this.$scrollContainer.css({transform:"translateY("+-this.currentScrollTop+"px) translateZ(0)"})},r.prototype.trigger=r.prototype.sequence=function(r){var i,o=this;t.isArray(r.element)||(r.element=[r.element]);for(var n=0;n<r.element.length;n++){var e=t(r.element[n]);e.each(function(){i=new o.Trigger(this,r),o.triggerArray.push(i)})}return i},r.prototype.triggerAnimations=function(){for(var t=0,r=this.triggerArray.length;t<r;t++)this.triggerArray[t].callback(this.triggerInView(t))},r.prototype.triggerInView=function(t){var r=this.triggerArray[t].boundingBox.top-this.windowHeight+this.triggerArray[t].offset;return this.scrollTop>r},r.prototype.parallax=function(r){var i,o=this;t.isArray(r.element)||(r.element=[r.element]);for(var n=0;n<r.element.length;n++){var e=t(r.element[n]);e.each(function(){i=new o.Parallax(this,r),o.parallaxArr.push(i)})}return i},r.prototype.parallaxAnimations=function(){for(var t=0,r=this.parallaxArr.length;t<r;t++){var i=this.parallaxArr[t].boundingBox.top+this.parallaxArr[t].boundingBox.height-this.parallaxArr[t].topTriggerOffset,o=this.parallaxArr[t].boundingBox.top-this.windowHeight,n=this.parallaxArr[t].pxToMove/(this.windowHeight+this.parallaxArr[t].boundingBox.height+this.parallaxArr[t].pxToMove-this.parallaxArr[t].topTriggerOffset);this.scrollTop>o&&this.scrollTop<i&&(this.parallaxArr[t].currentScrollTop+=(-(this.parallaxArr[t].boundingBox.top-this.scrollTop-this.windowHeight)*n-this.parallaxArr[t].currentScrollTop)*this.options.easingMultiplier,this.parallaxArr[t].currentScrollTop<this.parallaxArr[t].pxToMove&&(this.parallaxArr[t].currentScrollTop=this.parallaxArr[t].pxToMove)),this.scrollTop<o&&(this.parallaxArr[t].currentScrollTop-=this.parallaxArr[t].currentScrollTop*this.options.easingMultiplier,this.parallaxArr[t].currentScrollTop>=-1&&(this.parallaxArr[t].currentScrollTop=0)),this.parallaxArr[t].$element.css({transform:"translateY("+this.parallaxArr[t].currentScrollTop+"px) translateZ(0)","backface-visibility":"hidden"})}},window.Parachute=new r}(jQuery),function(t,r){"use strict";function i(r,o){this.options=t.extend({},i.DEFAULTS,o),this.element=r,this.$element=t(r),this.cb=this.options.callback,this.offset=this.options.offset,this.boundingBox=t(r)[0].getBoundingClientRect()}i.DEFAULTS={offset:300,callback:function(){}},i.prototype.callback=function(t){return this.cb(t)},r.Trigger=i}(jQuery,Parachute),function(t,r){"use strict";function i(r,o){this.options=t.extend({},i.DEFAULTS,o),this.element=r,this.$element=t(r),this.boundingBox=t(r)[0].getBoundingClientRect(),this.topTriggerOffset=this.options.topTriggerOffset,this.currentScrollTop=0,this.pxToMove=this.options.pxToMove}i.DEFAULTS={speed:1,pxToMove:0,topTriggerOffset:0},r.Parallax=i}(jQuery,Parachute);