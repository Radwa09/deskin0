import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np

app = Flask(__name__)
# Allow CORS for the frontend port (typically 5173 for Vite)
CORS(app, resources={r"/api/*": {"origins": "*"}})

SAVE_FOLDER = "skin_training_data"
os.makedirs(SAVE_FOLDER, exist_ok=True)

# Load the exact Haar Cascade used in face_detected.ipynb
try:
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
except Exception as e:
    print(f"Warning: Could not load cascade classifier: {e}")
    face_cascade = None

@app.route('/api/upload-face', methods=['POST'])
def upload_face():
    data = request.json
    if not data or 'image' not in data:
        return jsonify({"error": "No image data provided"}), 400
    
    image_data = data['image']
    # Removing header if present: "data:image/jpeg;base64,..."
    if ',' in image_data:
        image_data = image_data.split(',')[1]
        
    try:
        img_bytes = base64.b64decode(image_data)
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        filename = f"face_{timestamp}.jpg"
        filepath = os.path.join(SAVE_FOLDER, filename)
        
        with open(filepath, "wb") as f:
            f.write(img_bytes)
            
        print(f"Saved image to {filepath}")
        return jsonify({
            "success": True, 
            "filepath": filepath, 
            "message": "Image saved successfully for skin training data."
        })
    except Exception as e:
        print(f"Error saving image: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/detect-face', methods=['POST'])
def detect_face():
    if face_cascade is None:
        return jsonify({"error": "OpenCV cascade failed to load on server"}), 500
        
    data = request.json
    if not data or 'image' not in data:
        return jsonify({"error": "No image data"}), 400
        
    image_data = data['image']
    if ',' in image_data:
        image_data = image_data.split(',')[1]
        
    try:
        img_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({"error": "Invalid image format"}), 400
            
        # Optional: resize if the frontend sends a large image, but we expect a small one
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Exact logic from face_detected.ipynb
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        face_list = []
        for (x, y, w, h) in faces:
            face_list.append({
                "x": int(x), 
                "y": int(y), 
                "w": int(w), 
                "h": int(h)
            })
            
        return jsonify({
            "faces": face_list,
            "frame_width": frame.shape[1],
            "frame_height": frame.shape[0]
        })
        
    except Exception as e:
        print(f"Face detection error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print(f"Starting Flask server on port 5000...")
    print(f"Saving images to directory: {os.path.abspath(SAVE_FOLDER)}")
    app.run(port=5000, debug=True)
