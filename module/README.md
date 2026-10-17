<h1 align="center">Custom Script Template</h1>

<p align="center">
   A starter template for custom script development
    <br />
    Build custom scripts quickly and easily. This template provides frameworks and starting points for common redbull.com development tasks.
<br />
<a href="https://github.com/rbmh-partner-projects/extension-module-template/issues">Report Bug</a>
·
<a href="https://github.com/rbmh-partner-projects/extension-module-template/issues">Request Feature</a>
</p>

## Introduction

- 🚀 **Quick scaffolding** with `npx @rb-cep/custom-script`
- 🛠️ **Powered by [Vite](https://vite.dev/)** and `@rb-cep/custom-script`for seamless integration with redbull.com
- ⚛️ **Framework support** - React, Vue, Svelte, Preact, or Vanilla JS
- 🔧 **TypeScript-first** with JavaScript support
- 🌐 **Backend support** with Node.js/Express
- 🔄 **Live development** on actual redbull.com pages
- 📦 **Production builds** optimized for Red Bull's ecosystem

## Getting Started

Install the node modules:

```bash
npm install
```

Scaffold your project by running the interactive CLI:

```bash
npx create-custom-script
```

The CLI will prompt you to choose:

- Frontend framework (React, Vue, Svelte, Preact, or Vanilla JS)
- Whether you need Backend support (Node.js/Express)

### Available Frameworks

Choose from these framework templates:

- React
- Preact
- VueJS
- SvelteJS

or just use Vanilla JS if you like to code with `element.innerHtml = <h1>Hello brave world!</h1>`

### Backend Support

If you need a backend, the `create-custom-script` command can generate a Node Express.js starter with example endpoints for:

- JotForm/CDM webhooks
- RB Account deletion callbacks
- CREPO (Content Repository) resource fetching

Find these examples in `backend/src/routes`.

> **Note:** The backend also serves static files from Vite's frontend build using [ViteExpress](https://github.com/szymmis/vite-express).
Optionally can also deploy the frontend seperatly as static hosting.

### TypeScript First

The template uses TypeScript (`.ts` and `.tsx` files) by default, but you can still use just Javascript:

- Create just `.js` files or rename existing `.ts` files
- We recommend keeping `frontend/src/main.ts(x)` in Typescript to maintain type-safety with the Custom Script Panel integration.

## Extension Module Features

Your extension module only gets access to the parts of the Red Bull platform **API** that you explicitly opt into. You declare these capabilities as _features_ in `frontend/redbull.config.ts`, and the types flow through to the `api` object you receive in `render`.

### Declaring features

Each entry in your `ProjectConfig` maps an entrypoint to the list of features that module needs:

```typescript
import type { ExtensionModuleFeatures, ProjectConfig, ProjectPreviewConfig } from "@rb-cep/custom-script/config";

const projectConfig = [
  {
    entrypoint: "extension-module-1.js",
    features: [
      { name: "rbAccount" },
      {
        name: "translations",
        requiredTranslations: [{ key: "global.social_sharing_button.share" }],
      },
    ],
  },
] as const satisfies ProjectConfig;

export default projectConfig;

// Derive the feature types for this module (index 0) so `api` is fully typed
export type ModuleOneFeatures = ExtensionModuleFeatures<typeof projectConfig, 0>;
```

- **`ProjectConfig`** – the array of modules, one entry per entrypoint.
- **`ExtensionModuleFeatures<typeof projectConfig, INDEX>`** – derives the exact feature (and translation-key) types for the module at `INDEX`. Pass it to `ExtensionModuleExports<Config, Features>` so `api` only exposes the features you enabled.
- **`ProjectPreviewConfig`** – unrelated to features; it maps preview panels to entrypoints for `npm run preview`.

> **💡 Tip:** Use `as const satisfies ProjectConfig` so TypeScript keeps the literal `name` and `key` values and can enforce them across your `render` function.

### Consuming features in your module

Only the features you declared appear on `api`, and they are fully typed:

```typescript
import type { ExtensionModuleExports } from "@rb-cep/custom-script";
import type { ModuleOneFeatures } from "../redbull.config";

export const extensionModule: ExtensionModuleExports<{}, ModuleOneFeatures> = {
  render: async ({ el, config, api }) => {
    const rbAccount = await api.rbAccount.init();
    // `t` only accepts keys listed in requiredTranslations
    el.textContent = api.translations.t("global.social_sharing_button.share");
  },
};
```

### Available features

Declare any of the following by adding `{ name: "<feature>" }` to `features`:

| Feature | `api` access | Purpose |
| --- | --- | --- |
| `rbAccount` | `api.rbAccount` | Red Bull Account SDK – login, user profile, and tokens. |
| `translations` | `api.translations` | Localised strings via `t(key)` / `getTranslations()`. Requires `requiredTranslations`. |
| `analytics` | `api.analytics` | Push events to the data layer. |
| `share` | `api.share` | Open the native/custom share dialog. |
| `ssr` | `api.ssr` | Detect `client` vs `pre-rendering` mode. |
| `videoPlayer` | `api.videoPlayer` | Render the Red Bull video player. |
| `youtubeEmbed` | `api.youtubeEmbed` | Render a YouTube embed. |
| `giphyEmbed` | `api.giphyEmbed` | Render a Giphy embed. |
| `instagramEmbed` | `api.instagramEmbed` | Render an Instagram embed. |
| `riddleEmbed` | `api.riddleEmbed` | Render a Riddle embed. |
| `spotifyEmbed` | `api.spotifyEmbed` | Render a Spotify embed. |
| `tickarooEmbed` | `api.tickarooEmbed` | Render a Tickaroo live blog embed. |
| `tiktokEmbed` | `api.tiktokEmbed` | Render a TikTok embed. |
| `twitchEmbed` | `api.twitchEmbed` | Render a Twitch embed. |
| `xEmbed` | `api.xEmbed` | Render an X (Twitter) embed. |
| `zoeEngagement` | `api.zoeEngagement` | Red Bull ZOE engagement features. |

### The `translations` feature

`translations` is special: it requires a `requiredTranslations` array listing the keys your module uses.

```typescript
{
  name: "translations",
  requiredTranslations: [
    { key: "global.social_sharing_button.submit" },
    { key: "global.social_sharing_button.share" },
  ],
}
```

- Only the declared keys are accepted by `api.translations.t(key)` and returned by `getTranslations()`.
- Keys are validated at build time against Red Bull's official translation catalog, and the bundled ESLint rule flags unconfigured or unknown keys directly in your editor.

## How it works

This project setup uses Vite with the **RedBullVitePlugin** from our package `@rb-cep/custom-script` that is configured in the `vite.config.ts` similar to this:

```typescript
import { RedBullVitePlugin } from "@rb-cep/custom-script/vite";
import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";

/**
 * https://vitejs.dev/config/
 */
export default defineConfig((config: ConfigEnv) => {
	return {
		root: "./frontend",
		plugins: [RedBullVitePlugin(config), ... other plugins],
	};
});
```

The **RedBullVitePlugin** extends Vite to work with redbull.com's ecosystem to build custom experiences.

### Development Mode

```bash
npm run dev
```

> **Note:** When running `npm run dev` your extension module is executed from `frontend/development` to
give you the option to write code for the development mode (e.g. mock data).

The **RedBullVitePlugin** lets you develop on actual redbull.com pages that use **Extension Module Panels**.
Set the Red Bull page URL for development in `frontend/index.html` with the canonical link. You do not need to add a `<script>` tag for the development entrypoint; the plugin rewrites the Red Bull page config to load the matching file from `frontend/development`.

```html
<link
  rel="canonical"
  href="https://staging.redbull.com/pl-ay/local/3000/bundle.js"
/>
```

> **💡 Note:** Your page must have a **Extension Module Panel** enabled. You can set this up in Red Bull's Experience Center (XC).

The default sandbox URL includes the standard redbull.com header and footer layout.

For pages with multiple Extension Module Panels, target them by platform extension ID or by position:

- `frontend/development/<platformExtensionId>.ts` targets a specific panel, for example `frontend/development/a4985354-0230-4100-a7c3-974bd2160dc4.ts`
- `frontend/development/dev-module-1.ts` targets the first extension module panel
- `frontend/development/dev-module-2.ts` targets the second extension module panel
- and so on

### Build Mode

```bash
npm run build
```

The build process:

- Creates ESM entrypoints
- All `*.js` files `frontend/modules` are build as entrypoints
- Outputs the build to `frontend/dist`
- Supports multiple entrypoints per project

### Preview Mode

```bash
npm run preview
```

In the `frontend/redbull.config.ts` file you can configure your preview URL and the mapping of your entrypoints to
the Extenson Module Panel's ID.

Preview mode runs your script on the sandbox URL to test in the staging environment. This helps to test features like user login.

This command asks for 🔐 super-user privileges to install the local CA certificate and generate it for preview.https server certificate.
This is needed because the preview only works by serving the custom script from a https://localhost:3000 server.

> **💡 Note:** Changes to `frontend/src` files will trigger rebuilds. Refresh your browser to see updates, because HMR doesn't work in preview mode.

## Configuration

### Environment Variables

- **Backend variables**: Use `.env`
- **Frontend variables**: Use `frontend/.env`
- **Client-exposed variables**: Prefix with `VITE_PUBLIC_ENV`
- **Access in frontend code**: `import.meta.env.VITE_PUBLIC_ENV`

For more details, see the [Vite documentation](https://vite.dev/guide/env-and-mode.html#env-variables-and-modes).

## Practical Resources

### ViteJS Ecosystem

Our template supports Vite plugins. Browse them at: https://vite.dev/plugins/ if you have specific nees.

#### Example TailwindCSS Setup

Add TailwindCSS to your project in three steps:

> **💡 Note:** Use TailwindCSS v3, as v4's native CSS @layers don't work correctly with redbull.com's global styles.

##### 1. Install Dependencies

```
npm install -D tailwindcss@3 postcss autoprefixer
```

##### 2. Create PostCSS Config

In `postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

##### 3. Create TailwindCSS Config

In `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./frontend/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Working with Vanilla JavaScript

### Using Red Bull's Design System Cosmos

To make working with Cosmos web components more convenient and practical, read the documentation for JavaScript:

[Cosmos Documentation for Javascript](https://cosmos.redbull.design/WFp7-javascript)


---

## Working with ReactJS

### Using Red Bull's design system Cosmos

To make ReactJS working with Cosmos web components more convenient and practical read the offical documentation:

[Cosmos Documentation for React](https://cosmos.redbull.design/react)
