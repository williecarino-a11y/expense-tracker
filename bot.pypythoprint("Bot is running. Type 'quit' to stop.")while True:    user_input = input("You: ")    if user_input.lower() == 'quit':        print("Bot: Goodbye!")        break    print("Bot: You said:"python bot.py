print("Bot is running. Type 'quit' to stop.")
while True:
    user_input = input("You: ")
    if user_input.lower() == 'quit':
        print("Bot: Goodbye!")
        break
    print("Bot: You said:", user_input)python bot.py
