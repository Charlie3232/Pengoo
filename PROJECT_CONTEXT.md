# Pengoo Project Context

## Project Goal

Pengoo is a Taiwan-focused dating app built around the "penguin matchmaker" brand. The current app prioritizes:

- Real user review before matching.
- Google login with Firebase Authentication.
- Profile review through selfie and photo moderation.
- Mobile-first UI for Taiwanese users.
- Future quiz-based matching and avatar customization.

## Current Architecture

- Frontend: static HTML, CSS, and JavaScript.
- Deployment target: GitHub Pages.
- Backend services: Firebase only.
- Database: Firestore.
- Storage: Firebase Storage.
- Realtime chat: Firebase Realtime Database, planned but not implemented.
- Build process: none. There is no Node server and no npm build step.

All current app files live in the project root.

## Current Files

- `index.html`: Google login entry page.
- `profile.html`: 13-step profile creation flow.
- `home.html`: main page with review, approval, rejection, and quiz-ready states.
- `admin.html`: admin review panel and tag management.
- `profile_fix.html`: correction flow for rejected selfie, photos, or nickname.
- `firebase-config.js`: shared Firebase configuration, not yet used by all pages.

## Important Firebase Fields

Do not rename or casually change these fields. Multiple pages depend on them.

- `pendingReview`
- `selfieApproved`
- `rejected`
- `rejectionReasons`
- `photos`
- `selfieURL`
- `quizComplete`
- `quizCompletedAt`
- `quizUnlockAt`
- `blocked`

## Review State Rules

The review flow is the core of the current app. Treat it as fragile until tested.

- `profile.html` creates or updates the user profile and sets `pendingReview: true`.
- `admin.html` approves or rejects users.
- `home.html` reads user state and decides what the user sees.
- `profile_fix.html` reads `rejectionReasons` and sends corrected data back for review.

After a correction is submitted, the user document should return to review mode:

- `rejected: false`
- `pendingReview: true`
- `rejectionReasons: {}`
- `updatedAt: serverTimestamp()`

## Rejection Reasons Shape

Keep this structure stable:

```js
rejectionReasons: {
  selfie: ["reason text"],
  photos: {
    0: ["reason text"],
    2: ["reason text"]
  },
  nickname: ["reason text"],
  allPhotosBad: false
}
```

`admin.html`, `home.html`, and `profile_fix.html` all rely on this shape.

## Development Rules

- Preserve existing behavior unless the requested change requires touching it.
- Prefer small, targeted edits over broad rewrites.
- Keep the current plain HTML/CSS/JS style unless we intentionally refactor.
- Do not introduce a framework without explicit approval.
- Use `addEventListener` for dynamic user-generated content.
- Avoid building `onclick` strings with user data, photo URLs, nicknames, or tags.
- Keep `console.error(e)` in catch blocks for debugging.
- User-facing errors should be simple and friendly, not raw Firebase errors.
- Keep mobile-first layout around `max-width: 390px`.

## UI Rules

- Main brand colors:
  - Rose pink: `#E8B4BC`
  - Baby blue: `#B8CDD9`
  - Deep rose: `#6B2D3E`
  - Matchmaker red: `#CC1111`
  - Gold accent: `#d4a030`
  - App background: `#F5F0EE`
- Fonts: Nunito plus Noto Sans TC.
- Keep the penguin mascot visually consistent across pages.
- Buttons and controls should remain touch-friendly.

## Known Risk Areas

- Several pages duplicate Firebase initialization even though `firebase-config.js` exists.
- Some future pages are linked but not created yet: `quiz_intro.html`, `quiz.html`, `match.html`, `chat.html`, `my.html`, and `profile_edit.html`.
- `index.html` has redirect logic that may not match the current profile and quiz flow.
- `admin.html` still contains some `innerHTML` plus inline `onclick` usage in detail views and tag management.
- `profile_fix.html` appears to attach more than one `change` listener to `photoInput`; this should be reviewed before photo-fix changes.

## Next Suggested Work

1. Confirm the current login and review flow manually.
2. Fix `profile_fix.html` duplicate photo input listener if confirmed.
3. Clean up risky inline `onclick` usage in `admin.html`.
4. Add placeholder or real pages for linked-but-missing pages.
5. Gradually move shared Firebase setup to `firebase-config.js`.

