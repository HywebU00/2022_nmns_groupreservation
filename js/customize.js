// 自行加入的JS請寫在這裡
$(function() {
    // 首頁輪播
    $('.mpSlider').slick({
        mobileFirst: true,
        dots: true,
        arrow: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        fade: true,
        lazyLoaded: true,
        lazyLoad: 'ondemand',
        ease: 'ease'
    });
    // 廣告輪播
    $('.adSlider').slick({
        mobileFirst: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrow: true,
        lazyLoaded: true,
        lazyLoad: 'ondemand',
        ease: 'ease',
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true
            }
        }]
    });
    //燈箱slick+lightBox組合
    $('.cp_slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        pauseOnFocus: true,
        focusOnSelect: true,
        accessibility: true,
        lazyLoad: 'ondemand',
        ease: 'ease',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 545,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }]
    });
    $('.cp_slider').slickLightbox({
        caption: 'caption',
        lazyLoad: 'ondemand',
        useHistoryApi: 'true',
        ease: 'ease',
        lazy: true
    });
    // cp_photo
    $('.Slider-for').on('init reInit afterChange', function(event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.controls').html(i + '/' + slick.slideCount);
    });
    $('.Slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        swipe: false,
        swipeToSlide: false,
        lazyLoad: 'ondemand',
        asNavFor: '.Slider-nav',
        infinite: true
    });
    $('.Slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.Slider-for',
        dots: true,
        arrows: true,
        lazyLoad: 'ondemand',
        focusOnSelect: true,
        infinite: true
    });
    // 會員專區
    // $('.member_block .content').hide().slideDown(1000);
    $('.member_block h2').click(function() {
        $('.member_block .content').stop().slideToggle();
    })
    $('.mobile_member_btn').click(function() {
        $('.member_block .content').stop().slideToggle();
    })
    //申辦注意
    $('.application_matters .hide_btn').hide()
    $('.application_matters .show_btn').click(function() {
        $('.application_matters .content').addClass('open')
        $(this).hide();
        $('.application_matters .hide_btn').show();
    })
    $('.application_matters .hide_btn').click(function() {
        $('.application_matters .content').removeClass('open')
        $(this).hide();
        $('.application_matters .show_btn').show().css('display', 'block');
    })
    //內頁說明區塊
    if ($('.explain .content').outerHeight() < 115) {
        $('.explain .content').addClass('little_data');
        $('.explain .show_btn').hide();
    };
    // console.log($('.explain .content').outerHeight());
    // }
    $('.explain .show_btn').click(function() {
        $('.explain .content').addClass('open')
        $(this).hide();
        $('.explain .hide_btn').show();
    })
    $('.explain .hide_btn').click(function() {
        $(".explain .content").removeClass('little_data');
        $('.explain .content').removeClass('open')
        $(this).hide();
        $('.explain .show_btn').show();
    })
    // 
});
/*-----------------------------------*/
/////////////燈箱設定/////////////
/*-----------------------------------*/
// 
$(function() {
    $('#modal1').hide(); //先隱藏視窗
    $('.modal').after('<div class="modal_overlay"></div>'); //新增透明底
    $('.modal').prepend('<button type="button" class="close">關閉</button>'); //新增關閉按鈕
    $('.modal_overlay').hide(); //隱藏透明底
    //按鈕動作
    $('#openModal').click(function(e) {
        $('.modal_overlay').fadeIn(400);
        $('.modal').fadeIn(400);
        $('body').addClass('noscroll');
        e.preventDefault();
    });
    //關閉function
    function closeModal() {
        $('#modal1').fadeOut(400);
        $('.modal_overlay').fadeOut(400);
        $('body').removeClass('noscroll');
    }
    //點選關閉按鈕及透明底都可關閉
    $('.modal_overlay').click(closeModal);
    $('.modal .close').click(closeModal);
    $('.btn_grp .cancel').click(closeModal);
});
// 時間表
jQuery(document).ready(function($) {
    var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
    var transitionsSupported = ($('.csstransitions').length > 0);
    //if browser does not support transitions - use a different event to trigger them
    if (!transitionsSupported) transitionEnd = 'noTransition';
    //should add a loding while the events are organized 
    function SchedulePlan(element) {
        this.element = element;
        this.timeline = this.element.find('.timeline');
        this.timelineItems = this.timeline.find('li');
        this.timelineItemsNumber = this.timelineItems.length;
        this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
        //need to store delta (in our case half hour) timestamp
        this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());
        this.eventsWrapper = this.element.find('.events');
        this.eventsGroup = this.eventsWrapper.find('.events-group');
        this.singleEvents = this.eventsGroup.find('.single-event');
        this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
        // this.modal = this.element.find('.event-modal');
        // this.modalHeader = this.modal.find('.header');
        // this.modalHeaderBg = this.modal.find('.header-bg');
        // this.modalBody = this.modal.find('.body');
        // this.modalBodyBg = this.modal.find('.body-bg');
        // this.modalMaxWidth = 800;
        // this.modalMaxHeight = 480;
        this.animating = false;
        this.initSchedule();
    }
    SchedulePlan.prototype.initSchedule = function() {
        this.scheduleReset();
        this.initEvents();
    };
    SchedulePlan.prototype.scheduleReset = function() {
        var mq = this.mq();
        if (mq == 'desktop' && !this.element.hasClass('js-full')) {
            //in this case you are on a desktop version (first load or resize from mobile)
            this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
            this.element.addClass('js-full');
            this.placeEvents();
            this.element.hasClass('modal-is-open') && this.checkEventModal();
        } else if (mq == 'mobile' && this.element.hasClass('js-full')) {
            //in this case you are on a mobile version (first load or resize from desktop)
            this.element.removeClass('js-full loading');
            this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
            this.eventsWrapper.children('.grid-line').remove();
            this.element.hasClass('modal-is-open') && this.checkEventModal();
        } else if (mq == 'desktop' && this.element.hasClass('modal-is-open')) {
            //on a mobile version with modal open - need to resize/move modal window
            this.checkEventModal('desktop');
            this.element.removeClass('loading');
        } else {
            this.element.removeClass('loading');
        }
    };
    SchedulePlan.prototype.initEvents = function() {
        var self = this;
        this.singleEvents.each(function() {
            //create the .event-date element for each event
            var durationLabel = '<span class="event-date">' + $(this).data('start') + ' - ' + $(this).data('end') + '</span>';
            $(this).children('a').prepend($(durationLabel));
            //detect click on the event and open the modal
            $(this).on('click', 'a', function(event) {
                event.preventDefault();
                if (!self.animating) self.openModal($(this));
            });
        });
        //close modal window
        this.modal.on('click', '.close', function(event) {
            event.preventDefault();
            if (!self.animating) self.closeModal(self.eventsGroup.find('.selected-event'));
        });
        this.element.on('click', '.cover-layer', function(event) {
            if (!self.animating && self.element.hasClass('modal-is-open')) self.closeModal(self.eventsGroup.find('.selected-event'));
        });
    };
    SchedulePlan.prototype.placeEvents = function() {
        var self = this;
        this.singleEvents.each(function() {
            //place each event in the grid -> need to set top position and height
            var start = getScheduleTimestamp($(this).attr('data-start')),
                duration = getScheduleTimestamp($(this).attr('data-end')) - start;
            var eventTop = self.eventSlotHeight * (start - self.timelineStart) / self.timelineUnitDuration,
                eventHeight = self.eventSlotHeight * duration / self.timelineUnitDuration;
            $(this).css({
                top: (eventTop - 1) + 'px',
                height: (eventHeight + 1) + 'px'
            });
        });
        this.element.removeClass('loading');
    };
    SchedulePlan.prototype.openModal = function(event) {
        var self = this;
        var mq = self.mq();
        this.animating = true;
        //update event name and time
        this.modalHeader.find('.event-name').text(event.find('.event-name').text());
        this.modalHeader.find('.event-date').text(event.find('.event-date').text());
        this.modal.attr('data-event', event.parent().attr('data-event'));
        //update event content
        this.modalBody.find('.event-info').load(event.parent().attr('data-content') + '.html .event-info > *', function(data) {
            //once the event content has been loaded
            self.element.addClass('content-loaded');
        });
        this.element.addClass('modal-is-open');
        setTimeout(function() {
            //fixes a flash when an event is selected - desktop version only
            event.parent('li').addClass('selected-event');
        }, 10);
        if (mq == 'mobile') {
            self.modal.one(transitionEnd, function() {
                self.modal.off(transitionEnd);
                self.animating = false;
            });
        } else {
            var eventTop = event.offset().top - $(window).scrollTop(),
                eventLeft = event.offset().left,
                eventHeight = event.innerHeight(),
                eventWidth = event.innerWidth();
            var windowWidth = $(window).width(),
                windowHeight = $(window).height();
            var modalWidth = (windowWidth * .8 > self.modalMaxWidth) ? self.modalMaxWidth : windowWidth * .8,
                modalHeight = (windowHeight * .8 > self.modalMaxHeight) ? self.modalMaxHeight : windowHeight * .8;
            var modalTranslateX = parseInt((windowWidth - modalWidth) / 2 - eventLeft),
                modalTranslateY = parseInt((windowHeight - modalHeight) / 2 - eventTop);
            var HeaderBgScaleY = modalHeight / eventHeight,
                BodyBgScaleX = (modalWidth - eventWidth);
            //change modal height/width and translate it
            self.modal.css({
                top: eventTop + 'px',
                left: eventLeft + 'px',
                height: modalHeight + 'px',
                width: modalWidth + 'px',
            });
            transformElement(self.modal, 'translateY(' + modalTranslateY + 'px) translateX(' + modalTranslateX + 'px)');
            //set modalHeader width
            self.modalHeader.css({
                width: eventWidth + 'px',
            });
            //set modalBody left margin
            self.modalBody.css({
                marginLeft: eventWidth + 'px',
            });
            //change modalBodyBg height/width ans scale it
            self.modalBodyBg.css({
                height: eventHeight + 'px',
                width: '1px',
            });
            transformElement(self.modalBodyBg, 'scaleY(' + HeaderBgScaleY + ') scaleX(' + BodyBgScaleX + ')');
            //change modal modalHeaderBg height/width and scale it
            self.modalHeaderBg.css({
                height: eventHeight + 'px',
                width: eventWidth + 'px',
            });
            transformElement(self.modalHeaderBg, 'scaleY(' + HeaderBgScaleY + ')');
            self.modalHeaderBg.one(transitionEnd, function() {
                //wait for the  end of the modalHeaderBg transformation and show the modal content
                self.modalHeaderBg.off(transitionEnd);
                self.animating = false;
                self.element.addClass('animation-completed');
            });
        }
        //if browser do not support transitions -> no need to wait for the end of it
        if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
    };
    SchedulePlan.prototype.closeModal = function(event) {
        var self = this;
        var mq = self.mq();
        this.animating = true;
        if (mq == 'mobile') {
            this.element.removeClass('modal-is-open');
            this.modal.one(transitionEnd, function() {
                self.modal.off(transitionEnd);
                self.animating = false;
                self.element.removeClass('content-loaded');
                event.removeClass('selected-event');
            });
        } else {
            var eventTop = event.offset().top - $(window).scrollTop(),
                eventLeft = event.offset().left,
                eventHeight = event.innerHeight(),
                eventWidth = event.innerWidth();
            var modalTop = Number(self.modal.css('top').replace('px', '')),
                modalLeft = Number(self.modal.css('left').replace('px', ''));
            var modalTranslateX = eventLeft - modalLeft,
                modalTranslateY = eventTop - modalTop;
            self.element.removeClass('animation-completed modal-is-open');
            //change modal width/height and translate it
            this.modal.css({
                width: eventWidth + 'px',
                height: eventHeight + 'px'
            });
            transformElement(self.modal, 'translateX(' + modalTranslateX + 'px) translateY(' + modalTranslateY + 'px)');
            //scale down modalBodyBg element
            transformElement(self.modalBodyBg, 'scaleX(0) scaleY(1)');
            //scale down modalHeaderBg element
            transformElement(self.modalHeaderBg, 'scaleY(1)');
            this.modalHeaderBg.one(transitionEnd, function() {
                //wait for the  end of the modalHeaderBg transformation and reset modal style
                self.modalHeaderBg.off(transitionEnd);
                self.modal.addClass('no-transition');
                setTimeout(function() {
                    self.modal.add(self.modalHeader).add(self.modalBody).add(self.modalHeaderBg).add(self.modalBodyBg).attr('style', '');
                }, 10);
                setTimeout(function() {
                    self.modal.removeClass('no-transition');
                }, 20);
                self.animating = false;
                self.element.removeClass('content-loaded');
                event.removeClass('selected-event');
            });
        }
        //browser do not support transitions -> no need to wait for the end of it
        if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
    }
    SchedulePlan.prototype.mq = function() {
        //get MQ value ('desktop' or 'mobile') 
        var self = this;
        return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
    };
    SchedulePlan.prototype.checkEventModal = function(device) {
        this.animating = true;
        var self = this;
        var mq = this.mq();
        if (mq == 'mobile') {
            //reset modal style on mobile
            self.modal.add(self.modalHeader).add(self.modalHeaderBg).add(self.modalBody).add(self.modalBodyBg).attr('style', '');
            self.modal.removeClass('no-transition');
            self.animating = false;
        } else if (mq == 'desktop' && self.element.hasClass('modal-is-open')) {
            self.modal.addClass('no-transition');
            self.element.addClass('animation-completed');
            var event = self.eventsGroup.find('.selected-event');
            var eventTop = event.offset().top - $(window).scrollTop(),
                eventLeft = event.offset().left,
                eventHeight = event.innerHeight(),
                eventWidth = event.innerWidth();
            var windowWidth = $(window).width(),
                windowHeight = $(window).height();
            var modalWidth = (windowWidth * .8 > self.modalMaxWidth) ? self.modalMaxWidth : windowWidth * .8,
                modalHeight = (windowHeight * .8 > self.modalMaxHeight) ? self.modalMaxHeight : windowHeight * .8;
            var HeaderBgScaleY = modalHeight / eventHeight,
                BodyBgScaleX = (modalWidth - eventWidth);
            setTimeout(function() {
                self.modal.css({
                    width: modalWidth + 'px',
                    height: modalHeight + 'px',
                    top: (windowHeight / 2 - modalHeight / 2) + 'px',
                    left: (windowWidth / 2 - modalWidth / 2) + 'px',
                });
                transformElement(self.modal, 'translateY(0) translateX(0)');
                //change modal modalBodyBg height/width
                self.modalBodyBg.css({
                    height: modalHeight + 'px',
                    width: '1px',
                });
                transformElement(self.modalBodyBg, 'scaleX(' + BodyBgScaleX + ')');
                //set modalHeader width
                self.modalHeader.css({
                    width: eventWidth + 'px',
                });
                //set modalBody left margin
                self.modalBody.css({
                    marginLeft: eventWidth + 'px',
                });
                //change modal modalHeaderBg height/width and scale it
                self.modalHeaderBg.css({
                    height: eventHeight + 'px',
                    width: eventWidth + 'px',
                });
                transformElement(self.modalHeaderBg, 'scaleY(' + HeaderBgScaleY + ')');
            }, 10);
            setTimeout(function() {
                self.modal.removeClass('no-transition');
                self.animating = false;
            }, 20);
        }
    };
    var schedules = $('.cd-schedule');
    var objSchedulesPlan = [],
        windowResize = false;
    if (schedules.length > 0) {
        schedules.each(function() {
            //create SchedulePlan objects
            objSchedulesPlan.push(new SchedulePlan($(this)));
        });
    }
    $(window).on('resize', function() {
        if (!windowResize) {
            windowResize = true;
            (!window.requestAnimationFrame) ? setTimeout(checkResize): window.requestAnimationFrame(checkResize);
        }
    });
    $(window).keyup(function(event) {
        if (event.keyCode == 27) {
            objSchedulesPlan.forEach(function(element) {
                element.closeModal(element.eventsGroup.find('.selected-event'));
            });
        }
    });

    function checkResize() {
        objSchedulesPlan.forEach(function(element) {
            element.scheduleReset();
        });
        windowResize = false;
    }

    function getScheduleTimestamp(time) {
        //accepts hh:mm format - convert hh:mm to timestamp
        time = time.replace(/ /g, '');
        var timeArray = time.split(':');
        var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
        return timeStamp;
    }

    function transformElement(element, value) {
        element.css({
            '-moz-transform': value,
            '-webkit-transform': value,
            '-ms-transform': value,
            '-o-transform': value,
            'transform': value
        });
    }
});
// select 帶入勾選項
$(function() {
    $("#test").CreateMultiCheckBox({ width: '100%', defaultText: 'Select Below', height: '250px' });
})
$(document).ready(function() {
    $(document).on("click", ".MultiCheckBox", function() {
        var detail = $(this).next();
        detail.show();
    });
    $(document).on("click", ".MultiCheckBoxDetailHeader input", function(e) {
        e.stopPropagation();
        var hc = $(this).prop("checked");
        $(this).closest(".MultiCheckBoxDetail").find(".MultiCheckBoxDetailBody input").prop("checked", hc);
        $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
    });
    $(document).on("click", ".MultiCheckBoxDetailHeader", function(e) {
        var inp = $(this).find("input");
        var chk = inp.prop("checked");
        inp.prop("checked", !chk);
        $(this).closest(".MultiCheckBoxDetail").find(".MultiCheckBoxDetailBody input").prop("checked", !chk);
        $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
    });
    $(document).on("click", ".MultiCheckBoxDetail .cont input", function(e) {
        e.stopPropagation();
        $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
        var val = $(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length;
        $(".MultiCheckBoxDetailHeader input").prop("checked", val);
    });
    $(document).on("click", ".MultiCheckBoxDetail .cont", function(e) {
        var inp = $(this).find("input");
        var chk = inp.prop("checked");
        inp.prop("checked", !chk);
        var multiCheckBoxDetail = $(this).closest(".MultiCheckBoxDetail");
        var multiCheckBoxDetailBody = $(this).closest(".MultiCheckBoxDetailBody");
        multiCheckBoxDetail.next().UpdateSelect();
        var val = $(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length;
        $(".MultiCheckBoxDetailHeader input").prop("checked", val);
    });
    $(document).mouseup(function(e) {
        var container = $(".MultiCheckBoxDetail");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
});
var defaultMultiCheckBoxOption = {
    width: "220px",
    defaultText: "Select Below",
    height: "200px"
};
jQuery.fn.extend({
    CreateMultiCheckBox: function(options) {
        var localOption = {};
        localOption.width = options != null && options.width != null && options.width != undefined ? options.width : defaultMultiCheckBoxOption.width;
        localOption.defaultText = options != null && options.defaultText != null && options.defaultText != undefined ? options.defaultText : defaultMultiCheckBoxOption.defaultText;
        localOption.height = options != null && options.height != null && options.height != undefined ? options.height : defaultMultiCheckBoxOption.height;
        this.hide();
        this.attr("multiple", "multiple");
        var divSel = $("<div class='MultiCheckBox'>" + localOption.defaultText + "<span class='k-icon k-i-arrow-60-down'><svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='sort-down' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' class='svg-inline--fa fa-sort-down fa-w-10 fa-2x'><path fill='currentColor' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z' class=''></path></svg></span></div>").insertBefore(this);
        divSel.css({ width: localOption.width });
        var detail = $("<div class='MultiCheckBoxDetail'><div class='MultiCheckBoxDetailHeader'><input type='checkbox' class='mulinput' value='-1982' /><div>Select All</div></div><div class='MultiCheckBoxDetailBody'></div></div>").insertAfter(divSel);
        detail.css({
            width: parseInt(options.width) + 10,
            "max-height": localOption.height
        });
        var multiCheckBoxDetailBody = detail.find(".MultiCheckBoxDetailBody");
        this.find("option").each(function() {
            var val = $(this).attr("value");
            if (val == undefined) val = "";
            multiCheckBoxDetailBody.append("<div class='cont'><div><input type='checkbox' class='mulinput' value='" + val + "' /></div><div>" + $(this).text() + "</div></div>");
        });
        multiCheckBoxDetailBody.css("max-height", parseInt($(".MultiCheckBoxDetail").css("max-height")) - 28 + "px");
    },
    UpdateSelect: function() {
        var arr = [];
        this.prev().find(".mulinput:checked").each(function() {
            arr.push($(this).val());
        });
        this.val(arr);
    }
});
// 月曆
$(function() {
    $('.calendar').pignoseCalendar();
    $('.gallery_calendar .openclose_btn a').click(function() {
        if ($('.calendar .pignose-calendar-header').is(':visible'), $('.calendar .pignose-calendar-body').is(':visible')) {
            $('.calendar .pignose-calendar-header').stop().fadeOut();
            $('.calendar .pignose-calendar-body').stop().fadeOut();
            $('.pignose-calendar-top .pignose-calendar-top-prev').stop().fadeOut();
            $('.pignose-calendar-top .pignose-calendar-top-next').stop().fadeOut();
            $(this).parent('.openclose_btn').addClass('close');
        } else {
            $('.calendar .pignose-calendar-header').stop().fadeIn();
            $('.calendar .pignose-calendar-body').stop().fadeIn();
            $('.pignose-calendar-top .pignose-calendar-top-prev').stop().fadeIn();
            $('.pignose-calendar-top .pignose-calendar-top-next').stop().fadeIn();
            $(this).parent('.openclose_btn').removeClass('close');
        }
    })
});
// 時間表
$(function() {
    // $('.events').click(function(){
    //     alert($(".schedule_block .events .events-group").length);
    // })
    if ($('.schedule_block .events .events-group').length < 5) {
        $('.schedule_block .events .events-group').css('flex-grow', '1');
        $('.schedule_block .events .events-group').css('flex-shrink', '1');
    } else {
        $('.schedule_block .events .events-group').css('flex-grow', '0');
        $('.schedule_block .events .events-group').css('flex-shrink', '0');
    }
})