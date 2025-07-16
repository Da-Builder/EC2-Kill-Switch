import "./alert";
import "./button";
import "./ec2";
import { getConfiguration } from "./modal";

document.addEventListener("DOMContentLoaded", () => {
	const configuration = getConfiguration();
	if (
		configuration.region &&
		configuration.credentials.accessKeyId &&
		configuration.credentials.secretAccessKey
	) {
		const btn: HTMLButtonElement | null =
			document.querySelector("button#ec2-fetch");

		btn?.click();
		return;
	}

	const setupModal: HTMLDialogElement | null =
		document.querySelector("dialog#setup");

	setupModal?.showModal();
});
