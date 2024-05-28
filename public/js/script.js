function deleteCharacter(id) {
	fetch(`http://localhost:3008/${id}`, {
		method: "DELETE",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("Success:", data);
			window.location.href = "/";
		})
		.catch((error) => {
			console.error(
				"There was a problem with the fetch operation:",
				error
			);
		});
}
