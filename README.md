# webpack

> pacekage 中的scripts 设置环境变量

### windows:
``` javascript
{ 
  "dev": "set NODE_ENV=dev && webpack-dev-server --progress --hot",
  "build": "set NODE_ENV=production && webpack"
}
```

### linux or osx:

``` javascript
{
  "dev": "NODE_ENV=dev webpack-dev-server --progress --hot",
  "build": "NODE_ENV=production  webpack"
}
```
