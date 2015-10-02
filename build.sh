#!/bin/sh

grunt staging
cp -R ./dist/* ../Freshcard/src/main/webapp/WEB-INF/ui/
