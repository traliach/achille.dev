# achille.dev

Personal portfolio platform — public-facing site with an admin dashboard for managing all content.

**Live:** client on Vercel, API on Render, database on MongoDB Atlas.

---

## Stack

- `client/` — React 19 + TypeScript + Vite + Tailwind CSS
- `server/` — Node.js + Express + TypeScript + MongoDB/Mongoose
- `infra/` — Terraform for MongoDB Atlas (project + M0 cluster)
- Auth — JWT + TOTP MFA (Google Authenticator)
- CI/CD — GitHub Actions → auto-deploy to Render + Vercel

---

## Local Development

Install from the repo root once:

```bash
npm install
```

Start the API:

```bash
cd server
npm run dev
```

Start the client (in a separate terminal):

```bash
cd client
npm run dev
```

Client runs on `http://localhost:5173`. The Vite proxy forwards `/api` requests to `http://localhost:4000`, so `VITE_API_BASE_URL` doesn't need to be set locally.

---

## Environment Variables

Copy the example file and fill in the values:

```bash
cp server/.env.example server/.env
```

Required server variables:

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=strong-password
JWT_SECRET=long-random-string
JWT_EXPIRES_IN=12h
ADMIN_MFA_SECRET=
ADMIN_MFA_RECOVERY_CODE_HASHES=
ADMIN_MFA_ISSUER=achille.dev Admin
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
```

For local development without a deployed API, leave `VITE_API_BASE_URL` unset in the client. Set it in Vercel for production:

```env
VITE_API_BASE_URL=https://your-api.onrender.com
```

---

## MFA Setup

Run this once before deploying to production:

```bash
npm --workspace server run admin:mfa:setup
```

It prints the `ADMIN_MFA_SECRET`, `ADMIN_MFA_RECOVERY_CODE_HASHES`, and an `otpauth://` URL. Scan that URL in Google Authenticator (or Authy, 1Password, etc.). Save the recovery codes somewhere offline — not in the repo.

To get the current 6-digit code during local testing:

```bash
npm --workspace server run admin:mfa:code
```

---

## Commands

From the repo root:

```bash
npm run dev:client        # start client dev server
npm run dev:server        # start API dev server
npm run build:client      # Vite production build
npm run build:server      # TypeScript compile
npm run lint:client       # ESLint
npm run test:server       # build + smoke tests
npm run ci                # full check (server + client)
```

From the server directory:

```bash
npm run admin:login       # print a JWT for API testing
npm run admin:mfa:setup   # generate MFA secret + recovery codes
npm run admin:mfa:code    # print current TOTP code
npm run content:reset     # reset DB to seed data
```

---

## Tests

The server smoke test suite covers:

- `GET /api/health`
- admin login (success and failure cases)
- session check after login
- admin route guard behavior
- public testimonial submission when MongoDB is unavailable

```bash
cd server
npm run test
```

---

## CI/CD

Pipeline is in `.github/workflows/ci.yml`.

Three jobs run in parallel on every push and pull request:

- **server** — TypeScript build + smoke tests
- **client** — ESLint + Vite build
- **audit** — `npm audit` at high severity

If all three pass and the push is to `main`, a fourth **deploy** job fires:

1. Triggers a Render deploy hook
2. Waits and polls `GET /api/health` until it returns 200
3. Vercel deploys automatically from the same git push

Required GitHub secrets:

| Secret | Where to get it |
|--------|----------------|
| `RENDER_DEPLOY_HOOK` | Render → service → Settings → Deploy Hook |
| `RENDER_SERVICE_URL` | Your Render service URL, e.g. `https://resume-platform-api.onrender.com` |

---

## Deploying

### Render (API)

Create a Web Service, point it at this repo, and use:

- Root Directory: `server`
- Build Command: `npm ci && npm run build`
- Start Command: `npm run start`
- Health Check Path: `/api/health`

Set all server environment variables from the section above. Set `CLIENT_ORIGIN` to the exact Vercel URL after you have it — the admin cookie won't work otherwise.

### Vercel (Client)

Import the repo and use:

- Root Directory: `client`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

Set `VITE_API_BASE_URL` to the Render API URL.

### Post-deploy order

1. Deploy Render, verify `/api/health` returns `{"status":"ok"}`
2. Deploy Vercel, copy the production URL
3. Update `CLIENT_ORIGIN` in Render env vars to the exact Vercel URL
4. Redeploy Render
5. Test admin login at `/admin` with email + password + Authenticator code

### Rollback

- **Vercel** → Deployments tab → redeploy any previous build
- **Render** → roll back to a previous deploy or push a revert commit
- **MFA loss** → use a recovery code; if all codes are gone, run `admin:mfa:setup` again, update the two MFA env vars in Render, and redeploy

---

## Admin Panel

The admin dashboard is at `/admin`. It uses a secure httpOnly cookie session — no tokens in localStorage.

For API testing outside the browser (Postman, curl):

```bash
cd server
npm run admin:login
```

That prints a JWT you can pass as a Bearer token.

---

## Infrastructure

The `infra/` directory manages the MongoDB Atlas project and M0 cluster through Terraform. Temporary IP access for local development should be added through the Atlas UI or Atlas CLI, not Terraform.

```bash
# add your current IP temporarily
atlas accessLists create --currentIp --projectId YOUR_PROJECT_ID
```

State files and `.tfvars` are gitignored. Keep them local or use remote state.
