#!/bin/bash

npm install -g pm2

npm install

npm link

pm2 start ip-tracker --name ip-tracker

pm2 startup
pm2 save

echo "ip-tracker is now running with pm2 and configured to start on system startup."
echo "Use the following pm2 commands to manage the ip-tracker process:"
echo "  pm2 stop ip-tracker    # to stop the process"
echo "  pm2 restart ip-tracker # to restart the process"
echo "  pm2 delete ip-tracker  # to delete the process"
echo "  pm2 logs ip-tracker    # to view logs"
