function createParticles() {
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

async function generatePost() {
  const platform = document.getElementById("platform").value;
  const tone = document.getElementById("tone").value;
  const purpose = document.getElementById("purpose").value;
  const prompt = document.getElementById("prompt").value;

  if (!prompt.trim()) {
    showNotification("Please enter a prompt first! 💭");
    return;
  }

  const loadingElement = document.getElementById("loading");
  const captionOutputElement = document.getElementById("captionOutput");

  loadingElement.style.display = "block";
  captionOutputElement.innerHTML = 'Your perfectly crafted caption will appear here...';
  showNotification("Generating content... this might take a moment! ⏳");

  try {
    const response = await fetch('http://127.0.0.1:5000/generate-caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platform, tone, purpose, prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.caption) {
      captionOutputElement.innerHTML = `<div style="line-height: 1.6; color: var(--text-primary);">${data.caption}</div>`;
      showNotification("✨ Caption generated successfully!");
    } else {
      captionOutputElement.innerHTML = `⚠️ No caption returned.`;
      showNotification("⚠️ Caption generation succeeded but no content was provided.");
    }

  } catch (error) {
    console.error("Error generating content:", error);
    showNotification(`❌ An error occurred during generation: ${error.message}`);
    captionOutputElement.innerHTML = `Error: Could not generate content.`;
  } finally {
    loadingElement.style.display = "none";
  }
}

function copyCaption() {
  const text = document.getElementById("captionOutput").innerText;
  navigator.clipboard.writeText(text).then(() => {
    showNotification("📋 Caption copied to clipboard!");
  }).catch(() => {
    showNotification("❌ Failed to copy caption");
  });
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('load', () => {
  createParticles();
  animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    generatePost();
  }
});
