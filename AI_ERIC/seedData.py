from flask import Flask
from flask import jsonify, request, make_response
import os
import numpy as np
from numpy.linalg import norm
from PIL import Image
from numpy.linalg import norm
from  rembg  import remove
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import  Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model

from PIL import Image
import pickle
import numpy as np
import pandas as pd

def get_extract_model():
    vgg16_model = VGG16(weights="imagenet")
    extract_model = Model(inputs=vgg16_model.inputs, outputs = vgg16_model.get_layer("fc1").output)
    extract_model.save('extract_model.h5')
    return extract_model

dataGenerator = ImageDataGenerator(
    rotation_range= 180,  # xoay ảnh trong khoảng từ -20 đến 20 độ
    width_shift_range= 0.3,  # dịch ảnh ngang trong khoảng 0.1
    height_shift_range= 0.3,  # dịch ảnh dọc trong khoảng 0.1
    shear_range=0.2,  # xoay ảnh theo hướng đường chéo trong khoảng 0.2
    zoom_range=0.2,  # phóng to / thu nhỏ ảnh trong khoảng 0.2
    horizontal_flip=True,  # lật ảnh theo chiều ngang
    fill_mode='nearest'  # phương thức điền giá trị vào các điểm ảnh trống
)

model = get_extract_model()
model = load_model('extract_model.h5')


cred = credentials.Certificate('./serviceAccount.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()


app = Flask(__name__)  

@app.route("/ai/api/test/seedData/trainFolder", methods=['POST'])
def seedData33ImgTest():
    db = firestore.client()
    try:
        doc_ids = []
        data_folder = "./testimg"
        for stt in range(1, 54):   
            name_image = str(stt) + '.jpg'
            image_path_full = os.path.join(data_folder, name_image)
            print("Xu ly : ", name_image)
            
        
            img = Image.open(image_path_full)
            img = img.resize((224, 224))
            png = remove(img)
            background = Image.new('RGBA', png.size, (255, 255, 255))
            img = (Image.alpha_composite(background, png)).convert("RGB")
            
            x = image.img_to_array(img)
            x = np.expand_dims(x, axis=0)
            x = preprocess_input(x)

            i = 0
            for batch in dataGenerator.flow(x, batch_size=1, shuffle=False):
                # Trích xuất đặc trưng của ảnh
                # features = model.predict(batch)[0].flatten()
                features = model.predict(batch)[0]
                
                # Chuan hoa vector = chia chia L2 norm (tu google search)
                features = features /  np.linalg.norm(features)
                features = features.flatten()
                
                doc_ref = db.collection("Image_Feature_Vector").document( "product_" +   str(stt) +"_"+ str(i))

                doc_ref.set({
                        "feature_vector": features.tolist()
                    })
                doc_ids.append(doc_ref.id)
                
                i += 1
                if i == 10:
                        break

        response = make_response("")
        response.status_code = 200
        return response
    except Exception as e:
        
        print(e)
        for doc_id in doc_ids:
            doc_ref = db.collection('Image_Feature_Vector').document(doc_id)
            doc_ref.delete()
        response = make_response("")
        response.status_code = 500
        return response
  


@app.route("/ai/api/test/seedData/deleteAll", methods=['POST'])
def seedDataSeedDeleteALlImgTest():
    db = firestore.client()
    try:
        collection_ref = db.collection('Image_Feature_Vector')
        documents = collection_ref.stream()
        for document in documents:
            document.reference.delete()


        response = make_response("")
        response.status_code = 200
        return response
    except Exception as e:
        
        print(e)
        response = make_response("")
        response.status_code = 500
        return response
   
if __name__ == '__main__':
    app.run( host= '0.0.0.0')