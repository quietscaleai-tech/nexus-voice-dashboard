# ⚡ NEXUS COMMAND // Enterprise Cognitive Architecture

![UI Version](https://img.shields.io/badge/UI_Version-v3.0_Voice_Native-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.1.6-646cff?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white)

A production-grade, ultra-low latency frontend interface designed to monitor and emulate live AI telecom routing. Built specifically as a high-end prototype to demonstrate AI voice capabilities (Yapay Zeka) for enterprise and medical clinic operations.

## 🚀 Core Architecture

Unlike standard text-based LLM wrappers, Nexus Command utilizes a **WebRTC bidirectional audio bridge**. This allows for sub-500ms conversational latency, live interruption handling, and dynamic endpointing.

* **Native Voice Bridge:** Powered by the `@vapi-ai/web` SDK for instantaneous audio streaming.
* **Live Telemetry:** Custom DOM-based audio waveform visualizers that react to audio packet streams.
* **Webhook Terminal:** A simulated, real-time matrix log tracking secure TLS 1.3 handshakes, TwiML parsing, and FastAPI responses.
* **Premium Aesthetic:** Villain/Old-Money dark mode aesthetic utilizing deep obsidian (`#050507`), zinc borders, and glassmorphism (`backdrop-blur-md`).

## 🛠️ Tech Stack

* **Core Framework:** React + Vite (Pure Client-Side SPA)
* **Styling Engine:** Tailwind CSS + Lucide React Icons
* **Voice Protocol:** Vapi SDK (WebSockets / WebRTC)
* **AI Brain (Configured via Vapi):** OpenAI `gpt-4o` + Deepgram `nova-2` Transcriber

## 🔐 Local Deployment & Setup

Because this repository strictly ignores sensitive environment variables, you must configure your local vault before launching the dashboard.

**1. Clone the repository and install dependencies:**
```bash
git clone [https://github.com/YOUR_USERNAME/nexus-voice-dashboard.git](https://github.com/YOUR_USERNAME/nexus-voice-dashboard.git)
cd nexus-voice-dashboard
npm install
