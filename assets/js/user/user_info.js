$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.lenght > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });

    initUserInfo();
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);

                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    });

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 组织表单的默认提交行为
        e.preventDefault();
        // 发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                // 调用父页面(index)中的方法，重新渲染用户的头像和用户的信息
                // var window: Window & typeof globalThis
                // window.parent就代表index.js
                window.parent.getUserInfo();
            }
        })
    })
})