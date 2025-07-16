document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const input = document.getElementById("textInput").value;

    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "ИИ думает... ⏳";

    const reply = await getAiReply(input);
    resultDiv.innerText = reply;
});

async function getAiReply(text) {
    const OPENROUTER_API_KEY = "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";

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": "https://example.com",
                "X-Title": "AITextAnalyzer"
            },
            body: JSON.stringify({
                model: "openai/gpt-4.1-mini",
                messages: [
                    { role: "system", content: "Ты помощник по анализу текста." },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await res.json();
        return data.choices?.[0]?.message?.content || "ИИ не дал ответа";
    } catch (error) {
        return "Ошибка при обращении к ИИ 😢";
    }
}