import socket
import cv2
import pickle
import struct

# create socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
host_ip = '127.0.1.1'
port = 9999
client_socket.connect((host_ip, port))

res = '640x480' # change to the desired resolution
width, height = map(int, res.split('x'))
print(f"Setting resolution to {res}")

# load face detection classifier
face_cascade = cv2.CascadeClassifier('/home/cisco/Desktop/API/RpiConnect/model/haarcascade_plate_number.xml')

# prepare data stream
data = b""
payload_size = struct.calcsize("Q")
while True:
    while len(data) < payload_size:
        packet = client_socket.recv(1*1024) 
        if not packet: 
            break
        data += packet
    packed_msg_size = data[:payload_size]
    data = data[payload_size:]
    msg_size = struct.unpack("Q", packed_msg_size)[0]

    while len(data) < msg_size:
        data += client_socket.recv(1*1024)
    frame_data = data[:msg_size]
    data = data[msg_size:]

    frame = pickle.loads(frame_data)
    frame = cv2.resize(frame, (width, height))
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,0),2)
    
    cv2.imshow("RECEIVING VIDEO", frame)
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
        
client_socket.close()
cv2.destroyAllWindows()
