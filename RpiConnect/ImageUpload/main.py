from flask import Flask, request, render_template, redirect, url_for
import os

app = Flask(__name__)

app.config["IMAGE_UPLOADS"] = "/home/cisco/Desktop/API/RpiConnect/ImageUpload/static/Images"

from werkzeug.utils import secure_filename

@app.route('/home', methods=["GET", "POST"])
def upload_image():
    if request.method == "POST":
        image = request.files['file']

        if image.filename == '':
            print("Image must have a file name")
            return redirect(request.url)

        filename = secure_filename(image.filename)

        basedir = os.path.abspath(os.path.dirname(__file__))
        image.save(os.path.join(basedir, app.config["IMAGE_UPLOADS"], filename))

        return render_template("main.html", filename=filename)

    return render_template('main.html')


@app.route('/ImageUpload/<filename>')
def display_image(filename):
    return redirect(url_for(filename='Images/'+filename), code=301)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
