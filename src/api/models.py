from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    birth_date = db.Column(db.String(120), unique=False, nullable=False)
    address = db.Column(db.String(200), unique=False, nullable=False)
    Subjects = db.relationship("Subjects", backref="user", lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "birth_date": self.birth_date,
            "address": self.address,
            
        }
    

class Subjects(db.Model):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    Subject = db.Column(db.String(120), unique=False, nullable=False)
    Students = db.relationship("Students", backref="subjects", lazy=True)
    Class = db.relationship("Class", backref="subjects", lazy=True)


    def serialize(self):
        return {
            "id": self.id,
            "Subject":  self.Subject,
        
        }


class Students(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    subjects_id = db.Column(db.Integer, db.ForeignKey("subjects.id"))
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(200), unique=False, nullable=False)
    phone = db.Column(db.String(50), unique=False, nullable=False)
    goal = db.Column(db.String(200), unique=False, nullable=False)
    Comments = db.relationship("Comments", backref="students", lazy=True)
    Class = db.relationship("Class", backref="students", lazy=True)


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "address": self.address,
            "phone": self.phone,
            "goal": self.goal,
            
        }


class Comments(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comments_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    text_content = db.Column(db.String(200), unique=False, nullable=False)
    Class = db.relationship("Class", backref="comments", lazy=True)
        
        
    def serialize(self):
        return {
            "id": self.id,
            "text_content": self.text_content,
            
        }

class Class(db.Model):
    __tablename__ = 'class'

    id = db.Column(db.Integer, primary_key=True)
    subjects_id = db.Column(db.Integer, db.ForeignKey("subjects.id"))
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    comments_id = db.Column(db.Integer, db.ForeignKey("comments.id"))
    date = db.Column(db.String(120), unique=False, nullable=False)
    price = db.Column(db.Float, unique=False, nullable=False)
    paid = db.Column(db.Boolean, unique=False, nullable=False)

    

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "subjects_id": self.subjects_id,
            "student_id": self.student_id,
            "comments_id": self.comments_id,
            "date": self.date,
            "price": self.price,
            "paid": self.paid,
            
        }        
    
# class RefArchivos(db.Model):
#      __tablename__ = 'refArchivos'

#     id = db.Column(db.Integer, primary_key=True)

#     def serialize(self):
#         return {
#             "id": self.id,
            
#         }

    
   
    
        

   