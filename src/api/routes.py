"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Subjects, Students, Comments
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200


# ENDPOINT GET A USER

@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user_info(user_id):

    try:
        user_information = User.query.filter_by(id=user_id).first()

        response_body = {
            "msg": "usuario obtenido",
            "user": user_information.serialize()
        }

        return jsonify(response_body), 200

    except:
        raise APIException('Usuario no encontrado', 404)

# ENDPOINT CREATE A USER


@api.route("/signup", methods=["POST"])
def register():

    request_body = request.get_json(force=True)

    required_fields = ["name", "email", "password", "birth_date", "address"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)
        
    verify_email = User.query.filter_by(email=request_body["email"]).first()
    if verify_email:
        raise APIException("An account with this email already exists", 400)

    user = User(name=request_body["name"], email=request_body["email"], password=request_body["password"],
                birth_date=request_body["birth_date"], address=request_body["address"])

    db.session.add(user)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Successfully created user",
        "user": user.serialize()
    }

    return jsonify(response_body), 200


# ENDPOINT MODIFY A USER

@api.route('/user/<int:user_id>', methods=['PUT'])
def modify_user(user_id):

    body = request.get_json(force=True)
    user = User.query.get(user_id)

    if not user:
        raise APIException('User no found', 404)

    required_fields = ["name", "email", "password", "birth_date", "address"]
    for field in required_fields:
        if field not in body or not body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)

    user.name = body["name"]
    user.email = body["email"]
    user.password = body["password"]
    user.birth_date = body["birth_date"]
    user.address = body["address"]

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "User successfully modified",
        "user": user.serialize()
    }
    return jsonify(response_body), 200


# ENDPOINT GET ALL USERS


@api.route('/users', methods=['GET'])
def get_all_users():

    users_query = User.query.all()

    if not users_query:
        raise APIException('The list of users is empty', 404)

    results = list(map(lambda item: item.serialize(), users_query))

    try:
        response_body = {
            "msg": "List of users obtained",
            "results": results
        }

    except:
        raise APIException('Internal error', 500)

    return jsonify(response_body), 200


# ENDPOINT TO DELETE USER

@api.route('/user/<int:user_id>', methods=['DELETE'])
def del_user(user_id):

    user_query = User.query.filter_by(id=user_id).first()

    if not user_query:
        raise APIException('User not found', 404)

    try:
        db.session.delete(user_query)
        db.session.commit()

        response_body = {
            "msg": "user successfully deleted",
        }

    except:
        raise APIException('Internal error', 500)

    return jsonify(response_body), 200


# ENDPOINT FOR LOGIN

@api.route("/login", methods=["POST"])
def login():

    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify("Credenciales incorrectas"), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


# ENDPOINT GET ALL SUBJECTS 

@api.route('/user/<int:user_id>/subjects', methods=['GET'])
def get_all_subjects(user_id):

    subjects_query = Subjects.query.all()

    if not subjects_query:
        raise APIException('The list of users is empty', 404)

    results = list(map(lambda item: item.serialize(), subjects_query))

    try:
        response_body = {
            "msg": "List of subjects obtained",
            "results": results
        }

    except:
        raise APIException('Internal error', 500)

    return jsonify(response_body), 200


# ENDPOINT GET ONE SUBJECTS 

@api.route('/user/<int:user_id>/subjects/<int:subjects_id>', methods=['GET'])
def get_one_subject(user_id, subjects_id):

    try:
        subject_information = Subjects.query.filter_by(id=subjects_id).first()

        response_body = {
            "msg": "Subject obtained",
            "subject": subject_information.serialize()
        }

        return jsonify(response_body), 200

    except:
        raise APIException('Subjects not found', 404)


# ENDPOINT CREATE ONE SUBJECT


@api.route("/user/<int:user_id>/subjects", methods=["POST"])
def create_one_subject(user_id):

    request_body = request.get_json(force=True)

    required_fields = ["Subject"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)
        
    verify_subjects = Subjects.query.filter_by(Subject=request_body["Subject"]).first()
    if verify_subjects:
        raise APIException("This subject already exists", 400)

    subjects = Subjects(Subject=request_body["Subject"])

    db.session.add(subjects)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Subjects created",
        "subjects": subjects.serialize()
    }

    return jsonify(response_body), 200


# ENDPOINT TO DELETE SUBJECT

@api.route('/user/<int:user_id>/subjects/<int:subjects_id>', methods=['DELETE'])
def del_subjects(user_id, subjects_id):

    subjects_query = Subjects.query.filter_by(id=subjects_id).first()

    if not subjects_query :
        raise APIException('User not found', 404)

    try:
        db.session.delete(subjects_query)
        db.session.commit()

        response_body = {
            "msg": "subject successfully deleted",
        }

    except:
        raise APIException('Internal error', 500)

    return jsonify(response_body), 200


# ENDPOINT MODIFY A SUBJECT

@api.route('/user/<int:user_id>/subjects/<int:subjects_id>', methods=['PUT'])
def modify_subject(user_id, subjects_id):

    body = request.get_json(force=True)
    subjects = Subjects.query.get(subjects_id)

    if not subjects:
        raise APIException('Subjet not found', 404)

    required_fields = ["Subject"]
    for field in required_fields:
        if field not in body or not body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)

    subjects.Subject = body["Subject"]
    
    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Subject successfully modified",
        "subject": subjects.serialize()
    }
    return jsonify(response_body), 200


# ENDPOINT GET ALL STUDENTS 

