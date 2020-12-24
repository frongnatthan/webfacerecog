import os
import os.path
from face_cropper import crop



ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'JPG'}

def train(picture):
	for class_dir in os.listdir(picture):
		a=os.path.join(picture,class_dir)
		if not class_dir:
			continue
		for img in os.listdir(a):
			path=os.path.join(a,img)
			
			print(img)
			print(path)
			try: 
				cropped_image = crop(image_path=path,
	    			saving_path=os.getcwd()
				)
			except Exception as e:
				pass
train("picture")


    
