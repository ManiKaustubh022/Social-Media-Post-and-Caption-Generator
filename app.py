
from flask import Flask, request, jsonify
from transformers import pipeline
import random
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

caption_generator = pipeline("text-generation", model="tiiuae/falcon-rw-1b", device=0)
sentiment_pipeline = pipeline("sentiment-analysis", device=0)

emoji_dict = {
    "positive": ["😊", "🌟", "🔥", "💪", "🚀", "✨"],
    "negative": ["😢", "😞", "💔", "😠", "😓"],
    "neutral":  ["🙂", "😐", "🧐", "🤔", "😶"]
}

def extract_two_sentences(text):
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    return " ".join(sentences[:2])

def get_emojis(text):
    result = sentiment_pipeline(text)[0]
    label = result['label'].lower()
    score = result['score']
    if score < 0.75 and label in ["positive", "negative"]:
        label = "neutral"
    return ' '.join(random.sample(emoji_dict[label], 3))

def get_hashtags(prompt, platform):
    words = prompt.lower().split()
    tags = ["#" + word for word in words if len(word) > 3]
    platform_tags = {
        "instagram": ["#vibes", "#dailygram", "#mood", "#love", "#inspo", "#lifestyle"],
        "linkedin": [
            "#CareerGrowth", "#ProfessionalDevelopment", "#Leadership",
            "#Networking", "#JobSearch", "#PersonalBranding"
        ],
        "twitter": ["#NowPlaying", "#BreakingNews", "#Trending", "#ThisJustIn", "#Retweet", "#Thread"]
    }
    return " ".join(tags[:5] + random.sample(platform_tags.get(platform.lower(), []), 2))

@app.route('/generate-caption', methods=['POST'])
def generate_caption():
    data = request.get_json()
    prompt = data.get('prompt', '')
    platform = data.get('platform', 'instagram')
    tone = data.get('tone', 'neutral')
    purpose = data.get('purpose', 'informative')

    guided_prompt = f"Write a {tone}, {purpose} {platform} caption for: {prompt}"

    result = caption_generator(
        guided_prompt,
        max_new_tokens=100,
        do_sample=True,
        temperature=0.9,
        pad_token_id=caption_generator.tokenizer.eos_token_id
    )[0]['generated_text']

    caption = extract_two_sentences(result)
    emojis = get_emojis(caption)
    hashtags = get_hashtags(prompt, platform)
    combined = f"{caption} {emojis} {hashtags}"
    return jsonify({"caption": combined})

if __name__ == '__main__':
    app.run(debug=True)
