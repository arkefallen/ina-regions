import { LoaderFunctionArgs } from 'react-router';
import { RegionsData } from './types';

export interface RegionFilterLoaderData {
    data: RegionsData;
    selectedProvince: string | null;
    selectedRegency: string | null;
    selectedDistrict: string | null;
}

export async function regionLoader({ request }: LoaderFunctionArgs): Promise<RegionFilterLoaderData> {
    const url = new URL(request.url);
    const selectedProvince = url.searchParams.get('province');
    const selectedRegency = url.searchParams.get('regency');
    const selectedDistrict = url.searchParams.get('district');

    const response = await fetch('/data/indonesia_regions.json');
    if (!response.ok) {
        throw new Error('Failed to fetch regions data');
    }
    const data: RegionsData = await response.json();

    return {
        data,
        selectedProvince,
        selectedRegency,
        selectedDistrict,
    };
}
