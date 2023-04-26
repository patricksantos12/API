from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

# Initialize Flask app
app = Flask(__name__)

# Set up database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///platonix.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Define Platonix vehicle model
class PlatonixVehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plate_number = db.Column(db.String(20), unique=True, nullable=False)
    make = db.Column(db.String(20), nullable=False)
    model = db.Column(db.String(20), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    is_registered = db.Column(db.Boolean, default=False)

    def __init__(self, plate_number, make, model, year, is_registered):
        self.plate_number = plate_number
        self.make = make
        self.model = model
        self.year = year
        self.is_registered = is_registered

# Define schema for Platonix vehicle model
class PlatonixVehicleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PlatonixVehicle

# Initialize schema
vehicle_schema = PlatonixVehicleSchema()
vehicles_schema = PlatonixVehicleSchema(many=True)

# Define routes for API
@app.route('/api/v1/platonix/vehicle', methods=['POST'])
def add_vehicle():
    plate_number = request.json['plate_number']
    make = request.json['make']
    model = request.json['model']
    year = request.json['year']
    is_registered = request.json['is_registered']

    new_vehicle = PlatonixVehicle(plate_number, make, model, year, is_registered)

    db.session.add(new_vehicle)
    db.session.commit()

    return vehicle_schema.jsonify(new_vehicle)

@app.route('/api/v1/platonix/vehicle', methods=['GET'])
def get_all_vehicles():
    all_vehicles = PlatonixVehicle.query.all()
    result = vehicles_schema.dump(all_vehicles)
    return jsonify(result)

@app.route('/api/v1/platonix/vehicle/<int:id>', methods=['GET'])
def get_vehicle_by_id(id):
    vehicle = PlatonixVehicle.query.get(id)
    return vehicle_schema.jsonify(vehicle)

@app.route('/api/v1/platonix/vehicle/<int:id>', methods=['PUT'])
def update_vehicle(id):
    vehicle = PlatonixVehicle.query.get(id)

    plate_number = request.json['plate_number']
    make = request.json['make']
    model = request.json['model']
    year = request.json['year']
    is_registered = request.json['is_registered']

    vehicle.plate_number = plate_number
    vehicle.make = make
    vehicle.model = model
    vehicle.year = year
    vehicle.is_registered = is_registered

    db.session.commit()

    return vehicle_schema.jsonify(vehicle)

@app.route('/api/v1/platonix/vehicle/<int:id>', methods=['DELETE'])
def delete_vehicle(id):
    vehicle = PlatonixVehicle.query.get(id)

    db.session.delete(vehicle)
    db.session.commit()

    return vehicle_schema.jsonify(vehicle)

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
