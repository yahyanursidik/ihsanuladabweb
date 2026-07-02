# StudioCMS + Astro 7 Notes

This project is scaffolded on Astro 7.0.4 as requested.

As of 2026-07-01, the current npm release of `studiocms` is `0.4.4` and its peer dependency is:

```json
{
  "astro": "^5.12.9"
}
```

Because of that peer dependency, StudioCMS is not enabled in `astro.config.mjs` yet. Forcing it into an Astro 7 build may create an unstable dependency tree or runtime failures.

Recommended path:

1. Keep this public website on Astro 7.
2. Enable StudioCMS once the package publishes Astro 7 support.
3. If StudioCMS must be used immediately, create a separate Astro 5 CMS branch or downgrade the project to Astro 5.12.x.

Content sections in `src/pages/index.astro` are already structured as data arrays so they can be moved into StudioCMS collections later with minimal layout changes.
