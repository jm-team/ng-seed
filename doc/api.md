## API设计
> 使用RESTful API规范 如：


1.获取新闻列表 GET请求 
/webapi/版本/路径  
/webapi/v1/news  

请求成功返回： 
Status code 200

```
[
	{
	“id”:  10086,
	“title”:  “新闻标题1”,
	“url”:  “/news-1.html”,
	“time”:  “2016-05-11”,
	“category”: “化工行情”
	},
	{
	“id”:  10087,
	“title”:  “新闻标题2”,
	“url”:  “/news-2.html”,
	“time”:  “2016-05-11”,
	“category”: “化工行情”
	},
	{
	“id”:  10088,
	“title”:  “新闻标题3”,
	“url”:  “/news-3.html”,
	“time”:  “2016-05-11”,
	“category”: “化工行情”
	}
]
```

2.获取一条新闻内容 GET请求  
/webapi/版本/路径/ID  
/webapi/v1/news/10086  

请求成功返回： 
Status code 200

```
{
	“id”:  10086,
	“title”:  “新闻标题3”,
	“url”:  “/news-3.html”,
	“time”:  “2016-05-11”,
	“content”:  “新闻内容新闻内容新闻内容新闻内容”,
	“category”: “化工行情”
}
```

失败：
Code: 400 /4XX

```
{
	“name”： "SERVICE_REJECTED"，// 错误码
	“message”:  “操作太频繁啦，请休息一下再试。” //错误描述
}
```

3.批量接口请求 POST请求（注意head里的content-type 为application/json）
/webapi/batch

请求参数JSON

```
{
    "timeout": 10000, 
    "requests": [
        {
            "method": "GET",
            "url": "/v1/user"
        },
        {
            "method": "GET",
            "url": "/v1/news"
        }
    ]
}
```

返回数据 JSON

```
[
    {
        "code": 401,
        "body": "{\"message\":\"\\u7528\\u6237\\u9a8c\\u8bc1\\u5931\\u8d25\",\"name\":\"HTTP_UNAUTHORIZED\"}"
    },
    {
        "code": 200,
        "body": "stringfiy JSON数据"
    }
]
```


HTTP请求方法  
* GET（SELECT）：从服务器取出资源（一项或多项）。
* POST（CREATE）：在服务器新建一个资源。
* PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
* PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
* DELETE（DELETE）：从服务器删除资源。

返回状态
* 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
* 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
* 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
* 204 NO CONTENT - [DELETE]：用户删除数据成功。
* 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
* 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
* 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
* 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
* 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
* 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
* 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
* 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。


详细参考地址：http://www.ruanyifeng.com/blog/2014/05/restful_api.html
