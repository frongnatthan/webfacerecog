import cv2
import os

import math
from sklearn import neighbors

import os.path
import pickle
from PIL import Image, ImageDraw
import face_recognition
from face_recognition.face_recognition_cli import image_files_in_folder
import numpy as np



def predict(X_frame, knn_clf=None, model_path=None, distance_threshold=0.325):
    """
    Recognizes faces in given image using a trained KNN classifier
    :param X_frame: frame to do the prediction on.
    :param knn_clf: (optional) a knn classifier object. if not specified, model_save_path must be specified.
    :param model_path: (optional) path to a pickled knn classifier. if not specified, model_save_path must be knn_clf.
    :param distance_threshold: (optional) distance threshold for face classification. the larger it is, the more chance
           of mis-classifying an unknown person as a known one.
    :return: a list of names and face locations for the recognized faces in the image: [(name, bounding box), ...].
        For faces of unrecognized persons, the name 'unknown' will be returned.
    """
    if knn_clf is None and model_path is None:
        raise Exception("Must supply knn classifier either thourgh knn_clf or model_path")

    # Load a trained KNN model (if one was passed in)
    if knn_clf is None:
        with open(model_path, 'rb') as f:
            knn_clf = pickle.load(f)

    X_face_locations = face_recognition.face_locations(X_frame)

    # If no faces are found in the image, return an empty result.
    if len(X_face_locations) == 0:
        return []

    # Find encodings for faces in the test image
    faces_encodings = face_recognition.face_encodings(X_frame, known_face_locations=X_face_locations)

    # Use the KNN model to find the best matches for the test face
    closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
    are_matches = [closest_distances[0][i][0] <= distance_threshold for i in range(len(X_face_locations))]
    #are_matches = str(True)
    '''percent_face_now = 0.0
    for i in range(len(X_face_locations)):
        if(closest_distances[0][i][0] <= distance_threshold):
            are_matches = str(True)
            checkFace = str(True)
            percent_face_now = 1 - closest_distances[0][i][0]
            face_percent.append(percent_face_now)
            print(percent_face_now)
        else:
            are_matches = str(False)
            checkFace = str(False)'''
   
   
    for i in range(len(X_face_locations)):
    	per=(1 - closest_distances[0][i][0])*100
    	print(per)
    # Predict classes and remove classifications that aren't within the threshold
    #print([(pred, loc) if rec else ("unknown", loc) for pred, loc, rec in zip(knn_clf.predict(faces_encodings), X_face_locations, are_matches)])
    return [(pred, loc) if rec else ("unknown", loc) for pred, loc, rec in zip(knn_clf.predict(faces_encodings), X_face_locations, are_matches)]


def load_images_from_folder(folder):
    images = []
    for filename in os.listdir(folder):
        img = cv2.imread(os.path.join(folder,filename))
        if img is not None:
            images.append(img)
    return images
folder="unknow"
#folder="frong"


unknow=0
not_detect=0
incorrect=0
c=0
for img in load_images_from_folder(folder):
    c+=1
    a=predict(img, model_path="trained_knn_model.clf")
    if not a:
    	not_detect+=1
    
    else:
    	if(a[0][0]=="unknown"):
    		unknow+=1
    	else:
    		incorrect+=1
	
    	

    
    
    cv2.imshow('image',img)
accuracy=unknow/c*100   
    #cv2.waitKey(0)
print("Unknown : "+str(unknow))
print("Can not detect : "+str(not_detect))
print("Incorrect : "+str(incorrect))
print("Accuracy : "+str(accuracy))
