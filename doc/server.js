#!/usr/bin/env node
var prerender = require('./lib');

// https://github.com/prerender/prerender#options
var server = prerender({
    // workers: process.env.PRERENDER_NUM_WORKERS, // os.cpus().length
    // iterations: process.env.PRERENDER_NUM_ITERATIONS // 40
});


server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());
server.start();
