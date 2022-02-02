#!/bin/bash
VOLUMN_PATH="/Users/martinz/linux-dev/mole-core"
docker run --rm -ti --env RUNNER=${RUNNER:-start} -v $VOLUMN_PATH:/dermis -p ${PORT:-3000}:3000 jszhengyq/dermis