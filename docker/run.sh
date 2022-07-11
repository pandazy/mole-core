#!/bin/bash

# 
# Params definition:
# $CMD: a script comand defined in package.json's "scripts" section
# $DERMIS_VOLUMN_PATH: the local dev path of the code directory where the docker container runs 
# $PORT: React dev server's URL port number 
#
# Usage example:
#```
# sh docker/run.sh
#
# SCRIPT=test sh docker/run.sh
# SCRIPT=start
# ```
#

docker run --rm -ti --env SCRIPT=${SCRIPT:-start} -v $MOLE_VOLUMN_PATH:/dermis -p ${PORT:-3000}:3000 jszhengyq/dermis