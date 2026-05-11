import 'dotenv/config';

const COLLEGE_SCORECARD_KEY = process.env.COLLEGE_SCORECARD_KEY;
const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools';

if (!COLLEGE_SCORECARD_KEY) {
    console.error('Missing COLLEGE_SCORECARD_KEY in env');
    process.exit(1);
}

async function run() {
    const params = new URLSearchParams({
        api_key: COLLEGE_SCORECARD_KEY,
        per_page: '5',
        page: '0'
    });

    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    console.log('status', res.status);
    const text = await res.text();
    try {
        const json = JSON.parse(text);
        console.dir(json, { depth: 2, maxArrayLength: 5 });
    } catch (e) {
        console.log('raw:', text);
    }
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
