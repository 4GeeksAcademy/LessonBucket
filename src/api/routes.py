"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Subjects, Students, Comments
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# ENDPOINT OBTENER UN USUARIO

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

# ENDPOINT CREAR UN USUARIO


@api.route('/user', methods=['POST'])
def create_user():
    try:
        request_body = request.get_json(force=True)
        user = User(name=request_body["name"], email=request_body["email"], password=request_body["password"],
                    birth_date=request_body["birth_date"], address=request_body["address"])

        # if 'email' not in user:
        #     raise APIException(
        #         'You need to specify the email (signup info)', status_code=400)
        # if 'password' not in user:
        #     raise APIException(
        #         'You need to specify the password (signup info)', status_code=400)
        # if 'name' not in user:
        #     raise APIException(
        #         'You need to specify the name (signup info)', status_code=400)
        # if 'birth_date' not in user:
        #     raise APIException(
        #         'You need to specify the birth_date (signup info)', status_code=400)
        # if 'address' not in user:
        #     raise APIException(
        #     'You need to specify the address (signup info)', status_code=400)

        db.session.add(user)
        db.session.commit()

        response_body = {
            "msg": "usuario creado ",
            "user": user.serialize()
        }

        return jsonify(response_body), 200
    except:
        raise APIException('Usuario no encontrado', 404)


# ENDPOINT MODIFICAR UN USUARIO

@api.route('/user/<int:user_id>', methods=['PUT'])
def modify_user(user_id):
    try:
        body = request.get_json(force=True)

        user = User.query.get(user_id)

        user.name = body["name"]
        user.email = body["email"]
        user.password = body["password"]
        user.birth_date = body["birth_date"]
        user.address = body["address"]

        db.session.commit()

        return jsonify(user.serialize()), 200

    except:
        raise APIException('Usuario no encontrado', 404)

    # ENDPOINT OBTENER TODOS LOS USUARIO


@api.route('/users', methods=['GET'])
def get_all_users():
    try:
        users_query = User.query.all()
        results = list(map(lambda item: item.serialize(), users_query))
        print(users_query)
        print(results)

        response_body = {
            "msg": "Lista de usuarios obtenida",
            "results": results
        }

        return jsonify(response_body), 200
    except:
        raise APIException('Error al obtener lista de usuarios', 404)


# ENDPOINT PARA ELIMINAR USUARIO

@api.route('/user/<int:user_id>', methods=['DELETE'])
def del_user(user_id):
    try:

        user_query= User.query.filter_by(id=user_id).first()
        
        db.session.delete(user_query)
        db.session.commit()

        response_body = {
            "msg": "usuario eliminado correctamente",
        }

        return jsonify(response_body), 200

    except:
        raise APIException('Error no encontrado', 404)    


    