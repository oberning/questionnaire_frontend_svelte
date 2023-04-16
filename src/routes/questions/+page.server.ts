import type { Actions, PageServerLoad } from './$types';

let value: number;

export const load = () => {
    return { questionnaire: value };
};

// The interface is not necessary but good for understanding
// the type for SvelteUI RadioGroup form data object
interface FormDataObject {
    name: string;
    value: string;
}

export const actions = {
    default: async ({request}) => {
        const data: FormData = await request.formData();
        let dataKey: Symbol = Object.getOwnPropertySymbols(data)[0]; // ⭐️ I could not find any Svelte docs about it!
        let form: FormDataObject = data[dataKey as keyof object][0]; // ⭐️ Typescript-valid code
        console.dir(form, { colors: true });
        value = Number(form.value);
        return { success: true };
    }
} satisfies Actions;
