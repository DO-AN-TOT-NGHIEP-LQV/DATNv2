
from flask import Flask
from flask import jsonify, request, make_response
import os
import threading
import numpy as np
from flask import Flask
from flask import jsonify, request, make_response
import os
import threading
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
from numpy import dot
from PIL import Image
import pickle
import numpy as np

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

extract_model_path = 'extract_model.h5'
model = load_model(extract_model_path)

cred = credentials.Certificate('./serviceAccount.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)   

@app.route("/ai", methods=['GET'])    
def test():
    name = []
    name.append("sads")
    name.append("dsds")
    return jsonify(name)  


@app.route("/ai/api/product/searchByImg", methods=['POST'])
def extract_feature():
    try:
        img = request.files['fileSearchImg']
        img = Image.open(img)
        img = img.resize((224, 224))
        
        png = remove(img)
        background = Image.new('RGBA', png.size, (255, 255, 255))
        img = (Image.alpha_composite(background, png)).convert("RGB")
        
        
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        # search_vector = model.predict(x)[0].flatten()
        search_vector = model.predict(x)[0]
        search_vector = search_vector /  np.linalg.norm(search_vector)
        search_vector = search_vector.flatten()
        
        collection_ref = db.collection('Image_Feature_Vector')
        vectors = [] 
        results = [] 

        docs = collection_ref.stream()
        threshold = 0.5 
        for doc in docs:
            data = doc.to_dict()
            vector = np.array(data['feature_vector'])
            doc_id = doc.id
            # doc_id = doc_id.split('_')[0]
            
            doc_id = doc_id[:doc_id.rindex("_")]
            # distance = np.linalg.norm(vector - search_vector)
            cosine_similarity = dot(vector, search_vector) / (norm(vector) * norm(search_vector))
            
            if( cosine_similarity > threshold ):
                results.append((doc_id, cosine_similarity ))
            
            # results.append((doc_id, distance))
        
        nearest_image = sorted(results, key=lambda x: x[1], reverse=True)
        
        df = pd.DataFrame(nearest_image, columns=["id_product", "cosine_similarity"])
        df = df.drop_duplicates(subset=["id_product"])  # loai bo trung lap

        nearest_path = [(row["id_product"]) for _, row in df.iterrows()]
       
        return  jsonify(nearest_path)
    except Exception as e:
        print(e)
        response = jsonify(error=str(e))
        response.status_code = 500
        return response



@app.route("/ai/api/product/addNewImg", methods=['POST'])
def saveImageToFireStore():
    db = firestore.client()

    try:
        img = request.files['fileImage']
        post_id = request.form['product_id']
        img = Image.open(img)

        png = remove(img)
        background = Image.new('RGBA', png.size, (255, 255, 255))
        img = (Image.alpha_composite(background, png)).convert("RGB")
        img = img.resize((224, 224))
        
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        
        i = 0
        doc_ids = []
        for batch in dataGenerator.flow(x, batch_size=1, shuffle=False):
            
            # features = model.predict(batch)[0].flatten()
            features = model.predict(batch)[0]
            features = features /  np.linalg.norm(features)
            features = features.flatten()
            
            doc_ref = db.collection("Image_Feature_Vector").document(  "product_" + post_id +"_"+ str(i))
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
    

    
    
@app.route("/ai/api/test/seedData/trainFolder", methods=['POST'])
def seedData33ImgTest():
    db = firestore.client()
    try:
        data_folder = "./testimg"
        for name_image in os.listdir(data_folder):
            image_path_full = os.path.join(data_folder, name_image)
            print("Xu ly : ", name_image)
            
            img = image.load_img(image_path_full, target_size=(224, 224))
            x = image.img_to_array(img)
            x = np.expand_dims(x, axis=0)
            x = preprocess_input(x)

            i = 0
            doc_ids = []
            for batch in dataGenerator.flow(x, batch_size=1, shuffle=False):
                # Trích xuất đặc trưng của ảnh
                features = model.predict(batch)[0].flatten()
                doc_ref = db.collection("Image_Feature_Vector").document( name_image.split(".")[0] +"_"+ str(i))
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
            doc_ref = db.collection('my_collection').document(doc_id)
            doc_ref.delete()
        response = make_response("")
        response.status_code = 500
        return response
        

if __name__ == '__main__':
    app.run( host= '0.0.0.0', port=5000)
    
    
# @app.route("/ai/api/post/searchByImg", methods=['POST'])
# def extract_feature():
    
    # img = request.files['fileSearchImg']
    # img = Image.open(img)
    
    # png = remove(img)
    # background = Image.new('RGBA', png.size, (255, 255, 255))
    # img = (Image.alpha_composite(background, png)).convert("RGB")
    # img = img.resize((224, 224))
    
    # x = image.img_to_array(img)
    # x = np.expand_dims(x, axis=0)
    # x = preprocess_input(x)

    # search_vector = model.predict(x)[0].flatten()

    # # Tinh khoang cach tu search_vector den tat ca cac vector
    # distance = np.linalg.norm(vectors - search_vector, axis=1)

    # ids = np.argsort(distance)
    # nearest_image = [(paths[id], distance[id]) for id in ids]

    # K = 1
    # df = pd.DataFrame(nearest_image, columns=["path", "distance"])
    # # df = df.sort_values(by="distance")
    # df = df.drop_duplicates(subset=["path"])
    # nearest_image[:K] = [(row["path"], row["distance"]) for _, row in df.iterrows()]

    # nearest_path  = nearest_image;
    # nearest_path = [(row["path"]) for _, row in df.iterrows()]
    # print(nearest_path)
    # return  jsonify(nearest_path)
