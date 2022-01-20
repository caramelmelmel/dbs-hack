import json
import sys
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/socialmedia'
# app.config["JSON_SORT_KEYS"] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)


#FOR DEBUGGING - eprint()
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class liked_post(db.Model):
    """
        This class is used to store the registered users in the database.
        * Functions
            - __init__(self, username, password, name, age, email, institution, credit)
            - json(self)
    """
    __tablename__ = 'liked_post'
    user_id = db.Column(db.String(64), primary_key=True)
    post_id = db.Column(db.String(64), primary_key=True)

    def __init__(self, user_id, post_id): #Initialise the objects
        self.user_id = user_id
        self.post_id = post_id

    def json(self):
        return {"user_id": self.user_id, "post_id": self.post_id}


#FOR DEBUGGING - eprint()period
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)