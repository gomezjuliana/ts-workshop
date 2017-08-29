# ts-workshop

What is TypeScript?
- an extension of JavaScript
- needs to be compiled into JavaScript to run in browsers

Today: 
create an API with Restify and TypeScript

(TS config file)
- tsconfig file is how you compile this into JS
-- target could be es5 if that's your jame
-- output is common because we're using node
-- outdir is where you're gonna put the files

(Add scripts to package.json)
- you could configure the compiler or you can use it from mode modules, which is what we're gonna do

(installdev dependencies)
- instal typescript
- instal the types for node and types for restify because we're using typescript
-- this tells TypeScript what to expect in Node and Restify
- first two lines as dev deps because we don't need them in production
- restify is a dependency because we're gonna use it all

(create app and app.ts)