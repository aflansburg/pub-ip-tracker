# IP Tracker

A simple IP tracker for MacOS that logs your public IP address and notifies you when it changes via `say` and system notifications.

![alt text](<screenshot.png>)

## Installation

### Clone the repository:

   ```sh
   git clone https://github.com/aflansburg/pub-ip-tracker.git
   
   cd ip-tracker
   
   npm install

   npm link
   ```

## Usage
*Run the tracker*
```sh
ip-tracker
```

### Run as background process

#### Via setup script
```sh
./setup.sh
```

#### Via manual setup
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
