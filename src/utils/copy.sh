#!/bin/sh
cd /i/blog_1/blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo ''>access.log
