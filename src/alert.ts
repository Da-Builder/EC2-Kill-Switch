const displayNone: string = "d-none";
const alertSelector: string = "div[role='alert']";

export function dismissAlert(): void {
	const alerts: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(alertSelector);

	alerts.forEach((element) => {
		element?.classList.add(displayNone);
	});
}

export function showFailureAlert(): void {
	const alert: HTMLDivElement | null = document.querySelector(
		`${alertSelector}#alert-failure`
	);

	alert?.classList.remove(displayNone);
}

export function showSuccessAlert(): void {
	const alert: HTMLDivElement | null = document.querySelector(
		`${alertSelector}#alert-success`
	);

	alert?.classList.remove(displayNone);
}
