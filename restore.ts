import { restoreCache } from '@actions/cache';
import { context } from '@actions/github';
import { fromFile } from 'hasha';

const paths = [
    '~/.npm',
]


console.log('Restoring NPM cache')

async function run() {
    const hash = await fromFile('package-lock.json', { algorithm: 'md5' });

    const key = 'npm-keplr-cache-' + hash + '-' + context.runId;
    const restoreKeys = [
        'npm-keplr-cache-' + hash
    ]

    const cacheKey = await restoreCache(paths, key, restoreKeys)
    console.log('NPM cache restored')

}

run().catch((e) => {
    console.error(e)
    process.exit(-1)
});