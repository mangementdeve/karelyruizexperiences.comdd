# Supabase setup for V2

The project is configured for the existing Supabase project:

- Project ref: `obhtraejkfcwkxdmgxec`
- Project URL: `https://obhtraejkfcwkxdmgxec.supabase.co`
- Edge Function name: `site-api`
- Public media bucket: `site-media`

The project already contains the core experience, enquiry, chat-script, events, fan-stop, global-message, settings and chat-room tables. The V2 build added the admin allow-list, media library and chat-flow progress fields, plus restricted RLS policies for management inbox reads.

## 1. Confirm the Edge Function

In Supabase Dashboard, open **Edge Functions** and confirm `site-api` is deployed. This function uses:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEYS` (the `default` secret key is preferred)
- `SUPABASE_SERVICE_ROLE_KEY` only as a backwards-compatible fallback for older runtimes

The secret key is used only inside the Edge Function. It must never be copied into `config.js`, GitHub, Vercel public environment variables or browser code.

The function has `verify_jwt = false` because it performs its own authentication: public enquiry actions are limited and use a random per-conversation visitor token; every admin action validates the Supabase Auth bearer token and checks that account in `public.admin_users`.

## 2. Create the management login

Create the management user directly in Supabase Dashboard:

1. Open **Authentication → Users**.
2. Choose **Add user** and enter the management email address and a strong, unique password.
3. Confirm the account as required by the dashboard's user-creation flow.
4. Copy that user's UUID.
5. Open **SQL Editor** and run the statement below after replacing the values.

```sql
insert into public.admin_users (user_id, email, display_name, is_active)
values (
  'PASTE-AUTH-USER-UUID-HERE'::uuid,
  'management@example.com',
  'Management',
  true
)
on conflict (user_id) do update
set email = excluded.email,
    display_name = excluded.display_name,
    is_active = true;
```

6. Turn off public account sign-up under **Authentication → Settings → User Signups**. Only accounts you deliberately create and add to `admin_users` should be allowed to manage the site.
7. Open `https://YOUR-VERCEL-DOMAIN/dashboard.html` and sign in with that management email/password.

The SQL UUID is not a password. Never share the password in GitHub or website code. Additional staff may be given separate Auth accounts and allow-list records if the operator approves them.

## 3. Function origin allow-list

The function temporarily permits localhost and Vercel subdomains when `SITE_ALLOWED_ORIGINS` has not been set. Before public launch, set the Edge Function secret named `SITE_ALLOWED_ORIGINS` to a comma-separated exact list, for example:

```text
https://your-project.vercel.app,https://www.your-domain.com,https://your-domain.com
```

Once this secret is set, only exact origins in that list are accepted. Include both the Vercel production domain and any custom domain used by the website. Save the secret in **Edge Functions → Secrets**. Do not add a `SUPABASE_` prefix to custom secret names.

## 4. Authentication URLs

In **Authentication → URL Configuration**, set the site URL to the production Vercel address and add the production host plus the local test host (`http://127.0.0.1:4173`) to the allowed redirect URLs. Password sign-in is used; no public sign-up form is included.

## 5. Storage

The `site-media` bucket is public-read to display published images. The Edge Function uses its private server-side credentials to upload and delete files. The visitor website does not have a direct upload path.

## 6. Test checklist

- `GET https://obhtraejkfcwkxdmgxec.supabase.co/functions/v1/site-api?action=health` should return `{ "ok": true, "service": "site-api" }`.
- The public homepage should load seven active experience categories from `public.experiences`.
- Starting an experience should create one row in `public.conversations` and greeting/flow messages in `public.messages`.
- A visitor's random token should only retrieve that visitor's conversation.
- A visitor requesting management should change only that conversation to `waiting_for_management`.
- The management inbox should show the conversation; joining should pause automation only for that conversation.
- Management replies should appear in the visitor chat; returning the conversation should resume that visitor's guided flow.
- Global messages, event/fan scripts and chat appearance changes should be reflected on the public page after refresh.

## Important security architecture note

Supabase's Data API requires explicit grants separately from RLS. The new `admin_users` and `media_items` tables have server-side grants and RLS enabled; only the minimal authenticated SELECT grants needed for an allow-list self-read and admin Realtime inbox reads are present. The Edge Function uses the server-only secret key to perform all other private operations. Supabase explains the distinction between grants and RLS in its current API security guidance: https://supabase.com/docs/guides/api/securing-your-api
