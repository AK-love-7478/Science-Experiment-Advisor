async function askNVIDIA() {
  const userInput = document.getElementById("user-input").value;
  const responseText = document.getElementById("response");

  responseText.innerText = "Loading..."; // Show loading message

  try {
    const response = await fetch("/get-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();
    responseText.innerHTML = data.response || "No response received.";
  } catch (error) {
    responseText.innerText = "Error connecting to NVIDIA AI.";
    console.error("Error:", error);
  }
}
