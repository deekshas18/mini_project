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


# In[23]:


import wave
from pydub import AudioSegment
from pydub.exceptions import CouldntDecodeError
import pygame

def verify_wav_file(file_path):
    try:
        with wave.open(file_path, 'rb') as wf:
            return True
    except wave.Error as e:
        print(f"File verification failed: {e}")
        return False

def handleWavFile(input_file, output_file="processed_output.wav"):
    try:
        # Attempt to load the file with pydub
        try:
            audio = AudioSegment.from_file(input_file)
        except CouldntDecodeError:
            print(f"Could not decode {input_file}. It may not be a valid audio file.")
            return
        
        # Check if the loaded file is actually a WAV file
        if not verify_wav_file(input_file):
            print(f"{input_file} is not a valid WAV file, attempting conversion to WAV.")
            temp_output = "temp_converted.wav"
            try:
                audio.export(temp_output, format="wav")
                input_file = temp_output
            except Exception as e:
                print(f"Conversion failed: {e}")
                return

        # Verify if the converted file is a valid WAV file
        if not verify_wav_file(input_file):
            print(f"Input file {input_file} is not a valid WAV file.")
            return

        # Load the WAV file (now guaranteed to be a valid WAV file)
        audio = AudioSegment.from_file(input_file, format="wav")
        
        # Convert WAV to standard format (16-bit PCM, mono)
        audio = audio.set_sample_width(2)  # Set to 16-bit PCM
        audio = audio.set_channels(1)  # Set to mono
        
        # Export the processed WAV file
        audio.export(output_file, format="wav")
        
        print(f"Successfully processed {input_file} and exported to {output_file}.")
        return output_file  # Returning the output file name
    except Exception as e:
        print(f"Failed to process {input_file}: {e}")

def play_audio(file_path):
    try:
        # Initialize pygame mixer
        pygame.mixer.init()
        # Load the WAV file
        pygame.mixer.music.load(file_path)
        # Play the audio file
        pygame.mixer.music.play()
        # Wait until the audio file has finished playing
        while pygame.mixer.music.get_busy():
            pygame.time.Clock().tick(10)
    except Exception as e:
        print(f"Failed to play {file_path}: {e}")

# Example usage
output = handleWavFile("one.wav", "output.wav")
if output:
    print(f"The processed file is saved as: {output}")
    print("Playing the processed WAV file:")
    play_audio(output)


# In[ ]:




