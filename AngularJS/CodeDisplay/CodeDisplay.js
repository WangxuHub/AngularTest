///<reference path='../9内置指令.html'/>
$.htmlEncode = function (value) {
    return $("<div/>").text(value).html();
}
$.htmlDecode = function (value) {
    return $("<div/>").html(value).text();
}

function createHtmlCodeAll()
{
    $(".my-test-show .my-content").each(function (index, item) {
        item = $(item);
        
        var showJq = $(item).parent();
        var itemHtml = $(item).html();

        if (item.is(".no-code"))
        {
            item.css({ 'border-radius': '4px 4px 4px 4px', 'border-bottom': '1px solid #ccc' });
            return true;
        }

        //pre 显示代码窗口
        var codeJq = $("<div class='my-code'></div>");

        var htmlCode = $(item).children().not('script')[0]?$(item).children().not('script')[0].outerHTML:"";
        var jsCode = $(item).find("script")[0]?$(item).find("script")[0].outerHTML:"";

        var $html = $("<pre class='html'></pre>").text(htmlCode);
        var $Jq = $("<pre class='js'></pre>").text(jsCode);

        codeJq.append($html);
        codeJq.append($Jq);

        //“复制代码”按钮,显示提示
        var clipboardJq = $(
            "\
                  <div class='my-clipboard' data-toggle='tooltip' data-placement='top' title='复制到剪切板'>复制\</div>\
             ");
        

        codeJq.prepend($("<div style='position:relative;'></div>").append(clipboardJq));


        clipboardJq.tooltip();
        clipboardJq.click(function () {
            copyToClipboard(itemHtml);
            item.siblings(".my-code").find(".tooltip-inner").text("复制成功！");
        });
      
        showJq.append(codeJq);

    });
}


function copyToClipboard(str)
{
    $(".needDelete18768122418").remove();
    var item = $("<textarea class='needDelete18768122418' style='display:none1;width: 0;height: 0;overflow: hidden;resize: none;border: none;' readonly></textarea>").text(str);
    $("body").append(item);
    var codestr = item.get(0);
    codestr.select();
    document.execCommand("Copy");

    //item.remove();

}