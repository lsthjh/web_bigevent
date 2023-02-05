$(function () {
  // 注册 
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 登录
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
})

// 从 layui 中获取 form 对象
var form = layui.form
var layer = layui.layer

// 通过 form.verify() 函数自定义校验规则
form.verify({
  // 密码规则验证
  pwd: [/^[\S]{6,12}$/, '密码必须6-12位'],
  // 确认密码 规则验证
  repwd: function (value) {
    var pwd = $('.reg-box [name=password]').val()
    if (pwd !== value) {
      return '两次密码不一致'
    }
  }
})

let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
// 监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
  e.preventDefault();//阻l止默认事件
  $.post('/api/reguser', data, function (res) {
    alert('aa')
    if (res.status !== 0) {
      alert('aa')
      return layer.msg(res.message)
    }
    layer.msg('注册成功！')
  })
})


// 监听登录表单的提交事件
$('#form_login').submit(function(e){
  // 阻止默认行为
  e.preventDefault()
  $.ajax({
    url: '/api/login',
    method:'POST',
    data:$(this).serialize(),
    success: function(res){
      if(res.status !== 0) {
        return layer.msg('登录失败！')
      }
      layer.msg('登录成功！')
      // 将登录成功得到的token 字符串，保存到本地
      localStorage.setItem('token', res.token)
      // 跳转到后台主页
      location.href = '/index.html'
    }
  })
})