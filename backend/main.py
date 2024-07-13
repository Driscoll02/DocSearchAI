from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables from the .env file (if present)
load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel("gemini-1.5-flash")

response = model.generate_content("Hello, write me a two line rhyme about ReactJS.")

print(response.text)