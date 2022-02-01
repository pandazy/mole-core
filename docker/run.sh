#!/bin/bash
docker run --rm -ti --env RUNNER=${RUNNER:-start} -v $1:/skin-dev -p ${PORT:-3000}:${PORT:-3000} jszhengyq/dermis