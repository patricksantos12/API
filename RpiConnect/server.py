import cv2, socket, numpy, pickle

s=socket.socket(socket.AF_INET , socket.SOCK_DGRAM)
ip="0.0.0.0"
port=8080

s.bind((ip,port))

while True:
    x=s.recvfrom(1000000)
    clientip = x[1][0]
    data=x[0]
    print(data)
    data=pickle.loads(data)
    print(type(data))
    data = cv2.imdecode(data, cv2.IMREAD_COLOR)
    cv2.imshow('Stream', data)
    if cv2.waitKey(1) & 0xFF == ord('c'):
        break
cv2.destroyAllWindows()