@api.route('/user/<int:user_id>/students', methods=['GET'])
def get_all_students(user_id):

    students_query = Students.query.all()

    if not students_query:
        raise APIException('The list of students is empty', 404)

    results = list(map(lambda item: item.serialize(), students_query))

    try:
        response_body = {
            "msg": "List of students obtained",
            "results": results
        }

    except:
        raise APIException('Internal error', 500)

    return jsonify(response_body), 200


# ENDPOINT GET ONE STUDENT

@api.route('/user/<int:user_id>/students/<int:students_id>', methods=['GET'])
def get_one_student(user_id, students_id):

    try:
        students_information = Students.query.filter_by(id=students_id).first()

        response_body = {
            "msg": "Student obtained",
            "students": students_information.serialize()
        }

        return jsonify(response_body), 200

    except:
        raise APIException('Students not found', 404)


# ENDPOINT CREATE ONE STUDENT

@api.route("/user/<int:user_id>/students", methods=["POST"])
def create_one_student(user_id):

    request_body = request.get_json(force=True)

    required_fields = ["name", "email", "address", "phone", "goal"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)
        
    verify_email = User.query.filter_by(email=request_body["email"]).first()
    if verify_email:
        raise APIException("An account with this email already exists", 400)
    
    student = Students(name=request_body["name"], email=request_body["email"], address=request_body["address"],
                phone=request_body["phone"], goal=request_body["goal"])

    db.session.add(student)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Student created",
        "student": student.serialize()
    }

    return jsonify(response_body), 200


# ENDPOINT TO DELETE STUDENTS

@api.route('/user/<int:user_id>/students/<int:students_id>', methods=['DELETE'])
def del_student(user_id, students_id):

    students_query = Students.query.filter_by(id=students_id).first()

    if not students_query :
        raise APIException('Student not found', 404)

    try:
        db.session.delete(students_query)
        db.session.commit()

        response_body = {
            "msg": "student successfully deleted",
        }

    except:
        raise APIException('Internal error', 500)

    return jsonify(response_body), 200


# ENDPOINT MODIFY A STUDENT

@api.route('/user/<int:user_id>/students/<int:students_id>', methods=['PUT'])
def modify_student(user_id, students_id):

    body = request.get_json(force=True)
    student = Students.query.get(students_id)

    if not student:
        raise APIException('Student not found', 404)

    required_fields = ["name", "email", "address", "phone", "goal"]
    for field in required_fields:
        if field not in body or not body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)

    student.name = body["name"]
    student.email = body["email"]
    student.address = body["address"]
    student.phone = body["phone"]
    student.goal = body["goal"]

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Student successfully modified",
        "user": student.serialize()
    }
    return jsonify(response_body), 200



# ENDPOINT GET ALL COMMENTS 

@api.route('/user/<int:user_id>/students/<int:students_id>/comments', methods=['GET'])
def get_all_comments(user_id, students_id):

    comments_query = Comments.query.all()

    if not comments_query:
        raise APIException('The list of comments is empty', 404)

    results = list(map(lambda item: item.serialize(), comments_query))

    try:
        response_body = {
            "msg": "List of comments obtained",
            "results": results
        }

    except:
        raise APIException('Internal error', 500)

    return jsonify(response_body), 200


# ENDPOINT GET ONE COMMENT

@api.route('/user/<int:user_id>/students/<int:students_id>/comments/<int:comments_id>', methods=['GET'])
def get_one_comment(user_id, students_id, comments_id):

    try:
        comment_information = Comments.query.filter_by(id=comments_id).first()

        response_body = {
            "msg": "Comment obtained",
            "students": comment_information.serialize()
        }

        return jsonify(response_body), 200

    except:
        raise APIException('Comments not found', 404)



# ENDPOINT CREATE ONE COMMENT

@api.route("/user/<int:user_id>/students/<int:students_id>/comments", methods=["POST"])
def create_one_comment(user_id, students_id):

    request_body = request.get_json(force=True)

    required_fields = ["text_content"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)
        
    
    comment = Comments(text_content=request_body["text_content"])

    db.session.add(comment)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Comment created",
        "comment": comment.serialize()
    }

    return jsonify(response_body), 200

# ENDPOINT DELETE COMMENT

@api.route('/user/<int:user_id>/students/<int:students_id>/comments/<int:comments_id>', methods=['DELETE'])
def del_comment(user_id, students_id,comments_id):

    comment_query = Comments.query.filter_by(id=comments_id).first()

    if not comment_query :
        raise APIException('Student not found', 404)

    try:
        db.session.delete(comment_query)
        db.session.commit()

        response_body = {
            "msg": "comment successfully deleted",
        }

    except:
        raise APIException('Internal error', 500)

    return jsonify(response_body), 200


# ENDPOINT MODIFY A COMMENT

@api.route('/user/<int:user_id>/students/<int:students_id>/comments/<int:comments_id>', methods=['PUT'])
def modify_comment(user_id, students_id, comments_id):

    body = request.get_json(force=True)
    comment = Comments.query.get(comments_id)

    if not comment:
        raise APIException('Student not found', 404)

    required_fields = ["text_content"]
    for field in required_fields:
        if field not in body or not body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)

    comment.text_content = body["text_content"]
   
    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Comment successfully modified",
        "comment": comment.serialize()
    }
    return jsonify(response_body), 200


# ENDPOINT DE VALIDACIÓN


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():

    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user:
        return jsonify(success=False, message='User not found'), 404

    response_body = {
        "logged_in_as": current_user,
        "user": user.serialize()
    }

    return jsonify(success=True, response=response_body), 200