#!/usr/bin/env bash

set -e

echo "info: loading secrets..." >&2

file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"

	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo "error: both $var and $fileVar are set (but are exclusive)" >&2
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		echo "info: $var exists" >&2
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		echo "info: $fileVar loaded" >&2
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

file_env "JWT_SECRET_KEY"
 
exec "$@"