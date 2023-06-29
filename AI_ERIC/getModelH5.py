from flask import Flask

from flask import jsonify, request
import numpy as np
from numpy.linalg import norm
# import math
from flask import Flask
from flask import jsonify, request, make_response
import os
import numpy as np
import threading
import numpy as np
from numpy.linalg import norm
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.models import  Model




# file này dùng để tải model vgg6, láy lớp fc1 về với trọng số từ tập imagenet
def get_extract_model():
    vgg16_model = VGG16(weights="imagenet")
    extract_model = Model(inputs=vgg16_model.inputs, outputs = vgg16_model.get_layer("fc1").output)
    extract_model.save('extract_model.h5')
    return extract_model


get_extract_model()

# app = Flask(__name__)  
    
