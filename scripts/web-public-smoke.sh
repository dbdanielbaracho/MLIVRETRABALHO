#!/usr/bin/env bash
set -euo pipefail

: "${WEB_BASE_URL:?Set WEB_BASE_URL to the public Web origin}"
: "${API_BASE_URL:=https://mlivretrabalho.predibeacon.com}"

web="${WEB_BASE_URL%/}"
api="${API_BASE_URL%/}"

status() { curl -sS -o /tmp/mlivre-body -w '%{http_code}' --max-time 20 "$1"; }

web_code="$(status "$web/")"
case "$web_code" in
  200|301|302|307|308) ;;
  *) echo "FAIL web root HTTP $web_code"; cat /tmp/mlivre-body; exit 1 ;;
esac

api_code="$(status "$api/v1/health/ready")"
if [ "$api_code" != "200" ]; then
  echo "FAIL API readiness HTTP $api_code"; cat /tmp/mlivre-body; exit 1
fi

cors_headers="$(curl -sSI --max-time 20 -H "Origin: $web" "$api/v1/health/ready" | tr -d '\r')"
if ! printf '%s\n' "$cors_headers" | grep -qi '^access-control-allow-origin:'; then
  echo "FAIL no CORS allow-origin header for Web origin"
  exit 1
fi

echo "PASS public Web root=$web_code API-ready=$api_code CORS-header=present"
