#!/usr/bin/env python
# coding: utf-8

# In[19]:


import sys
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment
import json
import os
if len(sys.argv) != 3:
    print("Usage: process_audio.py <input_file> <output_file>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

FRAME_RATE = 16000
CHANNELS = 1

# Initialize Vosk model
model = Model(model_name="vosk-model-small-en-us-0.15")
rec = KaldiRecognizer(model, FRAME_RATE)
rec.SetWords(True)

# Load the audio file
mp3 = AudioSegment.from_file(input_file, format="mp3")
mp3 = mp3.set_channels(CHANNELS)
mp3 = mp3.set_frame_rate(FRAME_RATE)

# Save the processed audio file
mp3.export(output_file, format="mp3")

# Perform speech recognition
audio_data = mp3.raw_data

if rec.AcceptWaveform(audio_data):
    result = rec.Result()
else:
    result = rec.PartialResult()

# Extract the recognized text
text = json.loads(result)["text"]

# Print the recognized text
print(text)

# Write the recognized text to a .txt file
output_directory = "/media/anagha/Data/Mini_Project_Current/mini_project/backend/src/processedTextFiles"
os.makedirs(output_directory, exist_ok=True)
output_txt_file = os.path.join(output_directory, os.path.splitext(os.path.basename(output_file))[0] + ".txt")
with open(output_txt_file, "w") as txt_file:
    txt_file.write(text)


# In[ ]:




