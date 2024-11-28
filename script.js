document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-button');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // List of scenarios
  const scenarios = [
      "You're at a school dance, and someone you’ve had a crush on for years just made eye contact with you. They’re walking over, but before they say anything, your rival jumps in and starts a conversation with them. What’s your move?",
      "You're at a coffee shop, and the barista accidentally writes their phone number on your cup. How do you respond without making it awkward?",
      "You just matched with someone on a dating app, and their first message says, 'Impress me.' What do you say?",
      "You're stuck in an elevator with your crush, and there's an awkward silence. What do you do to break the ice?",
      "Your crush is hosting a karaoke night, and they've asked you to sing with them. What song do you pick, and how do you make it memorable?",
      "You're at a bookstore, and you notice someone cute picking up the same book as you. What’s your opening line?",
      "You’re at a friend’s party, and your crush is standing near the snack table. How do you start a conversation?",
      "You’re in a group project with your crush, and you have to brainstorm ideas. How do you subtly flirt without being unprofessional?",
      "You’re at the gym, and someone attractive asks if they can work in with you on the machine. How do you respond?",
      "You’re at a dog park, and your dog starts playing with someone else’s dog. How do you start a conversation with their owner?",
      "You’re on a plane, and the person sitting next to you strikes up a conversation about their favorite book. How do you keep it interesting?",
      "You’re at a music festival, and someone bumps into you while dancing. How do you turn it into a fun interaction?",
      "You’re in line at a food truck, and the person behind you starts joking about the long wait. How do you keep the banter going?",
      "You’re at a cooking class, and the instructor pairs you with someone you find attractive. How do you make a good impression?",
      "You’re at a coworking space, and someone sits across from you. They make a joke about your laptop stickers. How do you respond?",
      "You’re at a public speaking event, and someone in the audience compliments your speech. How do you turn it into a longer conversation?",
      "You’re at an art gallery, and someone comments on the same painting you’re looking at. What do you say?",
      "You’re at a concert, and someone asks if they can stand next to you for a better view. How do you start a conversation?",
      "You’re at a tech meetup, and someone starts asking you about your favorite programming languages. How do you add a flirty touch to the conversation?",
      "You’re volunteering at a charity event, and someone asks for help with setting up. How do you make a good impression?",
      "You’re at a park reading a book, and someone comments on your choice of reading material. How do you respond?",
      "You’re at a networking event, and someone introduces themselves in a quirky way. How do you keep the conversation engaging?",
      "You’re at a trivia night, and someone on your team suggests a hilarious wrong answer. How do you respond playfully?",
      "You’re at a café working on your laptop, and someone asks if they can share your table. How do you turn it into an interesting conversation?",
      "You’re at an open mic night, and someone performs a song you love. How do you strike up a conversation afterward?"
  ];

  // Function to randomly select a scenario
  function getRandomScenario() {
      const randomIndex = Math.floor(Math.random() * scenarios.length);
      return scenarios[randomIndex];
  }

  const initialMessage = `AI: ${getRandomScenario()}`;

  // Function to display AI's initial message
  function initializeConversation() {
      const aiMessageElement = document.createElement('p');
      aiMessageElement.classList.add('ai-message');
      aiMessageElement.textContent = initialMessage;
      chatMessages.appendChild(aiMessageElement);
      
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

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
      content: `
          You are RizzBot, Your goal is to respond in a way that is how the users crush would react, basically make it very challenging and try to get them to lose.
          the topic is ${initialMessage}. Once you believe that the user has won over your heart, or is so embarrased to the point where he wants to stop, stop and give the user a rating out of 10, based on how well he did.
        `,
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

  // Initialize the conversation
  initializeConversation();
});
