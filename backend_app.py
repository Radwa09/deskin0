import os
import time
import shutil
import base64
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Allow CORS for the frontend
CORS(app, resources={r"/api/*": {"origins": "*"}})

SAVE_FOLDER = "captured_faces"
TRAIN_FOLDER = "skin_training_data"

os.makedirs(SAVE_FOLDER, exist_ok=True)
os.makedirs(TRAIN_FOLDER, exist_ok=True)

CENTER_TOLERANCE = 50
CAPTURE_DELAY = 2

# Load the Haar Cascade used in the user's script
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

def clear_folder(folder):
    for file in os.listdir(folder):
        path = os.path.join(folder, file)
        if os.path.isfile(path):
            os.remove(path)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "time": time.time()}), 200

@app.route('/api/upload-face', methods=['POST'])
def upload_face():
    data = request.json
    if not data or 'image' not in data:
        return jsonify({"error": "No image data provided"}), 400
    
    image_data = data['image']
    if ',' in image_data:
        image_data = image_data.split(',')[1]
        
    try:
        img_bytes = base64.b64decode(image_data)
        
        # 🧹 Clear old photos as per user logic
        clear_folder(SAVE_FOLDER)
        
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        filename = f"face_{timestamp}.jpg"
        
        save_path = os.path.join(SAVE_FOLDER, filename)
        train_path = os.path.join(TRAIN_FOLDER, filename)
        
        with open(save_path, "wb") as f:
            f.write(img_bytes)
        
        # 📁 Copy to training folder as per user logic
        shutil.copy(save_path, train_path)
            
        print(f"Saved image at: {save_path}")
        return jsonify({
            "success": True, 
            "filepath": save_path, 
            "message": "Image saved successfully for skin training data."
        })
    except Exception as e:
        print(f"Error saving image: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/detect-face', methods=['POST'])
def detect_face():
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
            
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
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
    print(f"Captured Faces directory: {os.path.abspath(SAVE_FOLDER)}")
    print(f"Training Data directory: {os.path.abspath(TRAIN_FOLDER)}")
    app.run(host='0.0.0.0', port=5000, debug=True)
