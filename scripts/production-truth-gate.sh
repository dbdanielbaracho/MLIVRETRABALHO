#!/usr/bin/env bash
set -euo pipefail
: "${BASE_URL:?BASE_URL_required}"
BASE_URL="${BASE_URL%/}"

BASE_URL="$BASE_URL" bash scripts/smoke-api.sh

response="$(curl --fail --silent --show-error --max-time 10 "$BASE_URL/v1/health/ready")"
if [[ -n "${EXPECTED_VERSION:-}" ]]; then
  printf '%s' "$response" | grep -Fq "\"version\":\"$EXPECTED_VERSION\"" || {
    echo "FAIL: expected version $EXPECTED_VERSION not reported by production readiness" >&2
    exit 1
  }
fi

echo "PASS: Production Truth Gate health/readiness contract"
