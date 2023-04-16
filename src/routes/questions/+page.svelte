<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, readable, writable, type Readable } from 'svelte/store';
	import { Container, Button, Checkbox, Space, Grid } from '@svelteuidev/core';

	export let data;

	let question = 3;

	let receivedData: App.Question = {
		id: -1,
		text: 'Ups! This error should not happen!',
		max_score: 0,
		answers: []
	};

	let choices: Array<App.Choice> = [
		{
			questionId: -1,
			answers: [false]
		}
	];

	let str = 'Test';
	let checked: boolean[] = [];

	const loadQuestion = async () => {
		fetch(`http://127.0.0.1:8080/question/${question}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				choices = choices.filter((i) => i.questionId !== -1);
				let choiceIndex = choices.findIndex((i) => i.questionId === data.id);
				if (choiceIndex !== -1) {
					data.answers.forEach((element: App.Answer) => {
						checked[element.id] = false;
					});
					choices![choiceIndex].answers = [...checked];
				} else {
					choices.push({
						questionId: question,
						answers: [false]
					});
				}
				receivedData = data;
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	};

	onMount(loadQuestion);

	$: choices.find((i) => i.questionId === receivedData.id)!.answers = checked;
</script>

<Space h="xl" />
<Space h="xl" />
<Space h="xl" />
<Container override={{ backgroundColor: '$gray200' }}>
	<Space h="xl" />
	<h2>{receivedData?.text}</h2>
	{#each receivedData.answers as answer, index}
		<Checkbox
			bind:checked={checked[answer.id]}
			label={String.fromCharCode('a'.charCodeAt(0) + index) + ') ' + answer?.text}
			color="teal"
			size="xl"
		/>
		<Space h="xl" />
	{/each}
	<Space h="xl" />
	<Space h="xl" />
	<Grid justify="flex-end">
		<Grid.Col span={4}>
			<Button
				on:click={() => {
					--question;
					loadQuestion();
				}}
				>Previous
			</Button>
		</Grid.Col>
		<Grid.Col span={4}/>
		<Grid.Col span={4}>
			<Grid justify="flex-end">
				<Grid.Col span={3}>
					<Button
						on:click={() => {
							question++;
							loadQuestion();
						}}>Next</Button
					></Grid.Col
				></Grid
			></Grid.Col
		>
	</Grid>
	Angekreuzt: -{JSON.stringify(choices)} <br />
	{JSON.stringify(checked)}-
	{JSON.stringify(data)}
	<br/>
</Container>
