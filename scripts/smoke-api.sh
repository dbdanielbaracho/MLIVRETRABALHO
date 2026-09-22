#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
READY_URL="${BASE_URL%/}/v1/health/ready"
response="$(curl --fail --silent --show-error --max-time 10 "$READY_URL")"
printf '%s\n' "$response"
printf '%s' "$response" | grep -q '"status":"ok"'
printf '%s' "$response" | grep -q '"service":"api"'
printf '%s' "$response" | grep -q '"database":"ok"'
echo "PASS: API readiness smoke"
