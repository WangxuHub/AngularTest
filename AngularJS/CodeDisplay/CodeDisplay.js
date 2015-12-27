///<reference path='../9内置指令.html'/>


function createHtmlCodeAll()
{
    $(".my-test-show .my-content").each(function (index, item) {
        item = $(item);
        
        var showJq = $(item).parent();
        var itemHtml = $(item).html();

        //pre 显示代码窗口
        var codeJq = $("<div class='my-code'></div>");
        var preJq = $("<pre></pre>").text(itemHtml);
        codeJq.append(preJq);

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