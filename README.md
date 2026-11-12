# Experiences & Community — V2

A mobile-first public experiences website and private management workspace. The public site is a static front end; Supabase provides the database, authentication, file storage, and server-side API.

## Included in this build

- Responsive homepage and navigation, designed for phones first.
- Seven enquiry categories, each with a separate editable guided chat script.
- Published event/tour listings with an event-specific ticket-enquiry conversation.
- Separately published Meet the Fans stops with their own enquiry conversations.
- Photo and video gallery. Six source-linked editorial photographs are included as starting media; additional images and approved video embeds can be added through the management workspace.
- Community join form.
- Private management workspace with email/password sign-in, enquiry inbox, individual takeover/reply/return-to-assistant, experience script editing, global announcements, tour/event editing, fan-meeting editing, media management, chat appearance controls, and website/policy settings.
- Seven language choices with English-first guided flows. Only saved translations are fully localised; missing chat-script translations fall back to English.
- Privacy, cookie/storage and terms pages.

The assistant is a guided, rule-based enquiry assistant. No generative-AI API key is required. The website has no checkout, payment processor, payment collection or payment-instruction feature.

## Requirements

- Node.js 20+ for local preview and checks.
- A GitHub account for source control.
- A Vercel account for hosting.
- The existing Supabase project `karelyRuiz` (`obhtraejkfcwkxdmgxec`).

## Local preview

1. Extract the ZIP.
2. Open a terminal in the extracted project folder.
3. Run `npm run check`.
4. Run `npm run dev`.
5. Open `http://127.0.0.1:4173`.

This local server only serves the static files. Enquiries, chat and the management workspace require the Supabase Edge Function and an authorised management account to be configured.

## Deploy to the internet

1. Create a new **private** GitHub repository, for example `experiences-community-v2`.
2. Upload the contents of this folder to the repository root. Upload the extracted files, not the ZIP as a single file.
3. In Vercel, choose **Add New → Project**, import the GitHub repository and deploy. The project is static; no build command or output directory is required. Vercel will read `vercel.json`.
4. Keep the repository private. The browser configuration contains only the Supabase project URL and publishable key; it contains no server secret.
5. Configure the production site origin as described in `SUPABASE-SETUP.md` before inviting visitors.

## Security notes

- Never put a Supabase secret key, service-role key, management password, or `.env` file in GitHub.
- The admin sign-in screen is not the security boundary by itself. The Edge Function verifies the user's Supabase Auth session and checks the `public.admin_users` allow-list before every management action.
- Public visitors do not create accounts and cannot read other visitors' conversations or community submissions.
- Management conversation/message reads are limited by RLS to active admin accounts. Writes and other private operations go through the Edge Function.
- Realtime is used for management inbox updates. Visitor chat refreshes messages periodically while the chat is open.
- The `site-media` bucket is public for published media display. Upload and delete operations are server-side and admin-only.
- Browser storage keeps the visitor's random conversation token and cookie preference. Clearing browser storage can remove that local session reference.

## Content and media

The included gallery contains six distinct images referenced from published media articles and links back to their respective sources. Those source links do not grant a licence to rehost or reuse the photographs. The operator must confirm the applicable media permissions before commercial or long-term publication. Do not present generated artwork as a genuine photograph or video of the subject. Add only accurate, approved media and verified event details.

No tour events or fan-meeting dates are preloaded. Add and publish only details that have been verified by the authorised operator.

## Launch checklist

- [ ] Confirm the deployed website origin in the Supabase Edge Function settings.
- [ ] Create one management Auth user and add its Auth UUID to `public.admin_users`.
- [ ] Turn off public user sign-up in Supabase Auth.
- [ ] Test public experience chats, management handover, and per-conversation return to the assistant.
- [ ] Test community submission and admin review.
- [ ] Test all seven chat editors, global messages, event-specific chat, fan-meeting chat, chat theme editor and media library.
- [ ] Add operator-approved legal contact/retention details to the policies before public launch.
- [ ] Confirm image/video permissions and published event details.
- [ ] Review Supabase Security Advisor and keep database backups/retention policies configured.
