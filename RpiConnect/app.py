import cv2


video = cv2.VideoCapture("rtsp://cisco:cisco@192.168.100.210:554/Streaming/Channels/101")

cap.set(3, 640) # width
cap.set(4, 480) #height

min_area = 500

while True:
    success, img = video.read()


    for (x,y,w,h) in plates:
        area = w * h

        if area > min_area:
            cv2.rectangle(img, (x,y), (x+w, y+h), (0,255,0), 2)
            cv2.putText(img, "Plate Number", (x,y-5), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 255), 2)
            img_roi = img[y: y+h, x:x+w]
            
    cv2.imshow("Result", img)
    
    if cv2.waitKey(1) == ord('q'):
        break
        
video.release()
cv2.destroyAllWindows()
