from flask import Flask, render_template, request, Response
import cv2
import numpy as np
import os
import face_recognition
import time
from playsound import playsound
from flask_cors import CORS
 

app = Flask(__name__, static_folder='static')
CORS(app)

class SimpleFacerec:
    def __init__(self):
        self.known_face_encodings = []
        self.known_face_names = []
        self.alarm_sound = r"C:\Users\HP\Desktop\NewThirdEye\Backend\distant_ambulance_siren.mp3" # Adjust the path to the alarm sound file
        self.cooldown_period = 10  # Cooldown period for alarm in seconds
        self.last_alarm_time = time.time()  # Initialize last alarm time

        # Resize frame for a faster speed
        self.frame_resizing = 0.25

        # Manual mapping of camera IP addresses to locations
        self.camera_locations = {
            '192.168.29.240': 'Knowledge Park 3',
            '192.168.29.173': 'Alpha 2'
            # Add more IP addresses and locations as needed
        }

    def load_encoding_images(self, images_dir):
        """
        Load encoding images from directory
        :param images_dir: Directory containing encoding images
        """
        images_path = [os.path.join(images_dir, f) for f in os.listdir(images_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]

        print("{} encoding images found.".format(len(images_path)))

        # Store image encoding and names
        for img_path in images_path:
            img = cv2.imread(img_path)
            rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

            # Get the filename only from the initial file path.
            basename = os.path.basename(img_path)
            (filename, ext) = os.path.splitext(basename)
            # Get encoding
            img_encoding = face_recognition.face_encodings(rgb_img)[0]

            # Store file name and file encoding
            self.known_face_encodings.append(img_encoding)
            self.known_face_names.append(filename)
        print("Encoding images loaded")

    def detect_known_faces(self, frame, camera_name, camera_ip_address):
        small_frame = cv2.resize(frame, (0, 0), fx=self.frame_resizing, fy=self.frame_resizing)
        # Find all the faces and face encodings in the current frame of video
        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
            name = "Unknown"

            for known_name in self.known_face_names:
                if face_recognition.compare_faces([face_encoding], self.known_face_encodings[self.known_face_names.index(known_name)])[0]:
                    name = known_name
                    # Check if detected person is "Anmol" and play alarm if true
                    if time.time() - self.last_alarm_time >= self.cooldown_period:
                        playsound(self.alarm_sound)
                        self.last_alarm_time = time.time()  # Update last alarm time
                        # Fetch location information based on the camera's IP address
                        location = self.camera_locations.get(camera_ip_address, "Unknown Location")
                        # Print current time, camera name, and location
                        current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                        print(f"Alarm triggered for {name} at {current_time} in camera {camera_name} at {location}")

                face_names.append(name)

        # Convert to numpy array to adjust coordinates with frame resizing quickly
        face_locations = np.array(face_locations)
        face_locations = face_locations / self.frame_resizing
        return face_locations.astype(int), face_names

@app.route('/')
def index():
    return render_template('temp.html')

def gen():
    recognizer = SimpleFacerec()
    recognizer.load_encoding_images("C:\Users\HP\Desktop\NewThirdEye\Backend\images")
    
    phone_ip_address1 = '192.168.29.240'
    port_number = '8080'

    # URL to access the phone's camera stream
    url1 = f'http://{phone_ip_address1}:{port_number}/video'

    phone_ip_address2 = '192.168.29.173'
    # URL to access the phone's camera stream
    url2 = f'http://{phone_ip_address2}:{port_number}/video'
    
    # Create VideoCapture objects for each camera
    cap1 = cv2.VideoCapture(url1)
    cap2 = cv2.VideoCapture(url2)

    while True:
        # Capture frame from the first camera
        ret1, frame1 = cap1.read()
        if not ret1:
            break

        # Capture frame from the second camera
        ret2, frame2 = cap2.read()
        if not ret2:
            break

        # Detect faces in frames from both cameras
        face_locations1, face_names1 = recognizer.detect_known_faces(frame1, "Camera 1", phone_ip_address1)
        face_locations2, face_names2 = recognizer.detect_known_faces(frame2, "Camera 2", phone_ip_address2)

        # Resize frames to fit within a certain width
        max_width = 800  # Maximum width for the frames
        frame1 = cv2.resize(frame1, None, fx=max_width / frame1.shape[1], fy=max_width / frame1.shape[1])
        frame2 = cv2.resize(frame2, None, fx=max_width / frame2.shape[1], fy=max_width / frame2.shape[1])

        # Concatenate frames horizontally
        grid = np.hstack((frame1, frame2))

        ret, buffer = cv2.imencode('.jpg', grid)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/update_criminal', methods=['POST'])
def update_criminal():
    # Get the criminal name and photo from the form data
    criminal_name = request.form.get('criminal-name')
    criminal_photo = request.files['criminal-photo']

    if criminal_photo:
        try:
            # Replace spaces in the criminal name with underscores
            criminal_name = criminal_name.replace(' ', '_')

            # Define the directory where the criminal photo will be saved
            images_dir = "C:\Users\HP\Desktop\NewThirdEye\Backend\images"

            # Check if the filename already exists, if yes, append a number
            criminal_photo_filename = f"{criminal_name.lower()}.jpg"
            counter = 1
            while os.path.exists(os.path.join(images_dir, criminal_photo_filename)):
                criminal_photo_filename = f"{criminal_name.lower()}-{counter}.jpg"
                counter += 1

            # Save the uploaded photo to the specified directory
            photo_path = os.path.join(images_dir, criminal_photo_filename)
            criminal_photo.save(photo_path)

            print("Criminal photo saved at:", photo_path)  # Debugging statement

            return "Criminal information updated successfully."
        except Exception as e:
            return f"Error saving criminal photo: {e}"
    else:
        return "Error: No photo uploaded for the criminal."
@app.route('/delete_criminal', methods=['POST'])
def delete_criminal():
    # Get the criminal name to delete from the request
    criminal_name = request.form.get('criminalName')

    if criminal_name:
        try:
            # Replace spaces in the criminal name with underscores
            criminal_name = criminal_name.replace(' ', '_')

            # Define the directory where the images are stored
            images_dir = "C:\Users\HP\Desktop\NewThirdEye\Backend\images"

            # Construct the path to the image file to delete
            image_path = os.path.join(images_dir, f"{criminal_name.lower()}.jpg")

            # Check if the image file exists, then delete it
            if os.path.exists(image_path):
                os.remove(image_path)
                print(f"Criminal photo '{criminal_name}' deleted successfully.")
                return "Criminal photo deleted successfully."
            else:
                return "Error: Criminal photo not found."
        except Exception as e:
            return f"Error deleting criminal photo: {e}"
    else:
        return "Error: No criminal name provided."

if __name__ == '__main__':
    app.run()
