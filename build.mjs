const workerFiles = [
    'db/WASQLiteDB.worker.js',
    'db/SharedWASQLiteDB.worker.js',
    'sync/SharedSyncImplementation.worker.js',
]

// Clean existing src and dist files
try {
    await $`rm -rf src dist`
} catch {
    // ignore
}

// Generate worker files in src
for (const f of workerFiles) {
    const content = `export * from '@powersync/web/lib/src/worker/${f}'`

    const fileInSrc = path.join('src', f)
    await $`mkdir -p ${path.dirname(fileInSrc)}`
    await $`echo ${content} > ${fileInSrc}`
}

// Build worker files
for (const f of workerFiles) {
    const fileInSrc = path.join('src', f)
    const fileInDist = path.join('dist', f)

    await $`npx esbuild ${fileInSrc} --bundle --minify --legal-comments=none --format=esm --outfile=${fileInDist}`
}

const wasmFiles = [
    'wa-sqlite-async.wasm',
    'wa-sqlite.wasm',
]

// Copy wasm files from node_modules to dist
for (const f of wasmFiles) {
    const fileInDist = path.join('dist/db', f)
    const fileInNodeModules = path.join('node_modules/@journeyapps/wa-sqlite/dist', f)

    await $`cp ${fileInNodeModules} ${fileInDist}`
}