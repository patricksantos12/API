from tkinter import *
from PIL import Image, ImageTk
from tkinter import filedialog
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
import mysql.connector

root = Tk()

print("Upload an Image")

def open_image():
    global image_path

    image_path = filedialog.askopenfilename()

    img = Image.open(image_path)

    img_tk = ImageTk.PhotoImage(img)

    img_label = Label(root, image=img_tk)
    img_label.image = img_tk
    img_label.pack()
    plateFilename = "plate"

    i = 1
    a = 1
    b = 1
    c = 1

    pytesseract.pytesseract.tesseract_cmd = r"/usr/bin/tesseract"

    plate_filename = "plate"

    mydb = mysql.connector.connect(
      host="localhost",
      user="admin",
      password="password",
      database="RegistrationDatabase"
    )
    mycursor = mydb.cursor()

    while True:
        image = cv2.imread(image_path)

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        gray_image = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

        gray_image = cv2.medianBlur(gray, 3)
        
        gray_image = cv2.GaussianBlur(gray, (5, 5), 0)

        gray_image = cv2.bilateralFilter(gray_image, 11, 17, 17)
        
        plate = None
        plate = pytesseract.image_to_string(gray_image, lang='eng')
        mapping = dict.fromkeys(range(32))
        res1 = plate.translate(mapping)

        res = res1
        res = res.replace(" ","")
        res = res.replace("(", "").replace(")", "").replace("/", "").replace("[", "").replace("]", "").replace("|", "")
        
        if res == "":
            while os.path.exists("plates/imageProcessed/Unrecognized/" + plateFilename + str(c) + ".jpg"):
                c += 1
            else:
                cv2.imwrite('plates/imageProcessed/Unrecognized/' + plateFilename + str(c) + '.jpg', image)
                print("Plate is Unrecognized!")
                print("Photo Saved to Folder: Unrecognized")
                unrec = "INSERT INTO `UNRECOGNIZED` (Verification, Date) VALUES(NULL,CURDATE());"
                mycursor.execute(unrec)
                myresult3 = mycursor.fetchall()
                print("Saved to Database: UNRECOGNIZED")
                break
                
        elif res == "NBC1234":
                while os.path.exists("/home/cisco/Desktop/API/RpiConnect/plates/imageProcessed/Unrecognized/" + plateFilename + str(c) + ".jpg"):
                    c += 1
                else:
                    cv2.imwrite('/home/cisco/Desktop/API/RpiConnect/plates/imageProcessed/Unrecognized/' + plateFilename + str(c) + '.jpg', image)
                    print("Vehicle plate number unrecognized")
                    print("Photo Saved to Folder: Unrecognized")
                    unrec = "INSERT INTO `UNRECOGNIZED` (Verification, Date) VALUES(NULL,CURDATE());"
                    mycursor.execute(unrec)
                    myresult3 = mycursor.fetchall()
                    print("Saved to Database: UNRECOGNIZED")
                    del res
                            
        elif res != "":
            findPlate = "http://192.168.167.131:3000/api/v1/platonix/vehicle/search/plateno/"+str(res)
            response = subprocess.check_output(["curl","-s", "-X","GET",findPlate])
                        
            print("Plate Number: ",str(res))
            pattern =  ':"Registered",'
                    
            match = re.search(pattern, response.decode())
                        
            if match:
                print(response)
                while os.path.exists("plates/imageProcessed/Registered/" + plateFilename + str(a) + ".jpg"):
                    a += 1
                else:
                    cv2.imwrite('plates/imageProcessed/Registered/' + plateFilename + str(a) + '.jpg', image)
                    print("Photo Saved to Folder: Registered")
                    reg = "INSERT INTO `REGISTERED` (PlateN, Date) VALUES('"+str(res)+"',CURDATE());"
                    mycursor.execute(reg)
                    myresult3 = mycursor.fetchall()
                    print("Saved to Database: REGISTERED")
                    del res

            else:
                pattern =  ':"Unregistered",'
                match1 = re.search(pattern, response.decode())
                if match1:
                    print(response)
                    while os.path.exists("/home/cisco/Desktop/API/RpiConnect/plates/imageProcessed/Unregistered/" + plateFilename + str(b) + ".jpg"):
                        b += 1
                    else:
                        cv2.imwrite("/home/cisco/Desktop/API/RpiConnect/plates/imageProcessed/Unregistered/" + plateFilename + str(b) + ".jpg", image)
                        print("Photo Saved to Folder: Unregistered")
                        unreg = "INSERT INTO `UNREGISTERED` (PlateN, Date) VALUES('"+str(res)+"',CURDATE());"
                        mycursor.execute(unreg)
                        myresult3 = mycursor.fetchall()
                        print("Session Saved to Database: UNREGISTERED")
                        del res
                else:
                    cv2.imwrite('/home/cisco/Desktop/API/RpiConnect/plates/imageProcessed/Unrecognized/' + plateFilename + str(c) + '.jpg', image)
                    print("Vehicle plate number unrecognized")
                    print("Photo Saved to Folder: Unrecognized")
                    unrec = "INSERT INTO `UNRECOGNIZED` (Verification, Date) VALUES(NULL,CURDATE());"
                    mycursor.execute(unrec)
                    myresult3 = mycursor.fetchall()
                    print("Session Saved to Database: UNRECOGNIZED")
                    del res
        break
    mydb.commit()
    mycursor.close()
    mydb.close()

open_button = Button(root, text="Upload Image", command=open_image)
open_button.pack()

root.mainloop()
