///<reference path="index.html"/>

(function ($) {
    if (!$) console.error("需要jquery");


    $.fn.myJquery = function () { };
    $.fn.myJquery.defaults = {
        scrollBody: 'body',//导航条 捕捉范围
        navObj: '#right-nav',//导航条生成位置
        title1: "h1",//一级导航条
        title2: "h2"//二级导航条
    };

    $.fn.myJquery.css = " \
                <style type='text/css'>\r\n\
                body { position: relative;}\r\n\
                #right-nav { position: fixed; }\r\n\
                #right-nav li.active>a {border-left:2px solid #22DDDD;font-weight: bold;color: #1A1AE6;}\r\n\
                ul.subNav { margin-left: 20px; display: none; }\r\n\
                ul.subNav li a {padding: 2px 5px;}\r\n\
                </style>";


    $.fn.myJquery = function (options) {
        var opts = $.extend({}, $.fn.myJquery.defaults, options);
       
        var navJq = $(opts.navObj);

        //需要进行 滚动绑定的元素
        var titleListJq = $(opts.scrollBody).find(opts.title1 + "," + opts.title2);

        var ulJq = $("<ul class='nav'></ul>");
        
        var curSubNavUl = undefined;//当前 二级导航栏的ul
        $.each(titleListJq, function (index, item) {
            item = $(item);
            if(item.is(opts.title1))
            {
                var aJq = $("<a href='#"+item.attr("id")+"'>" + item.text() + "</a>");
                aJq.click(function () {
                    var offsetTop = item.offset().top;
                    $(opts.scrollBody).animate({ scrollTop: offsetTop - 20 }, 500);
                    //return false;
                });
                ulJq.append($("<li></li>").append(aJq));

                curSubNavUl = undefined;
            }
            else if(item.is(opts.title2))
            {
                if(curSubNavUl===undefined)
                {
                    curSubNavUl = $("<ul class='nav subNav'></ul>");
                    ulJq.find("li:last").append(curSubNavUl);
                }
                var subAJq = $("<a href='#" + item.attr("id") + "'>" + item.text() + "</a>");
                subAJq.click(function () {
                    var offsetTop = item.offset().top;
                    $(opts.scrollBody).animate({ scrollTop: offsetTop - 20 }, 500);
                });
                curSubNavUl.append($("<li></li>").append(subAJq));
            }

        });
        navJq.append(ulJq);
        
        //绑定 导航点击时，出现子导航
        $(opts.navObj).find("li").click(function () {
            $(this).addClass("active").siblings("li").removeClass("active");
            $(this).find("ul").slideDown();
            $(this).siblings("li").find("ul").slideUp();
        });


        $(opts.scrollBody).scrollspy({ target: opts.navObj,offset:20 });

        
        //bootstrap 滚动事件触发
        $(opts.scrollBody).on('activate.bs.scrollspy', function (obj) {
            if ($(obj.target).is(":hidden")) {
                $(obj.target).closest("ul").slideDown()
                $(obj.target).parent().parent("li").siblings("li").find("ul").slideUp();
            }
        });

        $("head").append($.fn.myJquery.css);
    }

})(jQuery);