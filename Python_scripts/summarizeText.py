#!/usr/bin/env python
# coding: utf-8

# In[1]:


import sys
import subprocess
from transformers import pipeline
import os

def add_punctuation(text):
    """
    Add punctuation to the text using recasepunc model.
    """
    try:
        cased = subprocess.check_output(
            'python3 /media/anagha/Data/Mini_Project_Current/mini_project/Python_scripts/recasepunc/recasepunc.py predict /media/anagha/Data/Mini_Project_Current/mini_project/Python_scripts/recasepunc/checkpoint',
            shell=True, text=True, input=text
        )
        return cased
    except subprocess.CalledProcessError as e:
        print(f"Error in add_punctuation: {e.output}")
        sys.exit(1)

def summarize_text(text):
    """
    Summarize the text using a transformer summarization model.
    """
    # summarizer = pipeline("summarization", model="t5-small")
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


    split_tokens = text.split(" ")
    docs = [" ".join(split_tokens[i:i+850]) for i in range(0, len(split_tokens), 850)]

    summaries = summarizer(docs)
    summary = "\n\n".join([d["summary_text"] for d in summaries])
    
    return summary

def main():
    # Ensure we have the filename argument
    if len(sys.argv) != 2:
        print("Usage: python summarize_text.py <input_filename>")
        sys.exit(1)
    
    input_filename = sys.argv[1]

    # Load the text file from the directory
    with open(input_filename) as f:
        text = f.read()

    # Add punctuation to the text
    punctuated_text = add_punctuation(text)

    # Summarize the text
    summary = summarize_text(punctuated_text)

    # Ensure the summarized_file directory exists
    output_dir = "summarized_files"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Output the summary to a file in the summarized_file directory
    input_base = os.path.basename(input_filename)
    input_name, _ = os.path.splitext(input_base)
    output_filename = os.path.join(output_dir, f"{input_name}_summary.txt")

    with open(output_filename, "w") as f:
        f.write(summary)
    
    print(f"{output_filename}")

if __name__ == "__main__":
    main()


# In[3]:





# In[ ]:


# Test recording for 5 seconds


# In[ ]:




