DEMO LINK:-https://drive.google.com/file/d/1NYM678yor7DQ5xMeLFnsbnA3cLJe6g86/view?usp=sharing

# AVIRI - Authentic Virtual Identity Recruitment Interface

AVIRI transforms hiring by converting resumes into engaging AI-driven video pitches. Recruiters interact with candidate avatars via real-time chat, making talent discovery fast, visual, and interactive.

**🔗 GitHub Repository**: [itsvamz/LinkedIn-Hack](https://github.com/itsvamz/LinkedIn-Hack)

---

## 🔍 Problem

Recruiters spend too much time on manual resume review, repetitive calls, and outdated systems. AVIRI streamlines this with a smart, visual, and interactive hiring experience that feels as easy as scrolling reels.

---

## 🚀 What It Does

- Generates video avatars from resumes and photos  
- Provides a chat interface powered by Hugging Face for recruiter-agent interaction  
- Displays candidates in a swipe-style carousel UI  
- Supports bookmarking, liking, messaging, and dark mode  
- Enables inclusive hiring with accessibility and multilingual pitch support  

---

## 💡 Key Features

- **Resume Parsing**: Converts resume into structured profile info  
- **Pitch Video Generation**: Uses `SadTalker`, `EdgeTTS`, `FFmpeg` for video synthesis  
- **Avatar Chat**: Hugging Face models power real-time AI conversations  
- **Carousel UI**: Swipe left/right to shortlist or reject candidates  
- **Background Removal**: `rembg` and `face_recognition` for clean avatar videos  
- **Inclusive UI**: Accessibility mode, dark mode, multilingual agents  

---

## 🛠️ Tech Stack

| Component           | Tech Used                                |
|---------------------|-------------------------------------------|
| Frontend            | React.js                                  |
| Backend             | Node.js, Express.js (Nodemon)             |
| Database            | MongoDB                                   |
| Resume Parsing      | Python                                    |
| Chatbot Integration | Hugging Face Transformers (LLM models)    |
| Video Generation    | SadTalker, EdgeTTS, FFmpeg                |
| Image Processing    | rembg, face_recognition                   |

---

## 📁 Folder Structure
LinkedIn-Hack/

├── Avatar/ # Talking avatar

generation (SadTalker, etc.)

├── backend/ # Node.js backend

│ ├── app.js

│ └── routes/

│ └── controllers/

├── frontend/ # React-based 

frontend

├── models/

│ └── Elevator pitch/ # Parsed

resume text , pitch scripts 


---

## 🧪 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/itsvamz/LinkedIn-Hack.git
cd LinkedIn-Hack
```
### 2. Backend setup
```bash
cd backend
npm install
npx nodemon app.js
```
### 2. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
⚠️ Make sure to configure .env with MongoDB URI, Hugging Face access token, and other credentials.

📦 Key Dependencies

react, axios, tailwindcss

express, mongoose, nodemon

huggingface, transformers, python-shell

formidable, ffmpeg-static, sadtalker

edgetts, rembg, face_recognition

✅ Future Enhancements
Real-time live agent interviews

QR code to launch pitch on mobile

Dynamic pitch updates over time

Blockchain-based credential verification




deploy




