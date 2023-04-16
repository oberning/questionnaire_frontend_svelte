// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Question {
			id: number;
			text: string;
			max_score: number;
			answers: Array<Answer>;
		}
	
		interface Answer {
			id: number;
			text: string;
			is_correct: boolean;
		}

		interface Choice {
			questionId: number;
			answers: boolean[];
		}

		interface Questionnaire {
			id: number;
			name: string;
		}
	}
}

export {};
