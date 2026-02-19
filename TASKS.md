# TASKS — Skin Analyzer MVP

## Build Order: Layout shell → Static UI → Data integration → Interactions

### Phase 2: Scaffold
- [x] **T1**: Scaffold Next.js + shadcn + Convex + AI packages
- [x] **T2**: Create layout shell (header with logo, footer with disclaimer)

### Phase 3: Build — Landing Page
- [x] **T3**: Landing page hero section with CTA
- [x] **T4**: How it works section (3 steps)
- [x] **T5**: Trust badges section

### Phase 3: Build — Upload Flow
- [x] **T6**: Upload page UI (camera capture + file upload)
- [x] **T7**: Photo preview with retake and consent

### Phase 3: Build — Data Layer
- [ ] **T8**: Convex schema + seed treatments data *(blocked — needs human setup)*
- [x] **T9**: AI analysis API route (Claude Vision)

### Phase 3: Build — Results Page
- [x] **T10**: Results page - skin score card
- [x] **T11**: Results page - findings list
- [x] **T12**: Results page - treatment recommendations
- [ ] **T13**: Results page - photo overlay markers *(deferred to Phase 2)*

### Phase 3: Build — Polish (Session 2+3)
- [x] **T14**: Loading/analyzing animation state
- [x] **T15**: Error handling + empty states + per-page metadata
- [x] **T16**: Privacy policy page
- [x] **T17**: Medical disclaimer page
- [x] **T18**: Footer legal links
- [x] **T19**: Dark mode support
- [x] **T20**: Mobile navigation menu
- [x] **T21**: Smooth scroll for anchor links
- [x] **T22**: SEO files (robots.txt + sitemap.xml)
- [x] **T23**: Image compression before upload
- [x] **T24**: Request timeout + error handling
- [x] **T25**: Custom SVG favicon
- [x] **T26**: Mobile responsive audit (8.5+/10 all pages)

---
**Session 3 result**: 7 features committed. All pushed to GitHub.
**Total**: 19/21 MVP tasks completed across 3 sessions.
**Remaining**: T8 (Convex — needs human), T13 (photo overlays — deferred)
**Next**: Set up Convex, add ANTHROPIC_API_KEY, deploy to Vercel
