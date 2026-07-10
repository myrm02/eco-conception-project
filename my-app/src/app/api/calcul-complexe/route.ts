import { NextResponse } from 'next/server';
import {
    getComplexCalculation,
    parseComplexLimit,
    parseComplexVariant,
} from '@/lib/calcul-complexe';
import { withK6ProfileLabels } from '@/lib/pyroscope-k6';
import { NO_STORE_CACHE_HEADERS } from '@/lib/cache-policy';
// a
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    return withK6ProfileLabels(request, () => {
        const url = new URL(request.url);
        const limit = parseComplexLimit(url.searchParams.get('limit'));
        const variant = parseComplexVariant(url.searchParams.get('variant'));
        const startedAt = performance.now();

        const result = getComplexCalculation(limit, variant);
        const durationMs = Number((performance.now() - startedAt).toFixed(2));

        return NextResponse.json(
            {
                route: '/api/calcul-complexe',
                requestedLimit: limit,
                durationMs,
                ...result,
            },
            { headers: NO_STORE_CACHE_HEADERS },
        );
    });
}
