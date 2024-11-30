const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears.",
  "Do you have a name, or can I call you mine?",
  "Is your name Google? Because you have everything I’ve been searching for.",
  "Are you a parking ticket? Because you’ve got FINE written all over you.",
  "Do you believe in love at first sight, or should I walk by again?",
    "I'd like to take you to the movies but they don't let you bring your own snacks in.",
    "No pen, no paper but you still draw my attention.",
    "All the good pick up lines are taken but you aren't.",
    "Excuse me while I delete my dating apps.",
    "This must be a museum because you're a work of art.",
    "Are you WiFi? Because I feel a connection.",
    "I'm not even playing cards but somehow I pulled a Queen.",
    "You must be a dog person because you look fetching.",
    "I didn't even have to run to catch these butterflies.",
    "I'm lost. Can you give me directions to your heart?",
    "Well, here I am. What are your other two wishes?",
    "Hey, how was heaven when you left it?"
  ];
  

function getRandomPickupLine() {
  const randomIndex = Math.floor(Math.random() * pickupLines.length);
  return pickupLines[randomIndex];
}

document.getElementById("pickup-line").textContent = getRandomPickupLine();
