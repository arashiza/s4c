#!/bin/bash

cd $(dirname $0)

list=$(find dist -type f | egrep -i '(?:jpeg|jpg|png|gif)$')

IFS=$'\n';
for path in ${list[@]}; do
    file $path | perl -ne '/[^:]*\.(\w+):\s*([\S]*)/; $ext = lc($1); $mime = lc($2); $ext =~ s/jpg/jpeg/; print if ($ext ne $mime)'
done
