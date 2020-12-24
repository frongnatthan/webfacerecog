from flask import Flask
from flask_restful import Api,Resource

app=Flask(__name__)
api=Api(app)


class Action(Resource):
	def get(self):
		return {"data":"Test"}
api.add_resource(Action,"/action")
if __name__ == "__main__":
	app.run(debug=True)