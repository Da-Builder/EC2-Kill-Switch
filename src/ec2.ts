import {
	DescribeInstancesCommand,
	EC2Client,
	InstanceStateName,
} from "@aws-sdk/client-ec2";

import { getConfiguration } from "./modal";

type EC2Info = {
	id: string;
	name: string;
	state: InstanceStateName | "";
};

export function updateTable(data: EC2Info[]): void {
	const table = document.querySelector("table > tbody");
	const display = document.querySelector("table + p");
	if (
		!(table instanceof HTMLTableSectionElement) ||
		!(display instanceof HTMLParagraphElement)
	) {
		return;
	}

	table.innerHTML = "";
	display.style.display = data.length === 0 ? "block" : "none";

	for (const instance of data) {
		table.innerHTML += `<tr><td>${instance.name}</td><td>${instance.id}</td><td class="text-capitalize">${instance.state}</td></tr>`;
	}
}

export async function fetchEC2(): Promise<EC2Info[]> {
	const client = new EC2Client(getConfiguration());
	const response = await client.send(new DescribeInstancesCommand());
	client.destroy();

	if (!response.Reservations) throw new Error();

	return response.Reservations.flatMap((reservation) => {
		if (!reservation.Instances) return { id: "Not Found", name: "", state: "" };

		return reservation.Instances.map((instance) => {
			return {
				id: instance.InstanceId || "Not Found",
				name: instance.Tags?.find((tag) => tag.Key === "Name")?.Value || "",
				state: instance.State?.Name || "",
			};
		});
	});
}
