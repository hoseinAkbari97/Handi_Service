# 🤝 Handi Project Contribution & Git Workflow

This document defines how **Hossein (backend, repo owner)** and **Erfan (frontend)** collaborate on the Handi project using Git and GitHub.

It ensures a clean, safe, and efficient workflow for development, merging, and releases.

---

## 🧑‍💻 Frontend Developer Workflow (Erfan)

> Goal: Work safely on your own branches, stay up-to-date, and merge through Pull Requests.

### ⚙️ 1. Initial setup (first time only)
```bash
git clone https://github.com/HosseinAkbari/handi.git
cd handi
cd Handi-Service
npm install
cp ../.env.example .env
npm run dev
```

### 🌿 2. Start a new feature or task
Always start from the latest **develop** branch:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/frontend-task-name
```
Examples:
- `feature/frontend-login-page`
- `feature/frontend-service-request`
- `fix/frontend-form-validation`

### 💻 3. Work, commit, and push
```bash
git add .
git commit -m "feat(frontend): add login form layout"
git push -u origin feature/frontend-task-name
```

### 🔁 4. Pull Request (PR)
1. Go to **GitHub → Pull Requests → New pull request**
2. **Base branch:** `develop`  
   **Compare branch:** `feature/frontend-task-name`
3. Add a short title and description (e.g., _"Frontend: Login page + API integration"_)
4. Assign **Hossein** as reviewer
5. Wait for review → fix feedback → Hossein merges to `develop`

### 🔄 5. After PR merge
```bash
git checkout develop
git pull origin develop
git branch -d feature/frontend-task-name
```
Then start a new branch for the next task.

### 🧩 6. Daily checklist
| Step | Command | When |
|------|----------|------|
| Get latest develop | `git checkout develop && git pull` | Every morning |
| Create new feature | `git checkout -b feature/frontend-...` | Start of task |
| Commit work | `git add . && git commit -m "..."` | During task |
| Push work | `git push -u origin feature/frontend-...` | When ready |
| PR to develop | via GitHub | End of task |
| Update local develop | `git pull` | After merge |

✅ **Golden rules**
- Never push directly to `main` or `develop`
- Always branch off `develop`
- One task = one branch = one PR
- Pull latest `develop` before starting new work
- Keep `.env` private (don’t commit it)

---

## 👑 Backend Developer Workflow (Hossein — Repo Owner)

> Goal: Maintain repo structure, review PRs, and manage releases.

### ⚙️ 1. Repository setup
```bash
cd handi
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/HosseinAkbari/handi.git
git push -u origin main
```
Then on GitHub:
- Create **develop** branch from `main`
- Protect `main` in Settings → Branches → Add rule:
  - ✅ Require PRs before merging
  - ✅ Require 1 approval
  - ✅ Include administrators
  - ✅ Prevent force pushes

### 🌿 2. Daily backend work
```bash
git checkout develop
git pull origin develop
git checkout -b feature/backend-auth-api
```
Develop inside **Handi-Backend/**.

### 💻 3. Regular workflow
```bash
git add .
git commit -m "feat(backend): add JWT authentication"

# Sync before pushing
git checkout develop
git pull origin develop
git checkout feature/backend-auth-api
git merge develop
git push -u origin feature/backend-auth-api
```
Then open a PR:
- Base: `develop`
- Compare: `feature/backend-auth-api`
- Assign Erfan if frontend is affected
- Merge only after tests and review

### 🔁 4. Managing merges & releases
```bash
git checkout main
git pull origin main
git merge develop
git push origin main
git tag -a v1.0.0 -m "First MVP release"
git push origin v1.0.0
```

### 🧰 5. Maintenance duties
| Task | Frequency |
|------|------------|
| Review and merge frontend PRs | As needed |
| Pull latest develop | Daily |
| Maintain `.env.example`, Docker configs | As needed |
| Approve PRs, delete merged branches | Weekly |
| Create stable releases from main | When ready |

### 🔐 6. Owner actions
- Manage collaborators: **Settings → Manage Access → Invite Erfan**
- Maintain branch protection for `main` (and optionally `develop`)
- Add CI/CD later (GitHub Actions for backend tests & frontend build)

### 🧩 7. Daily checklist
| Step | Command | Purpose |
|------|----------|----------|
| Update develop | `git checkout develop && git pull` | Stay synced |
| New feature | `git checkout -b feature/backend-...` | New task |
| Merge develop | `git merge develop` | Before pushing |
| Push branch | `git push -u origin feature/backend-...` | Share work |
| Review PRs | GitHub UI | Integrate Erfan’s work |
| Merge to main | `git merge develop` | Release |

✅ **Golden rules**
- Approve and merge all PRs via GitHub
- Never code directly on `main`
- Communicate merges to Erfan (so he can pull latest `develop`)
- Keep secrets out of Git
- Tag stable releases

---

### 🏁 Example Daily Cycle (Hossein)
```bash
# 1️⃣ Start day
git checkout develop
git pull origin develop

# 2️⃣ Work on a task
git checkout -b feature/backend-payment-api
# ... code ...
git add .
git commit -m "feat(backend): add payment endpoints"

# 3️⃣ Sync before pushing
git checkout develop && git pull origin develop
git checkout feature/backend-payment-api
git merge develop
git push -u origin feature/backend-payment-api

# 4️⃣ Open PR → merge to develop → notify Erfan
```

---

**End of Document**

