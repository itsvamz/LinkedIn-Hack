
# Quickstart Setup

Follow these steps to clone SadTalker, install dependencies and checkpoints, and run your custom script.

---

## 1. Clone SadTalker

```bash
git clone https://github.com/OpenTalker/SadTalker.git
cd SadTalker
```

---

## 2. Install Python Dependencies

Ensure you have **Python 3.10+** and **ffmpeg** installed. Then in the SadTalker folder:

```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

---

## 3. Download & Install Dependenices

Download dependencies from requirements.txt
Download the archive from Google Drive:

> https://drive.google.com/file/d/1gwWh45pF7aelNP_P78uDJL8Sycep-K7j/view

Unzip its contents into a **`checkpoints/`** folder at the root of the SadTalker repo:

```
SadTalker/
├─ checkpoints/
│  ├─ facevid2vid_00189-model.pth.tar
│  ├─ audio2exp_00300-model.pth
│  ├─ audio2pose_00140-model.pth
│  ├─ SadTalker_V0.0.2_256.safetensors
│  └─ …other files…
└─ inference.py
```

---

## 4. Download MappingNet Weights

From a **Windows** shell with `curl.exe`:

```powershell
curl.exe -L -o checkpoints/mapping_00109-model.pth.tar `
  https://github.com/OpenTalker/SadTalker/releases/download/v0.0.2-rc/mapping_00109-model.pth.tar

curl.exe -L -o checkpoints/mapping_00229-model.pth.tar `
  https://github.com/OpenTalker/SadTalker/releases/download/v0.0.2-rc/mapping_00229-model.pth.tar
```

On **macOS/Linux**, drop the `.exe` and backticks:

```bash
curl -L -o checkpoints/mapping_00109-model.pth.tar \
  https://github.com/OpenTalker/SadTalker/releases/download/v0.0.2-rc/mapping_00109-model.pth.tar

curl -L -o checkpoints/mapping_00229-model.pth.tar \
  https://github.com/OpenTalker/SadTalker/releases/download/v0.0.2-rc/mapping_00229-model.pth.tar
```

---

## 5. Run Your Custom Script

Replace `MYCODE.py` with the name of your script:

```bash
python MYCODE.py "Welcome to my LinkedIn pitch!" examples\source_image\test_image_000.png --gender female --nat india --subs
```

---

## 6. Optional Flags (Speed Tuning)

- **No enhancer (fastest)**: omit `--enhancer` (defaults to None)  
- **Lower-res model**: add `--size 256`  
- **Still mode**: add `--preprocess full --still`  
- **Batch size**: add `--batch_size 1`

Enjoy your fast, lip‑synced avatar videos!
used edge tts by micrsoft for voice generation, ffmpeg, face_recognition and rembg for image cleanup and sadtalker for video generation.

