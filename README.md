# Policy Hub - Popular Multiservice

## Run it on your computer (test before deploying)

1. Open a terminal in this folder.
2. Install everything the project needs:
   ```
   npm install
   ```
3. Start it up:
   ```
   npm run dev
   ```
4. It'll print a local address, usually `http://localhost:5173` - open that in your browser.
5. Log in with an employee account you created in Supabase Authentication.

## Put it on GitHub

1. Create a new (empty) repository on github.com, e.g. `policy-hub`.
2. In this folder's terminal:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/policy-hub.git
   git push -u origin main
   ```

## Make it live with Vercel

1. Go to vercel.com, click "Add New... -> Project".
2. Select the `policy-hub` repository you just pushed.
3. Vercel will auto-detect it's a Vite project - leave the defaults and click Deploy.
4. In a couple of minutes you'll get a real URL (like `policy-hub-yourname.vercel.app`) that
   works from any computer, in either office, for everyone with a login.

## Notes

- The Supabase URL and key are already filled in in `src/supabaseClient.js`. They're the
  public "publishable" key, which is safe to have in the code - never put the *secret* key here.
- Employee logins are managed in Supabase (Authentication -> Users), then linked by ID in the
  `employees` table, as we set up earlier.
