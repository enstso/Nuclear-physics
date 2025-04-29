#!/bin/bash
# wait-for-it.sh: Wait for a service to be available before continuing execution
# Usage: wait-for-it.sh host:port -- command_to_run

TIMEOUT=15
HOST=$1
PORT=$2
shift 2
COMMAND=$@

# Check if the service is available
for i in $(seq $TIMEOUT); do
  nc -z $HOST $PORT && break
  if [ $i -eq $TIMEOUT ]; then
    echo "Error: Service $HOST:$PORT not available after $TIMEOUT seconds"
    exit 1
  fi
  echo "Waiting for $HOST:$PORT... ($i/$TIMEOUT)"
  sleep 1
done

# Execute the command
exec $COMMAND