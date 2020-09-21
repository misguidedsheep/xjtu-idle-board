# xjtu-idle-board

西安交通大学闲置公告板Web项目

## 技术栈

- HTML CSS JavaScript
- Bootstrap
- jQuery
- AJAX
- JSON Web Token
- Nodejs, Express, EJS

node_modules不上传, 可使用`npm install`补全模块

## 运行调试

- Linux/MacOS: `DEBUG=myapp:* npm start`
- Windows: `set DEBUG=myapp:* & npm start`

## 报错规范

按照约定产生错误信息, 前端/后端都必须在控制台打印错误信息

### 错误信息格式:

```javascript
`ERROR: ${错误类型代码} (${错误来源类型}: ${错误来源文件名})`
```

### 错误信息示例:

```javascript
`ERROR: SQL_QUERY_ERROR (Router: registerVerify)`
```

### 错误代码约定:

- SQL_QUERY_ERROR: 数据库查询错误
- SQL_NO_RESULT: 数据库查询无结果错误
- JWT_VERIFY_ERROR: Token验证错误
- USER_EXIST_ERROR: 用户已存在错误
- MAIL_SEND_ERROR: 邮件发送错误
- NO_LOGIN_ERROR: 用户未登录错误


## 展示

### logo

![xib logo](https://s1.ax1x.com/2020/09/21/wqZeyD.png)

### 主页示例

![主页示例](https://s1.ax1x.com/2020/09/19/woeMGD.png)

### itemModal示例

![itemModal展示](https://s1.ax1x.com/2020/09/16/w2mwSP.png)

### 提交示例

![提交示例1](https://s1.ax1x.com/2020/09/16/w2uwqS.png)

### 用户页示例

![用户页示例](https://s1.ax1x.com/2020/09/18/wfyfQs.png)

### 注册示例

![注册示例](https://s1.ax1x.com/2020/09/19/w5CQCq.png)
