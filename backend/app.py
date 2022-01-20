import json
import sys
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
import jwt
from functools import wraps


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SECRET_KEY'] = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/socialmedia'
# app.config["JSON_SORT_KEYS"] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)


# FOR DEBUGGING - eprint()
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class Liked_post(db.Model):

    __tablename__ = 'liked_post'
    user_id = db.Column(db.Integer(), primary_key=True)
    post_id = db.Column(db.Integer(), primary_key=True)

    def __init__(self, user_id, post_id):  # Initialise the objects
        self.user_id = user_id
        self.post_id = post_id

    def json(self):
        return {"user_id": self.user_id, "post_id": self.post_id}


class Post(db.Model):

    __tablename__ = 'post'
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
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


class Post_comment(db.Model):

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


class User(db.Model):

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

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            # print(token, app.config['SECRET_KEY'])
            data = jwt.decode(token, app.config['SECRET_KEY'])
            # print(data)
            return f(*args, **kwargs)
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return  f(*args, **kwargs)
  
    return decorated


# Get all post
@app.route("/post", methods=['GET'])
@token_required
def get_all_post():
    return jsonify({"posts": [p.json() for p in Post.query.all()]})

# Get all user's post
@app.route("/post/<string:name>")
@token_required
def get_user_post(name):
    user = User.query.filter_by(name=name).first().json()
    user_id = user['user_id']
    allpost = Post_comment.query.filter_by(user_id=user_id).all()
    likedpost = Liked_post.query.filter_by(user_id=user_id).all()
    all_post_id = []
    for p in allpost:
        all_post_id.append(p.post_id)
    for l in likedpost:
        if l.post_id not in all_post_id:
            all_post_id.append(l.post_id)
    all_user_post = []
    for pid in all_post_id:
        post = Post.query.filter_by(post_id=pid).first()
        all_user_post.append(post.json())
    if all_user_post:
        return jsonify(all_user_post), 200
    return jsonify({"message": "Post not found"}), 404

# Insert Post
@app.route("/insert_post", methods=['POST'])
@token_required
def insert_post():
    data = request.get_json()
    eprint(data)
    if (Post.query.filter_by(post_title=data['post_title']).first()):
        return jsonify({"message": "A post with the same title already exists."}), 400
    lastpost = Post.query.order_by(Post.post_id.desc()).first()
    print(lastpost.post_id)
    data['post_id'] = int(lastpost.post_id) + 1
    post = Post(**data)  # **data represents the rest of the data
    try:
        db.session.add(post)
        db.session.commit()
    except:
        return jsonify({"message": "An error occurred creating the post."}), 500
    return jsonify(post.json()), 201

# Update Post
@app.route("/update_post", methods=['POST'])
@token_required
def update_post():
    data = request.get_json()
    eprint(data)
    post_title = data['post_title']
    post = Post.query.filter_by(post_title=post_title).first()

    if post:
        post.post_title = data["post_title"]
        post.post_description = data["post_description"]
        post.post_image = data["post_image"]
    try:
        db.session.commit()
    except:
        return jsonify({"message": "An error occurred updating the post."}), 500
    return jsonify(post.json()), 201

# Delete Post
@app.route("/delete_post/<string:name>", methods=['POST'])
@token_required
def delete_post(name):
    data = request.get_json()
    post_title = data['post_title']
    actual = Post.query.filter_by(post_title=post_title).first()
    if actual:
        post = actual.json()
        post_id = post['post_id']
        
        comment_post = Post_comment.query.filter_by(post_id=post_id).all()
        liked_post = Liked_post.query.filter_by(post_id=post_id).all()

        for p in comment_post:
            print(p.json())
            if p:
                try:
                    db.session.delete(p)
                    db.session.commit()
                except:
                    return jsonify({"message": "An error occurred deleting the post."}), 500
        for l in liked_post:
            print(l.json())
            if l:
                try:
                    db.session.delete(l)
                    db.session.commit()
                except:
                    return jsonify({"message": "An error occurred deleting the post."}), 500
        if actual:
            try:
                db.session.delete(actual)
                db.session.commit()
            except:
                return jsonify({"message": "An error occurred deleting the post."}), 500

        return jsonify({"message": "The post is deleted"}), 201
    return jsonify({"message": "No post found"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
