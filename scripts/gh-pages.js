'use strict';

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const resolve = file => path.resolve(__dirname, file)
const list = [
    {
        filePath: '../index.html', // 相对当前文件目录的位置
        target: '<base href="/"/>', // 需要被替换的字符
        content: '<base href="/ng-seed/"/>' //替换后的字符
    },
    {
        filePath: '../config/build.config.js',
        target: '\'/dist/\'', // TODO: 非唯一，非第一匹配，存在bug
        content: '\'/ng-seed/\''
    },
    {
        filePath: '../src/app.js',
        target: 'html5Mode(true)',
        content: 'html5Mode(false)'
    }
]

list.forEach(item => replaceForGhPages(resolve(item.filePath), item.target, item.content))

getGhPages().then(pullGhPages)

function getGhPages() {
    return new Promise(function (resolve, reject) {

        console.log('Building... Please wait a moment.')

        exec('yarn run build', (code, stdout, stderr) => {
            console.log('build success', stdout)
            console.log('build success')
            // pullGhPages()
            resolve();
        })
    });
}

function pullGhPages() {

    console.log('Pushing gh-pages... Please wait a moment.')

    exec('gh-pages -d dist', (code, stdout, stderr) => {

        console.log('gh-pages success', stdout)

        list.forEach(item => replaceForGhPages(resolve(item.filePath), item.content, item.target))

        console.log('Tip: revert success, Opening https://jm-team.github.io/ng-seed')
    })
}

/**
 * 替换文件中的字符为指定内容, 以便build为gh-pages所需要的路径格式
 * @param file 文件路径
 * @param target 需要被替换的目标
 * @param content 替换后的内容
 */
function replaceForGhPages(file, target, content) {
    // 同步读写文件方便顺序输出打印日志,异常错误直接抛出
    let data = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'})

    fs.writeFileSync(file, data.replace(target, content))

    console.log(`replace success ${file}: ${target} => ${content}`)

    // 异步读写文件处理方法
    /*fs.readFile(file, {encoding: 'utf8', flag: 'r'}, (err, data) => {
     let wContent = data.replace(target, content);
     if (err && err.errno == 33) {
     fs.open(file, "w", function (e, fd) {
     if (e) throw e;
     fs.write(fd, wContent, 0, 'utf8', (e) => {
     if (e) throw e;
     fs.closeSync(fd);
     })
     });
     } else {
     fs.writeFile(file, wContent, (e) => {
     if (e) throw e;
     })
     }
     console.log(`replace success ${file} ${target} => ${content}`)
     });*/
}