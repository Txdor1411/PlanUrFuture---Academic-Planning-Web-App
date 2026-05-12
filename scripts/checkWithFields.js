import 'dotenv/config';

const COLLEGE_SCORECARD_KEY = process.env.COLLEGE_SCORECARD_KEY;
const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools';

if (!COLLEGE_SCORECARD_KEY) {
    console.error('Missing COLLEGE_SCORECARD_KEY in env');
    process.exit(1);
}

const fields = [
    'id',
    'school.name',
    'school.city',
    'school.state',
    'school.zip',
    'school.school_url',
    'school.ownership',
    'school.degrees_awarded.predominant',
    'school.institutional_characteristics.level',
    'location.lat',
    'location.lon',

    'latest.admissions.admission_rate.overall',
    'latest.admissions.sat_scores.average.overall',
    'latest.admissions.act_scores.midpoint.cumulative',

    'latest.cost.tuition.in_state',
    'latest.cost.tuition.out_of_state',
    'latest.cost.attendance.academic_year',
    'latest.cost.application_fee',

    'latest.student.size',
    'latest.completion.completion_rate_4yr_150nt',
    'latest.earnings.10_yrs_after_entry.median',
    'latest.aid.median_debt.completers.overall'
];

async function run() {
    const params = new URLSearchParams({
        api_key: COLLEGE_SCORECARD_KEY,
        'school.operating': '1',
        'school.degrees_awarded.predominant': '3',
        fields: fields.join(','),
        page: '0',
        per_page: '5'
    });

    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    console.log('status', res.status);
    const json = await res.json();
    console.dir(json.results?.[0], { depth: 4 });
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
