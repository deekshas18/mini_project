#!/usr/bin/env python
# coding: utf-8

# In[19]:


import sys
import os
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment
import json

if len(sys.argv) != 3:
    print("Usage: convertToText.py <input_file> <output_file>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]
print(f"Input file: {input_file}")
print(f"Output file: {output_file}")

FRAME_RATE = 16000
CHANNELS = 1

# Initialize Vosk model
print("Initializing Vosk model...")
model = Model(model_name="vosk-model-small-en-us-0.15")
rec = KaldiRecognizer(model, FRAME_RATE)
rec.SetWords(True)

# Load the audio file
print("Loading audio file...")
mp3 = AudioSegment.from_file(input_file, format="mp3")
mp3 = mp3.set_channels(CHANNELS)
mp3 = mp3.set_frame_rate(FRAME_RATE)

# Perform speech recognition
print("Performing speech recognition...")
recognized_text = ""

# Process the audio in chunks to avoid memory issues
chunk_size = 4000
for i in range(0, len(mp3.raw_data), chunk_size):
    chunk = mp3.raw_data[i:i + chunk_size]
    if rec.AcceptWaveform(chunk):
        result = json.loads(rec.Result())
        recognized_text += result.get("text", "") + " "

# Get final partial result
final_result = json.loads(rec.FinalResult())
recognized_text += final_result.get("text", "")

# Ensure the output directory exists
output_dir = os.path.dirname(output_file)
if not os.path.exists(output_dir):
    try:
        os.makedirs(output_dir)
        print(f"Created output directory: {output_dir}")
    except Exception as e:
        print(f"Failed to create output directory {output_dir}: {e}")
        sys.exit(1)


# Write the recognized text to a .txt file with UTF-8 encoding
print("Writing recognized text to file...")
try:
    with open(output_file, "w", encoding="utf-8") as txt_file:
        txt_file.write(recognized_text)
    print("Text written successfully.")
except Exception as e:
    print(f"Failed to write to file {output_file}: {e}")
    sys.exit(1)


# In[ ]:




