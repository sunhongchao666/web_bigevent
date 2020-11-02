$(function() {
    // 点击“去注册账号”的链接 绑定事件
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击“去登录”的链接  给他绑定事件
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 从 layui 中获取 from 对象

    var form = layui.form;
    var layer = layui.layer;
    // 通过 from.verify()函数自定义校验规则
    form.verify({
        // [\S]：表示不能出现空格
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            var repwd = $('.reg-box [name=password]').val(); // 通过jquery的方法拿到密码框的值
            // 将两次密码进行判断
            if (repwd != value) {
                // 如果两次输入的值不一样，则return一个提示消息
                return '两次输入密码不一致！'
            }
        }
    });

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault();
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message)
                    return layer.msg(res.message);
                }
                // alert('注册成功！')
                layer.msg('注册成功,请登录！');
                // 当注册成功后，页面自动跳转到登录页面
                // 模拟鼠标点击事件
                $('#link_login').click();

            })
    });

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止登录表单默认提交行为
        e.preventDefault();
        // 发起ajax的post请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登陆成功！');
                // console.log(res.token);
                // 后边有权限的接口参数里面必须要有 token 后边的字符串。
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                // 登录成功后，跳转到后台主页(index.html)
                location.href = 'index.html';
            }
        })
    })
})