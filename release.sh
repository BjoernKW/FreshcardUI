#!/bin/sh

grunt release
cp -R ./dist/* ../Freshcard/src/main/webapp/WEB-INF/ui/
