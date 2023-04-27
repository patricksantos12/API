import io
import socket
import struct
import subprocess
import time
import cv2
import sys

class SplitFrames(object):
    def __init__(self, connection):
        self.connection = connection
        self.stream = io.BytesIO()
        self.count = 0

    def write(self, buf):
        if buf is None:
            return
        if not isinstance(buf, bytes):
            buf = bytes(buf)
        if buf.startswith(b'\xff\xd8'):
            # Start of new frame; send the old one's length
            # then the data
            size = self.stream.tell()
            if size > 0:
                self.connection.write(struct.pack('<L', size))
                self.connection.flush()
                self.stream.seek(0)
                self.connection.write(self.stream.read(size))
                self.count += 1
                self.stream.seek(0)
        self.stream.write(buf)

# Start the program you want to stream
proc = subprocess.Popen(['python', 'platonix.py'], stdout=subprocess.PIPE)

client_socket = socket.socket()
try:
    client_socket.connect(('0.0.0.0', 8080))
except ConnectionRefusedError:
    print('Unable to connect to server')
    sys.exit(1)
connection = client_socket.makefile('wb')

output = SplitFrames(connection)

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
cap.set(cv2.CAP_PROP_FPS, 30)

time.sleep(2)  # Wait for the camera to warm up
start = time.time()
while True:
    # Read a frame from the camera
    ret, frame = cap.read()
    if not ret:
        break

    # Display the captured frame
    cv2.imshow('frame', frame)

    # Capture the output of the program you want to stream
    out = proc.stdout.read()

    # Pass the output through the SplitFrames class to send the video frames over the network
    output.write(out)

    # Exit if the 'q' key is pressed
    if cv2.waitKey(1) == ord('c'):
        break

# Close all windows and release resources
cv2.destroyAllWindows()
cap.release()
connection.close()
client_socket.close()
