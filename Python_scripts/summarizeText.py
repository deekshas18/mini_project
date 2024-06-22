#!/usr/bin/env python
# coding: utf-8

# In[1]:


import sys
import subprocess
# from transformers import pipeline
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer
import os
from concurrent.futures import ThreadPoolExecutor

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

def download_model():
    """
    Download and save the model and tokenizer locally.
    """
    model_name = "facebook/bart-large-cnn"
    model_dir = "./local_model/bart-large-cnn"
    
    if not os.path.exists(model_dir):
        print("Downloading and saving model...")
        model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model.save_pretrained(model_dir)
        tokenizer.save_pretrained(model_dir)
        print(f"Model and tokenizer saved to {model_dir}")
    else:
        print(f"Model already exists at {model_dir}")


def summarize_chunk(chunk, summarizer):
    """
    Summarize a single chunk of text.
    """
    return summarizer(chunk)[0]["summary_text"]

def summarize_text(text):
    """
    Summarize the text using a transformer summarization model.
    """

    model_dir = "./local_model/bart-large-cnn"
    model = AutoModelForSeq2SeqLM.from_pretrained(model_dir)
    tokenizer = AutoTokenizer.from_pretrained(model_dir)


    # this was the model which was used earlier as it was not efficient switched to other model
    # summarizer = pipeline("summarization", model="t5-small")
    # summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)

    print("summarization model running")
    split_tokens = text.split(" ")
    docs = [" ".join(split_tokens[i:i + 850]) for i in range(0, len(split_tokens), 850)]

    with ThreadPoolExecutor() as executor:
        summaries = list(executor.map(lambda doc: summarize_chunk(doc, summarizer), docs))

    summary = "\n\n".join(summaries)
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

    download_model()    
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
    
    print(f"Summary written to {output_filename}")

if __name__ == "__main__":
    main()


# In[ ]:




