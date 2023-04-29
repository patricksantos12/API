import os
import cv2
import sys
import imutils
import numpy as np
import pytesseract
import socket
import pickle
import subprocess
import re

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480) 

min_area = 500

plateFilename = "plate"

count = 1
i = 1
a = 1
b = 1
c = 1

haarcascade = "/home/cisco/Desktop/API/RpiConnect/model/haarcascade_plate_number.xml"
plate_cascade = cv2.CascadeClassifier(haarcascade)

pytesseract.pytesseract.tesseract_cmd = r"/usr/bin/tesseract"

plate_filename = "plate"

while True:
    success, img = cap.read()
    
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    plates = plate_cascade.detectMultiScale(img_gray, 1.1, 4)

    for (x, y, w, h) in plates:
        area = w * h
        
        if area > min_area:
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(img, "Plate Number", (x, y - 5), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 255), 2)
            img_roi = img[y: y + h, x:x + w]

    cv2.imshow("Platonix", img)

    if cv2.waitKey(1) & 0xFF == ord('c'):
        while os.path.exists('plates/captured/' + plateFilename + str(count) + '.jpg'):
            count += 1
        else:    
            try:
                img_roi
            except NameError:
                pass
                while os.path.exists("plates/processed/Unrecognized/" + plateFilename + str(c) + ".jpg"):
                    c += 1
                    
                else:
                    cv2.imwrite('plates/captured/' + plateFilename + str(count) + '.jpg', img)
                    cv2.imwrite('plates/processed/Unrecognized/' + plateFilename + str(c) + '.jpg', img)
                    print("Plate is Unrecognized!")
                    print("Photo Saved to Folder: Unrecognized")
                    break
            else:
                cv2.imwrite('plates/captured/' + plateFilename + str(count) + '.jpg', img_roi)
                cv2.rectangle(img, (0,200), (640,300), (0,255,0), cv2.FILLED)
                image = cv2.imread('plates/captured/' + plateFilename + str(count) + '.jpg')
                image = imutils.resize(image, width = 300)

                gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

                gray_image = cv2.bilateralFilter(gray_image, 11, 17, 17)

                edged = cv2.Canny(gray_image, 30, 200)

                cnts,new = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

                image1=image.copy()

                try:
                    cv2.drawContours(image1,cnts,-1,(0,255,0),3)   
                except cv2.error as e:
                    pass
                    
                cnts = sorted(cnts, key = cv2.contourArea, reverse = True) [:30]
                screenCnt = 0

                image2 = image.copy()

                try:
                    cv2.drawContours(image2,cnts,-1,(0,255,0),3)
                except cv2.error as e:
                    pass
                    
                for c in cnts:
                    perimeter = cv2.arcLength(c, True)
                    approx = cv2.approxPolyDP(c, 0.018 * perimeter, True)
                    
                    if len(approx) == 4:
                        screenCnt = approx
                        x,y,w,h = cv2.boundingRect(c)
                        new_img = image[y:y + h, x:x + w]
                        
                        while os.path.exists("plates/captured/cropped_scanned/" + plateFilename + str(i) + ".jpg"):
                            i += 1
                        else:
                            cv2.imwrite("plates/captured/cropped_scanned/" + plateFilename + str(i) + ".jpg", new_img)
                            cv2.rectangle(img, (0,200), (640,300), (0,255,0), cv2.FILLED)
                            break
                        break
                try:
                    cv2.drawContours(image, [screenCnt], -1, (0, 255, 0), 3)
                except cv2.error as e:
                    pass
                    
                Cropped_loc = "/home/cisco/Desktop/API/RpiConnect/plates/captured/cropped_scanned/" + plateFilename + str(i) + ".jpg"
                cv2.imread(Cropped_loc)

                plate = pytesseract.image_to_string(Cropped_loc, lang='eng')
                mapping = dict.fromkeys(range(32))
                res1 = plate.translate(mapping)

                res = res1
                res = res.replace(" ","")   
                res = res.replace("(", "").replace(")", "").replace("/", "")

                if res == "":
                    
                    while os.path.exists("plates/processed/Unrecognized/" + plateFilename + str(c) + ".jpg"):
                        c += 1
                    else:
                        cv2.imwrite('plates/processed/Unrecognized/' + plateFilename + str(c) + '.jpg', image)
                        print("Plate is Unrecognized!")
                        print("Photo Saved to Folder: Unrecognized")

                elif res != "":
                    findPlate = "http://192.168.100.212:3000/api/v1/platonix/vehicle/search/plateno/"+str(res)
                    response = subprocess.check_output(["curl","-s", "-X","GET",findPlate])
                    
                    print("Plate Number: ",str(res))
                    
                    pattern =  ':"Registered",'

                    match = re.search(pattern, response.decode())
                       
                    print(response)
                    
                    if match:
                        while os.path.exists("plates/processed/Registered/" + plateFilename + str(a) + ".jpg"):
                            a += 1
                        else:
                            cv2.imwrite('plates/processed/Registered/' + plateFilename + str(a) + '.jpg', image)
                            print("Photo Saved to Folder: Registered")
                            del res

                    else:
                        while os.path.exists("plates/processed/Unregistered/" + plateFilename + str(b) + ".jpg"):
                            b += 1
                        else:
                            cv2.imwrite("plates/processed/Unregistered/" + plateFilename + str(b) + ".jpg", image)
                            
                            print("Photo Saved to Folder: Unregistered")
                            del res
            break
        break
cap.release()
cv2.destroyAllWindows()
