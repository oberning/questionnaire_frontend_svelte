<script lang="ts">
	import { onMount } from 'svelte';
	import { Container, Radio, RadioGroup, Space, Button } from '@svelteuidev/core';

	let questionnaires: App.Questionnaire[] = [];
	let selectedQuestionnaire: string = '';

	interface RadioItem {
		label: string;
		value: string;
	}

	let radioItems: RadioItem[] = [];

	onMount(async () => {
		fetch(`http://127.0.0.1:8080/questionnaires`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				questionnaires = data.questionnaires;
				radioItems = questionnaires.map((e) => ({ label: e.name, value: e.id.toString() }));
				console.log(radioItems);
			});
	});
	let value = 'svelte';
	$: buttonDisabled = selectedQuestionnaire === '' ? true : false;

</script>

<Space h="xl" />
<Space h="xl" />
<Space h="xl" />
<Container>
	<h1>Questionnaires</h1>
	<Space h="xl" />
	<form method="POST" action="/questions">
		<!-- <input type="text" name="test" value="Dies ist ein Test" />
		<input type="submit" value="Submit"> -->
		<RadioGroup
			bind:value={selectedQuestionnaire}
			items={radioItems}
			size="xl"
			direction="column"
			labelDirection="left"
		/>
		<Space h="xl" />
		<Button size="md" disabled={buttonDisabled}>Start Quiz</Button>
	</form>
	{JSON.stringify(radioItems)}
	{selectedQuestionnaire}
	<!-- {JSON.stringify(data)} -->
	
</Container>
