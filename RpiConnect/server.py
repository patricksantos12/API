import socket
import struct

serv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serv.bind(('0.0.0.0', 8080))
serv.listen(5)

while True:
    conn, addr = serv.accept()
    print('Connection from:', addr)

    # Receive the size of the incoming frame
    size_data = conn.recv(4)
    size = struct.unpack('i', size_data)[0]

    # Receive the binary data of the frame
    frame_data = conn.recv(size)

    # Process the frame data here (e.g., decode it as an image)

    # Send a response
    response = 'Frame received'
    conn.send(response.encode())

    conn.close()
    print('Client disconnected')
