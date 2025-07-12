
# 🚀 AI Post Generator 

**Create stunning social media content with cutting-edge AI technology.**

---

## 📸 Project Overview

This project is a modern, responsive **AI-powered Social Media Post and Caption Generator** built using:

- 🔥 **HTML, CSS, JavaScript** (Frontend)
- 🧠 **Hugging Face Transformers** with **Flask** (Backend)
- 🎨 Stylish UI with animated elements, floating particles, and glowing effects

Users can generate tailored captions based on:
- Target **Platform** (Instagram, X, LinkedIn, etc.)
- Desired **Tone** (Professional, Casual, Trendy, etc.)
- Marketing **Purpose** (Promotional, Storytelling, Engagement, etc.)
- Custom **Prompt** input

The generated captions include:
- ✍️ AI-generated short content
- 😄 Emojis based on sentiment analysis
- 🔖 Hashtags based on platform and prompt

---

## 📁 Project Structure

```bash
📦 Social Media Post and Capton Generator/
├── index.html          # Frontend UI (single page application)
├── app.py              # Flask backend with HuggingFace integration
│── style.css           # External CSS (if extracted)
│── script.js           # JavaScript logic (if extracted)         
├── README.md           # You're reading it!
└── requirements.txt    # Python dependencies
```

---

## 🛠 Technologies Used

### 💻 Frontend
- HTML5, CSS3, JavaScript ES6
- Google Fonts (Inter & Space Grotesk)
- CSS Animations & Glassmorphism UI
- Responsive design with grid layout

### 🧠 Backend
- Python 3.8+
- Flask & Flask-CORS
- HuggingFace `transformers`
  - `tiiuae/falcon-rw-1b` (caption generation)
  - Sentiment analysis pipeline
- Regex & Random libraries

---

## ⚙️ How It Works

### ✨ Caption Flow
1. User selects `platform`, `tone`, `purpose`, and enters a `prompt`.
2. Frontend sends a `POST` request to the backend endpoint `/generate-caption`.
3. Backend:
   - Formats the input into a prompt for the AI model.
   - Generates a short caption using Falcon-RW-1B.
   - Analyzes tone using sentiment analysis.
   - Adds 3 relevant emojis and 5+ hashtags.
4. Final result is returned and displayed on the frontend.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-post-generator.git
cd ai-post-generator
```

### 2. Setup Python Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scriptsctivate
```

### 3. Install Requirements

```bash
pip install -r requirements.txt
```

> Make sure you have a GPU (with CUDA) or configure CPU for `transformers` if needed.

### 4. Run Backend Server

```bash
python app.py
```

By default, this starts the Flask app at:  
📍 `http://127.0.0.1:5000`

### 5. Open `index.html`

Simply open `index.html` in your browser. No build step required.

> ⚠️ For full functionality, ensure the frontend is served locally or through an HTTP server with CORS enabled for Flask.

---

## 📦 Example `requirements.txt`

```
flask
flask-cors
transformers
torch
```

---

## ✨ Features

- 🔮 Floating particle animations
- 🌈 Glowing buttons and neon gradients
- 📋 Copy caption to clipboard
- 🧠 AI-generated emojis and hashtags
- ⚡ Fast local processing using HuggingFace models
- 📱 Fully responsive for mobile & desktop

---

## 🧪 Sample Prompt

**Platform**: Instagram  
**Tone**: Inspirational  
**Purpose**: Brand Awareness  
**Prompt**: "Celebrate your uniqueness and stay true to your mission"

**Generated Caption**:
> Celebrate your uniqueness and always stand tall in your truth. 🌟 💪 🚀 #celebrate #unique #mission #purpose #lifestyle #vibes

---

## 🧠 Notes

- Falcon-RW-1B is a lightweight LLM suitable for local inference.
- You can change the model or add more NLP logic easily in `app.py`.
- HuggingFace pipelines auto-download models on first run.

---

## 📌 To-Do / Future Enhancements

- [ ] Add image generation integration
- [ ] Deploy on Render/Heroku + GitHub Pages
- [ ] Add custom style/theme options
- [ ] Add login/authentication for saving generated posts

---

## 🙌 Credits

Built by [Kaustubh Mani](https://github.com/your-username)  

