// jQuery.ajaxPrefilter()函数没有返回值，或者说其返回值为undefined
// 每次调用 $.get() 或者 $.post() 或者 $.ajax()请求的时候
// 会默认调用 ajaxPrefilter 这个方法
// 这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 在发起ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})