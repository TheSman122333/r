document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-button');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  sendButton.addEventListener('click', () => {
      sendMessage();
  });

  chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });

  async function sendMessage() {
      const userMessage = chatInput.value.trim();

      if (userMessage === "") return; // Don't send empty messages

      // Display the user's message
      const userMessageElement = document.createElement('p');
      userMessageElement.classList.add('user-message');
      userMessageElement.textContent = `You: ${userMessage}`;
      chatMessages.appendChild(userMessageElement);

      // Clear the input field
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Get AI response
      const aiMessage = await getAIResponse(userMessage);

      // Display the AI's response
      const aiMessageElement = document.createElement('p');
      aiMessageElement.classList.add('ai-message');
      aiMessageElement.textContent = `AI: ${aiMessage}`;
      chatMessages.appendChild(aiMessageElement);

      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function getAIResponse(userMessage) {
    const systemMessage = {
      role: "system",
      content:
        "Hello RizzBot, you are a simple ai, all you do is rate peoples rizz, aka ability to appear attractive to people through text, act as if you are the opposite gender person, and react like one too. Dont actually rate it, just continue the conversation and act out your rating",
    };

    const messages = [
      systemMessage,
      { role: "user", content: userMessage },
    ];

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            messages: messages,
            model: "llama-3.1-70b-versatile",
            stream: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      return jsonResponse.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        return "Sorry, something went wrong!";
    }
  }
});