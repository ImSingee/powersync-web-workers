# PowerSync Web Worker

> Make PowerSync works for Expo Web!

## Build PowerSync worker scripts

The `dist` dir of the repo ships the built worker scripts for `@powersync/web@1.0.0` and `@journeyapps/wa-sqlite@0.2.0`.

If you need to use other versions, you need to change the version in `package.json`, and run:

```sh
pnpm install
pnpm build
```

## Copy worker scripts to your projects' public folder

```sh
export PROJECT_ROOT=/path/to/your/projects
cp ./dist "$PROJECT_ROOT/public/lib/powersync/worker"
```

## Patch the `@powersync/web` module

You need to patch the following files of `@powersync/web` module to make it use our copied worker files

- `lib/src/db/sync/SharedWebStreamingSyncImplementation.js`
- `lib/src/worker/db/open-worker-database.js`

Change the `new URL('xxx', import.meta.url)` in these files to `'/public/lib/powersync/worker/xxx'`. See `@powersync__web@1.0.0.patch` file in the repo for reference.