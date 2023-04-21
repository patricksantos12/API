import os
import cv2
import imutils
import numpy as np
import pytesseract
import mysql.connector

harcascade = "model/haarcascade_plate_number.xml"

cap = cv2.VideoCapture(0)

cap.set(3, 640) # width
cap.set(4, 480) #height

min_area = 500

plateFilename = "plate"

count = 1
i = 1
a = 1
b = 1
c = 1

while True:
    success, img = cap.read()

    plate_cascade = cv2.CascadeClassifier(harcascade)
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    plates = plate_cascade.detectMultiScale(img_gray, 1.1, 4)

    for (x,y,w,h) in plates:
        area = w * h

        if area > min_area:
            cv2.rectangle(img, (x,y), (x+w, y+h), (0,255,0), 2)
            cv2.putText(img, "Plate Number", (x,y-5), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 255), 2)
            img_roi = img[y: y+h, x:x+w]
            
    cv2.imshow("Result", img)
    
    if cv2.waitKey(1) & 0xFF == ord('c'):
        while os.path.exists('plates/captured/' + plateFilename + str(count) + '.jpg'):
            count += 1
        else:    
            try:
                img_roi
            except NameError:
                
                while os.path.exists("plates/processed/Unrecognized/" + plateFilename + str(c) + ".jpg"):
                    c += 1
                    
                else:
                    print('Plate is Unrecognized!')
                    cv2.imwrite('plates/captured/' + plateFilename + str(count) + '.jpg', img)
                    cv2.imwrite('plates/processed/Unrecognized/' + plateFilename + str(c) + '.jpg', img)
                    break
            else:
                cv2.imwrite('plates/captured/' + plateFilename + str(count) + '.jpg', img_roi)
                cv2.rectangle(img, (0,200), (640,300), (0,255,0), cv2.FILLED)
            break
        break
    
    
image = cv2.imread('plates/captured/' + plateFilename + str(count) + '.jpg')
image = imutils.resize(image, width = 300)

gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)


gray_image = cv2.bilateralFilter(gray_image, 11, 17, 17)


edged = cv2.Canny(gray_image, 30, 200)


cnts,new = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

image1=image.copy()
cv2.drawContours(image1,cnts,-1,(0,255,0),3)   

cnts = sorted(cnts, key = cv2.contourArea, reverse = True) [:30]
screenCnt = 0

image2 = image.copy()
cv2.drawContours(image2,cnts,-1,(0,255,0),3)

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

cv2.drawContours(image, [screenCnt], -1, (0, 255, 0), 3)
    
Cropped_loc = "plates/captured/cropped_scanned/" + plateFilename + str(i) + ".jpg"


cv2.imread(Cropped_loc)
plate = pytesseract.image_to_string(Cropped_loc, lang='eng')

mapping = dict.fromkeys(range(32))
res = plate.translate(mapping)

db = mysql.connector.connect(host = "localhost", user = "admin", password = "password", database = "RegistrationDatabase")

cursor = db.cursor()


query2 = "SELECT * FROM `Dummy Database` WHERE `PlateN` = '"+ str(res) +"'"
 
cursor.execute(query2)

rows = cursor.fetchone()

print("Plate Number: ",str(res))

try:
    str(res)
    
except res == "":
    
    while os.path.exists("plates/processed/Unrecognized/" + plateFilename + str(c) + ".jpg"):
        c += 1
            
    else:
        cv2.imwrite('plates/processed/Unrecognized/' + plateFilename + str(c) + '.jpg', new_img)
        print("Plate is Unrecognized!")
else:
    if rows == None:
        while os.path.exists("plates/processed/Unregistered/" + plateFilename + str(b) + ".jpg"):
            b += 1
        else:
            cv2.imwrite("plates/processed/Unregistered/" + plateFilename + str(b) + ".jpg", new_img)
                
            print("Unregistered!")
                
            sql = "INSERT INTO `UNREGISTERED` (PlateN, Date) VALUES ('" + res + "', CURDATE());"
            cursor.execute(sql)
                
            sql2 = "SELECT PlateN, Date FROM UNREGISTERED WHERE PlateN = '" + res + "';"
            cursor.execute(sql2)
            result2 = cursor.fetchall()
    
            print("Plate saved in the Unregistered Database")
            print(result2)
            
    else:
        print("Registered!")

        print(rows)
    
        while os.path.exists("plates/processed/Registered/" + plateFilename + str(a) + ".jpg"):
            a += 1
        
        else:
            cv2.imwrite('plates/processed/Registered/' + plateFilename + str(a) + '.jpg', new_img)
    
            print("Plate saved in the Registered Database.")

            sql1 = "SELECT AgencyLoc FROM `Dummy Database` WHERE PlateN = '" + res + "'"

            cursor.execute(sql1)
        
            result1 = cursor.fetchone()

            name = str(result1)
        
            name = name.replace("')","")
    
            name = name.replace("('","")
    
            name = name.replace(",)","")
    
            name = name.replace("(,","")
    
            name = name.replace("'","")
    
    
            sql = "INSERT INTO `REGISTERED` (PlateN, AgencyLoc, Date) VALUES ('" + res + "', '" + name + "', CURDATE());"

            cursor.execute(sql)
        
db.commit()
db.close()
cap.release()
cv2.destroyAllWindows()
