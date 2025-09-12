from flask import Flask, request, jsonify, render_template_string

app = Flask(__name__)

@app.route("/")
def helloworld():
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>My First Flask Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>Welcome to my Flask web app.</p>
    </body>
    </html>
    """
    return render_template_string(html_content)

@app.route('/process', methods=['GET'])
def process():
    data = request.json
    return jsonify({"message": f"Hello {data['name']}! Data received successfully."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)