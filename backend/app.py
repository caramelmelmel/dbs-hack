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


# FOR DEBUGGING - eprint()
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class liked_post(db.Model):

    __tablename__ = 'liked_post'
    user_id = db.Column(db.Integer(), primary_key=True)
    post_id = db.Column(db.Integer(), primary_key=True)

    def __init__(self, user_id, post_id):  # Initialise the objects
        self.user_id = user_id
        self.post_id = post_id

    def json(self):
        return {"user_id": self.user_id, "post_id": self.post_id}


class post(db.Model):

    __tablename__ = 'post'
    post_id = db.Column(db.Integer(), primary_key=True)
    post_title = db.Column(db.String(50), nullable=False)
    post_description = db.Column(db.String(200), nullable=False)
    post_image = db.Column(db.String(300), nullable=False)

    def __init__(self, post_id, post_title, post_description, post_image):  # Initialise the objects
        self.post_id = post_id
        self.post_title = post_title
        self.post_description = post_description
        self.post_image = post_image

    def json(self):
        return {"post_id": self.post_id, "post_title": self.post_title, "post_description": self.post_description, "post_image": self.post_image}


class post_comment(db.Model):

    __tablename__ = 'post_comment'
    comment_id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), nullable=False)
    post_id = db.Column(db.Integer(), nullable=False)
    comment = db.Column(db.String(500), nullable=False)

    def __init__(self, comment_id, user_id, post_id, comment):  # Initialise the objects
        self.comment_id = comment_id
        self.user_id = user_id
        self.post_id = post_id
        self.comment = comment

    def json(self):
        return {"comment_id": self.comment_id, "user_id": self.user_id, "post_id": self.post_id, "comment": self.comment}


class user(db.Model):

    __tablename__ = 'user'
    user_id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer(), nullable=False)
    birthday = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)

    # Initialise the objects
    def __init__(self, user_id, name, age, birthday, email, phone, city, country):
        self.user_id = user_id
        self.name = name
        self.age = age
        self.birthday = birthday
        self.email = email
        self.phone = phone
        self.city = city
        self.country = country

    def json(self):
        return {"user_id": self.user_id, "name": self.name, "age": self.age, "birthday": self.birthday, "email": self.email, "phone": self.phone, "city": self.city, "country": self.country}


class delete_post(db.Model):
    __tablename__ = 'delete_post'
    post_id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), primary_key=True)

    def __init__(self, post_id, user_id):  # Initialise the objects
        self.user_id = user_id
        self.post_id = post_id

    def json(self, post_id):
        db.session.delete(post_id)
        db.session.commit()
        return ''

# FOR DEBUGGING - eprint()period


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
