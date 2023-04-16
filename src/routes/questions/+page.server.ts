// _@ts-nocheck
import type { Actions, PageServerLoad } from './$types';

let value: number;

export const load = () => {
    return { questionnaire: value };
};

export const actions = {
    default: async ({request}) => {
        const data: FormData = await request.formData();
        let werte = [...data.entries()];
        value = Number(werte[0][1]);
        return { success: true };
    }
} satisfies Actions;
