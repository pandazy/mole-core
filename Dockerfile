FROM node:alpine
WORKDIR /skin-dev
EXPOSE 3000
CMD ["sh", "docker/_inner-run.sh", "${RUNNER:-start}"]