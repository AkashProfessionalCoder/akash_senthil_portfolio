// Runs after the client build and the SSR build (see the "build" script in
// package.json): imports the SSR bundle that `vite build --ssr
// src/entry-server.tsx` just produced - a plain Node-ready module whose
// asset imports already resolve to the same hashed /assets/... URLs as the
// client build, since both builds hash the same source files - and inlines
// its rendered HTML into dist/index.html's #root. main.tsx hydrates onto
// this markup instead of replacing it.
//
// Deliberately non-fatal: if anything here throws, it logs a warning and
// leaves dist/index.html exactly as `vite build` produced it (today's
// client-rendered-only behaviour) rather than failing the whole deploy over
// an enhancement that isn't load-bearing.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

async function main() {
  const { renderApp } = await import('../dist-ssr/entry-server.js')
  const { html, data } = await renderApp('/')

  const indexPath = path.resolve(process.cwd(), 'dist/index.html')
  const template = await readFile(indexPath, 'utf-8')

  const marker = '<div id="root"></div>'
  if (!template.includes(marker)) {
    throw new Error(`Could not find ${JSON.stringify(marker)} in dist/index.html to prerender into`)
  }

  // Escape "<" so a literal "</script>" inside the data can't close this tag
  // early. AppProviders.tsx reads this to seed the client's query cache with
  // the exact data the markup above was rendered from.
  const dataJson = JSON.stringify(data).replace(/</g, '\\u003c')
  const dataScript = `<script id="portfolio-data" type="application/json">${dataJson}</script>`

  const output = template.replace(marker, `<div id="root">${html}</div>${dataScript}`)
  await writeFile(indexPath, output, 'utf-8')
  console.log(`[prerender] wrote ${html.length} characters of rendered HTML into dist/index.html`)
}

main().catch((err) => {
  console.warn('[prerender] skipped - the build still shipped the normal client-rendered page.')
  console.warn(err)
})
