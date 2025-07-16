import {
	EC2Client,
	StartInstancesCommand,
	StopInstancesCommand,
	TerminateInstancesCommand,
} from "@aws-sdk/client-ec2";

import { dismissAlert, showFailureAlert, showSuccessAlert } from "./alert";
import { fetchEC2, updateTable } from "./ec2";
import { getConfiguration } from "./modal";

document
	.querySelector("button#ec2-fetch")
	?.addEventListener("click", async () => {
		dismissAlert();

		try {
			updateTable(await fetchEC2());
		} catch (error) {
			showFailureAlert();
			console.log(error);
			return;
		}

		showSuccessAlert();
	});

document
	.querySelector(
		"dialog#terminate-confirmation button[command='close'][commandfor='terminate-confirmation']:last-of-type"
	)
	?.addEventListener("click", async () => {
		dismissAlert();

		try {
			const instances = await fetchEC2();
			if (instances.length === 0) {
				showSuccessAlert();
				return;
			}

			const client = new EC2Client(getConfiguration());
			await client.send(
				new TerminateInstancesCommand({
					InstanceIds: instances.map((instance) => instance.id),
				})
			);

			client.destroy();
			updateTable(await fetchEC2());
		} catch (error) {
			showFailureAlert();
			console.log(error);
			return;
		}

		showSuccessAlert();
	});

document
	.querySelector("button#ec2-start")
	?.addEventListener("click", async () => {
		dismissAlert();

		try {
			const instances = await fetchEC2();
			if (instances.length === 0) {
				showSuccessAlert();
				return;
			}

			const client = new EC2Client(getConfiguration());
			await client.send(
				new StartInstancesCommand({
					InstanceIds: instances
						.filter((instance) => instance.state === "stopped")
						.map((instance) => instance.id),
				})
			);

			client.destroy();
			updateTable(await fetchEC2());
		} catch (error) {
			showFailureAlert();
			console.log(error);
			return;
		}

		showSuccessAlert();
	});

document
	.querySelector("button#ec2-stop")
	?.addEventListener("click", async () => {
		dismissAlert();

		try {
			const instances = await fetchEC2();
			if (instances.length === 0) {
				showSuccessAlert();
				return;
			}

			const client = new EC2Client(getConfiguration());
			await client.send(
				new StopInstancesCommand({
					InstanceIds: instances
						.filter((instance) => instance.state === "running")
						.map((instance) => instance.id),
				})
			);

			client.destroy();
			updateTable(await fetchEC2());
		} catch (error) {
			showFailureAlert();
			console.log(error);
			return;
		}

		showSuccessAlert();
	});
