#!/bin/bash

app="gate.js"
host="0.0.0.0"

stop() {
	pm2 stop $app
}

prod() {
	stop
	NODE_ENV=production pm2 start $app --watch  --name "$app (production)"
	pm2 show $app
}

dev() {
	stop
	NODE_ENV=development pm2 start $app --watch  --name "$app (development)"
	pm2 show $app
}


debug() {
	stop
	node --inspect=$host $app
	#node debug --debug-brk=0 --debug-port=5858 --web-port=8088 --web-host=$host $app
	# node --inspect-brk=$host $app
	#node --inspect=0.0.0.0 $app
}


if [ $# -eq 0 ];
then

        echo "missing arguments - prod, dev, stop or debug"

else

        echo $1

	if [ $1 == 'dev' ];
        then
                dev
        fi
	if [ $1 == 'prod' ];
        then
                prod
        fi

        if [ $1 == 'stop' ];
        then
                stop
        fi

        if [ $1 == 'debug' ];
        then
                debug
        fi

fi

exit 0
