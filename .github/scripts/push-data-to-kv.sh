#!/usr/bin/env bash
# Usage: push-data-to-kv.sh file1.json [file2.json ...]
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?}"
: "${CLOUDFLARE_ACCOUNT_ID:?}"
: "${CF_KV_NAMESPACE_ID:?}"

for file in "$@"; do
  if [ -f "$file" ]; then
    key=$(basename "$file")
    npx --yes wrangler@4 kv key put "$key" --path "$file" \
      --namespace-id "$CF_KV_NAMESPACE_ID" --remote
  fi
done
