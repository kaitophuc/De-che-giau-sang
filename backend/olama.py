import ollama
from pymongo import MongoClient

def main():
    model = 'llama3.2'

    messages = []

    while True:
        user_input = input('Type your message:')

        if user_input == 'exit':
            break

        messages.append({
            'role': 'user',
            'content': user_input
        })
        
        response = ollama.chat(model, messages)
        print(response['message']['content'])


if __name__ == '__main__':
    main()