import string
import cgi
import time
from os import curdir, sep
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
import cv2
import re
import errno
import socket

capture = cv2.VideoCapture(0)
ret, img = capture.read()
cameraQuality = 75

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        global cameraQuality
        try:
            self.path = re.sub('[^.a-zA-Z0-9]', "", str(self.path))
            if self.path == "" or self.path == None or self.path[:1] == ".":
                return
            if self.path.endswith(".html"):
                f = open(curdir + sep + self.path, "rb")
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(f.read())
                f.close()
                return
            if self.path.endswith(".mjpeg"):
                self.send_response(200)
                self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=--aaboundary')
                self.end_headers()
                while True:
                    ret, img = capture.read()
                    cv2mat = cv2.imencode(".jpeg", img, (cv2.IMWRITE_JPEG_QUALITY, cameraQuality))
                    JpegData = cv2mat[1].tobytes()
                    try:
                        self.wfile.write("--aaboundary\r\n".encode())
                        self.wfile.write("Content-Type: image/jpeg\r\n".encode())
                        self.wfile.write(("Content-length: " + str(len(JpegData)) + "\r\n\r\n").encode())
                        self.wfile.write(JpegData)
                        self.wfile.write("\r\n\r\n\r\n".encode())
                    except (socket.error, BrokenPipeError):
                        # Ignore BrokenPipe errors
                        pass
                    time.sleep(0.05)
                return
            if self.path.endswith(".jpeg"):
                f = open(curdir + sep + self.path, "rb")
                self.send_response(200)
                self.send_header('Content-type', 'image/jpeg')
                self.end_headers()
                self.wfile.write(f.read())
                f.close()
                return
            return
        except IOError:
            self.send_error(404, 'File Not Found: %s' % self.path)

    def do_POST(self):
        global rootnode, cameraQuality
        try:
            ctype, pdict = cgi.parse_header(self.headers.get('content-type'))
            if ctype == 'multipart/form-data':
                pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
                query = cgi.parse_multipart(self.rfile, pdict)
            self.send_response(301)
            self.end_headers()
            upfilecontent = query.get('upfile')
            print("filecontent", upfilecontent[0])
            value = int(upfilecontent[0])
            cameraQuality = max(2, min(99, value))
            self.wfile.write("<HTML>POST OK. Camera Set to<BR><BR>".encode())
            self.wfile.write(str(cameraQuality).encode())

        except Exception as e:
            print("Exception occurred:", e)

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""

def main():
    try:
        server = ThreadedHTTPServer(('192.168.100.210', 8080), MyHandler)
        print('istarted httpserver...')
        server.serve_forever()
    except KeyboardInterrupt:
        print('^C received, shutting down server')
        server.socket.close()

if __name__ == '__main__':
    main()
