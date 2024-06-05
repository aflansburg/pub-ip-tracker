#!/bin/bash

pm2 stop ip-tracker

if pm2 status | grep -q "not synchronized"; then
  pm2 save --force
fi

pm2 delete ip-tracker

npm unlink -g ip-tracker

echo "ip-tracker has been stopped, deleted, and unlinked globally."
