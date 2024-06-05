# IP Tracker

A simple IP tracker for MacOS that logs your public IP address and notifies you when it changes via `say` and system notifications.

![alt text](<screenshot.png>)

## Installation

### Clone the repository:

   ```sh
   git clone https://github.com/aflansburg/pub-ip-tracker.git
   
   cd pub-ip-tracker
   ```

### Automatic setup + Run as background process
```sh
./setup.sh
```

### Manual setup + Run as background process
```sh
# install pm2
npm install -g pm2

# run pm2 w/ ip-tracker bin
pm2 start ip-tracker --name ip-tracker

# execute on system startup
pm2 startup
pm2 save

# to stop
pm2 stop ip-tracker

# to restart
pm2 restart ip-tracker

# delete
pm2 delete ip-tracker

# logs
pm2 logs ip-tracker
```

### Run as one off
```sh
npm install

npm link

ip-tracker
```


## Removal

### Scripted removal
```sh
./remove.sh
```

### Manual removal
```sh
pm2 stop ip-tracker

pm2 delete ip-tracker

# sometimes you may run into issues with stop and/or delete and have to run
pm2 save
# or
pm2 save --force

# cd to the directory of this project
npm unlink -g
```
