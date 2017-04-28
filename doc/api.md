## Restful API 设计规范

### URL路径 使用名词（资源描述）做url
    
   1. 获取集合
    
    /products                        // 产品的集合
    /orders                          // 订单的集合
    
   2. 获取单个对象 其中id是占位符

    /products/:id                    // 单个产品对象
    /orders/:id                      // 单个订单对象


### 资源的过滤信息（一些其他参数）

   资源的集合很多的时候 需要做一些过滤的时候 就要客户端传递一些过滤的参数

   /products?limit=10                // 指定返回的记录数量
   /products?page=2&pageSize =10     // 分页返回数据
   /products?sortby=name&order=asc   // 指定排序字段及方式


   资源的过滤参数可以存在冗余，即： /products?id=ID 和 /products/:ID 含义相等

### 使用http 动词操作资源

  **GET**
  
  GET	/products			// 获取一个products 集合
  GET	/products/:id		// 获取product单个对象

  **POST**
  
  POST /products			// 增加一个对象到集合

  **PUT 和 PATCH**
  
  PUT /products/:id		// 更新一个对象的全部属性
  PATCH /products/:id 	// 更新一个对象的某个属性

  **DELETE**
  
  DELETE	/products		// 删除一个集合
  DELETE	/products/:id	// 删除一个对象

### 版本号

   1. 版本号加在url

      /api/v1/products/123

   2. 版本号加在请求头上
   
        GET /api/products/123
        Accept: application/json; version=1.0


### 返回值

   #### 返回状态码

        服务器返回对应的状态码  遵循http 状态码 如：

      1. 200 服务器成功返回数据
      2. 404 未找到资源
      3. 401 用户没有权限
      4. ...

   #### 返回数据格式

      1. 返回结果
            GET     /collection					//返回资源对象的列表（数组）
            
            GET     /collection/resource		//返回单个资源对象
            
            POST    /collection				    //返回新生成的资源对象
            
            PUT     /collection/resource		//返回完整的资源对象
            
            PATCH   /collection/resource		//返回完整的资源对象
            
            DELETE  /collection/resource		//返回一个空文档
            
       2. 返回集合：

            {
             	count: 20,		// 获取条数
             	total:614,		// 资源总数
             	products:[
                   	{name:'aaa', id:0},
                   	{name:'aaa', id:1},
                   	....
                	]
          	}

        3.返回单个对象
                {
                   name:"aaa",
                   id: 0
                }

             返回空文档
             
                 {}

         4. 错误状态的返回

          {
          	"message": "錯誤提示信息",
          	"errors": [
          		{
          		  "resource": "错误的请求API",
          		  "field": "可能导致错误的字段",
          		  "code": "错误的业务状态"		//非http状态码
          		}
          	]
          }
