import os
import sys
import json

# Add parent directory to path to allow importing app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.resume_analyzer import ResumeAnalyzer

def test_parser():
    # Read raw resume text
    resume_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/raw_resume.txt'))
    if not os.path.exists(resume_path):
        print(f"Error: raw_resume.txt not found at {resume_path}")
        return

    with open(resume_path, 'r', encoding='utf-8') as f:
        resume_text = f.read()

    analyzer = ResumeAnalyzer()
    extracted_data = analyzer._extract_resume_data(resume_text)
    
    print("--- Extracted Experience ---")
    print(json.dumps(extracted_data.get("experience", []), indent=2))
    
    print("\n--- Extracted Projects ---")
    print(json.dumps(extracted_data.get("projects", []), indent=2))

if __name__ == '__main__':
    test_parser()
