#!/bin/bash

# This file used to create base dir of a project

tip() {
	echo -e "\033[31m $1 \033[0m";
}

makedirs() {
	if [ -z $1 -o $1 == '/' -o $1 == '.' ] ; then
		return
	fi

	parent_dir=`dirname $1`
	
	makedirs $parent_dir

	if [ ! -d $1 ] ; then
		 mkdir $1
	fi
}

echo -n 'Please input the app path: '

read val

if [ -z "$val" ] ; then
	tip "Command error: The app path can not be empty"
	exit
fi

if [ ! -d $val ] ; then
    makedirs $val
fi

#
# project structor
#
# prject
#	app
#		controllers
#			index
#				IndexController.js
#		views
#			index
#				index.html
#		modules
#		runtime
#

controllerPath=$val/app/controllers/index
viewPath=$val/app/views/index

makedirs $controllerPath
makedirs $viewPath

c=$controllerPath/IndexController.js
echo "'use strict';" > $c
echo "var CandyJs = require('candyjs');" >> $c
echo "var Controller = CandyJs.Candy.include('y/web/Controller');" >> $c
echo "class IndexController extends Controller {" >> $c
echo "  run(req, res) {" >> $c
echo "    res.end('hello candyjs');" >> $c
echo "  }" >> $c
echo "}" >> $c
echo "module.exports = IndexController;" >> $c

v=$val/index.js
echo "var CandyJs = require('candyjs');" > $v
echo "var app = new CandyJs({" >> $v
echo "  'id': 1," >> $v
echo "  'debug': true," >> $v
echo "  'appPath': __dirname + '/app'" >> $v
echo "});" >> $v
echo "app.listen(8090, function(){console.log('listen on 8090');});" >> $v

echo done
