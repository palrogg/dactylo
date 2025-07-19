from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/get_category", methods=["POST"])
def get_category():
    """Categorize the user (level and areas of improvement)"""

    # No need for 204, as we use the user API (and its user keystroke database) for this
    data = request.get_json()

    # Random forest? Result should be a label combining level assessment and areas of improvement

    user_category = [{"speed": 600, "accuracy": 0.9}]

    return jsonify(user_category)


@app.route("/custom_text", methods=["POST"])
def get_custom_text():
    """Generate a custom text for the user"""

    # As a user, I want to be able to choose specific keys
    # I want to train
    data = request.get_json()

    custom_text = """que qui qu'ils
qu'à que qu'eux
quel quels quelle"""
    return jsonify(custom_text)
