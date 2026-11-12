# Publish the V2 code through your GitHub account

This guide assumes Windows and uses GitHub Desktop so the nested Supabase function folders are uploaded correctly.

## 1. Extract the project

1. Download `experiences-community-v2.zip`.
2. Right-click it and choose **Extract All**.
3. Keep the extracted folder somewhere easy to find, such as `Documents\experiences-community-v2`.

## 2. Create an empty private GitHub repository

1. Sign in to GitHub.
2. Select **New repository**.
3. Name it `experiences-community-v2`.
4. Choose **Private**.
5. Do not add a README, `.gitignore`, or licence on GitHub (those files are already included in the project).
6. Create the repository and leave its page open.

## 3. Clone it with GitHub Desktop

1. Install and open GitHub Desktop: https://desktop.github.com/
2. Sign in to the same GitHub account.
3. Choose **File → Clone repository**.
4. Select `experiences-community-v2` and choose a local folder, for example `Documents\GitHub`.
5. Click **Clone**.
6. Open the cloned repository folder on your computer.
7. Copy the contents of the extracted V2 project folder into the cloned repository folder. Copy the files and folders inside it, not an extra enclosing folder.
8. Return to GitHub Desktop. The new files should appear in the Changes list.
9. Enter a summary such as `Add V2 website and Supabase backend`.
10. Click **Commit to main**, then **Push origin**.

Your source code is now in your private GitHub repository.

## 4. Deploy the public front end with Vercel

1. Sign in to https://vercel.com/.
2. Choose **Add New → Project**.
3. Import the private `experiences-community-v2` repository. Authorise Vercel to access that repository if asked.
4. Keep the framework preset as **Other**. No build command is needed for this static site.
5. Deploy.
6. Save the Vercel address shown after deployment. It will look like `https://your-project.vercel.app`.

Do not add a Supabase secret key or service-role key to Vercel environment variables. The browser only needs the project URL and publishable key already present in `config.js`.

## 5. Deploy the Supabase Edge Function

The SQL tables are already prepared in the connected Supabase project, but the Edge Function must be deployed before chats and management actions work online.

Install the Supabase CLI, open PowerShell in the project folder, then run:

```powershell
supabase login
supabase link --project-ref obhtraejkfcwkxdmgxec
supabase functions deploy site-api --no-verify-jwt
```

The function performs its own visitor-token and management-session checks. `--no-verify-jwt` is intentional for this mixed public/management endpoint; do not remove the checks inside `supabase/functions/site-api/index.ts`.

## 6. Finish management access and allowed website domains

Follow `SUPABASE-SETUP.md` in this folder. In summary:

1. Create the management user in Supabase **Authentication → Users** with an email and a strong password you keep private.
2. Add that user's Auth UUID to `public.admin_users` using the SQL statement in `SUPABASE-SETUP.md`.
3. Disable public user sign-up in Supabase Auth.
4. Add the Vercel production URL to the Edge Function secret `SITE_ALLOWED_ORIGINS` (and any custom domain you use).
5. Set Supabase Auth's Site URL and allowed redirect URLs to the Vercel domain.
6. Open `/dashboard.html` on the deployed site and sign in.

Never paste a management password, a Supabase secret key, or a service-role key into GitHub or a public browser file.

## 7. Test before inviting visitors

Use the checklist in `SUPABASE-SETUP.md`. Test the public enquiry flow, visitor-to-management handover, management reply, return to the scripted assistant, community form, each editor, media upload and the mobile layout. Keep events and fan-meeting listings empty until the authorised operator has confirmed the details.
