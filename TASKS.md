# TASKS — Skin Analyzer MVP (Session 1)

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
- [ ] **T8**: Convex schema + seed treatments data *(schema written, Convex not configured yet)*
- [x] **T9**: AI analysis API route (Claude Vision)

### Phase 3: Build — Results Page
- [x] **T10**: Results page - skin score card
- [x] **T11**: Results page - findings list
- [x] **T12**: Results page - treatment recommendations
- [ ] **T13**: Results page - photo overlay markers *(deferred to Phase 2)*

### Phase 3: Build — Polish
- [x] **T14**: Loading/analyzing animation state
- [x] **T15**: Error handling + empty states + per-page metadata

### Stretch (if time/tokens allow)
- [x] Share results link *(Web Share API + clipboard fallback on results page)*
- [ ] Privacy policy page
- [ ] Analytics event tracking (anonymous)

---
**Session 1 result**: 13/15 tasks completed. 10 commits pushed.
**Remaining**: T8 (Convex setup — needs human action), T13 (photo overlays — deferred)
**Next session**: Wire Convex storage, deploy to Vercel
