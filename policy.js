const cfg = window.V2_CONFIG;
const allowed = ['en','es','fr','de','it','pt','nl'];
const language = allowed.includes((navigator.language || 'en').slice(0,2).toLowerCase())
  ? (navigator.language || 'en').slice(0,2).toLowerCase() : 'en';
const field = document.body.dataset.policyField;
const target = document.querySelector('#policyCustomText');
if (field && target && cfg?.API_URL && cfg?.SUPABASE_PUBLISHABLE_KEY) {
  fetch(cfg.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: cfg.SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${cfg.SUPABASE_PUBLISHABLE_KEY}`
    },
    body: JSON.stringify({ action: 'public_config', language })
  }).then(async response => {
    if (!response.ok) return;
    const data = await response.json();
    const value = data?.settings?.[field];
    if (typeof value === 'string' && value.trim()) {
      target.textContent = value.trim();
      target.hidden = false;
    }
  }).catch(() => {});
}
