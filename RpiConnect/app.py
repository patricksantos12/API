import cv2
import time

src = 'rtspsrc location=rtsp://192.168.100.210:3000/stream latency=200 ! application/x-rtp,encoding-name=H265 ! rtph265depay ! h265parse ! nvv4l2decoder ! nvvidconv ! video/x-raw,format=BGRx ! #videoconvert ! video/x-raw,format=BGR ! appsink drop=1'



while True:
	stream = cv2.VideoCapture(src, cv2.CAP_GSTREAMER)
	if not stream.isOpened():
		print('Source not Available')
		time.sleep(1)
	else:
		print('source connected')
		while True:
			ret, frame = stream.read()
			if not ret:
				print ('Failed to read from stream')
				stream.release()
				break
				
				
			else:
				cv2.imshow('Test', frame)
				cv2.waitkey(1)
