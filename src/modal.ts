type EC2Configuration = {
	region: string;
	credentials: {
		accessKeyId: string;
		secretAccessKey: string;
	};
};

type ConfigurationHTML = {
	region: HTMLInputElement | null;
	accessKey: HTMLInputElement | null;
	secretKey: HTMLInputElement | null;
};

export function getConfiguration(): EC2Configuration {
	return {
		region: localStorage.getItem("region") || "",
		credentials: {
			accessKeyId: localStorage.getItem("accessKey") || "",
			secretAccessKey: localStorage.getItem("secretKey") || "",
		},
	};
}

function getConfigurationHTML(): ConfigurationHTML {
	return {
		region: document.querySelector("input#setup-region"),
		accessKey: document.querySelector("input#setup-key"),
		secretKey: document.querySelector("input#setup-secret"),
	};
}

document
	.querySelector("button[command='show-modal'][commandfor='setup']")
	?.addEventListener("click", () => {
		for (const [key, element] of Object.entries(getConfigurationHTML())) {
			if (!element) continue;
			element.value = localStorage.getItem(key) || "";
		}
	});

document
	.querySelector(
		"dialog#setup button[command='close'][commandfor='setup']:last-of-type"
	)
	?.addEventListener("click", () => {
		for (const [key, element] of Object.entries(getConfigurationHTML())) {
			localStorage.setItem(key, element?.value.trim() || "");
		}
	});
