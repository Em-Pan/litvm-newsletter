#!/usr/bin/env bash
set -euo pipefail

# LitVM April 2026 Newsletter — SendGrid Single Send draft creator
# Usage:
#   export SENDGRID_API_KEY='SG...'
#   export SENDGRID_LIST_ID='YOUR_LIST_ID'
#   export SENDGRID_SENDER_ID='YOUR_VERIFIED_SENDER_ID'
#   export SENDGRID_UNSUB_GROUP_ID='YOUR_UNSUB_GROUP_ID'   # optional but recommended
#   ./sendgrid-create-april-campaign.sh

: "${SENDGRID_API_KEY:?Set SENDGRID_API_KEY}"
: "${SENDGRID_LIST_ID:?Set SENDGRID_LIST_ID}"
: "${SENDGRID_SENDER_ID:?Set SENDGRID_SENDER_ID}"

SUBJECT="LiteForge Testnet Is Live: LitVM April Update"
PREHEADER="8.4M transactions, 630K unique addresses, and the next wave of programmable Litecoin."
HTML_FILE="LitVM_April_2026_SENDGRID_READY.html"

if [[ ! -f "$HTML_FILE" ]]; then
  echo "Missing $HTML_FILE. Run from the litvm-newsletter repo root."
  exit 1
fi

python3 - <<'PY' > /tmp/litvm-april-sendgrid-payload.json
import json, os
html = open('LitVM_April_2026_SENDGRID_READY.html', encoding='utf-8').read()
preheader = os.environ.get('PREHEADER', '8.4M transactions, 630K unique addresses, and the next wave of programmable Litecoin.')
# Hidden preheader for email clients.
html = html.replace('<body style="margin: 0; padding: 0; background-color: #f4f4f4; width: 100%;">', '<body style="margin: 0; padding: 0; background-color: #f4f4f4; width: 100%;"><div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">' + preheader + '</div>', 1)
payload = {
  'name': 'LitVM April 2026 Newsletter',
  'send_to': {'list_ids': [os.environ['SENDGRID_LIST_ID']]},
  'email_config': {
    'subject': os.environ.get('SUBJECT', 'LiteForge Testnet Is Live: LitVM April Update'),
    'html_content': html,
    'sender_id': int(os.environ['SENDGRID_SENDER_ID']),
  }
}
if os.environ.get('SENDGRID_UNSUB_GROUP_ID'):
  payload['email_config']['suppression_group_id'] = int(os.environ['SENDGRID_UNSUB_GROUP_ID'])
print(json.dumps(payload))
PY

curl -sS -X POST 'https://api.sendgrid.com/v3/marketing/singlesends' \
  -H "Authorization: Bearer $SENDGRID_API_KEY" \
  -H 'Content-Type: application/json' \
  --data-binary @/tmp/litvm-april-sendgrid-payload.json \
  | python3 -m json.tool

echo

echo "Draft created. Review in SendGrid before scheduling."
