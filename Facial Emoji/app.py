import cv2
import numpy as np
import json
from keras.models import model_from_json
from keras.preprocessing.image import img_to_array
from keras.applications.xception import preprocess_input

def prepare_image(image, target):
    # resize the input image and preprocess it
    image = cv2.resize(image, target)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)
    # return the processed image
    return image

def load_model():
    with open('model_new.json') as file:
        a=file.read()
    model=model_from_json(a)
    # model.load_weights('weights-prolonged/improvement-200-0.45.hdf5')
    model.load_weights('weights-overfit/latest.hdf5')
    return model

def show_webcam(emotion_map, mirror=False):
    cam = cv2.VideoCapture(0)
    model = load_model()
    counter = 1
    done = False
    while True:
        ret_val, img = cam.read()
        if mirror: 
            img = cv2.flip(img, 1)
        arr = np.array(img)
        if(counter%20==0):
            predictions = model.predict(prepare_image(img,(299, 299))) 
            predict_emotions = emotion_map[str(np.argmax(predictions))]
            print(predict_emotions)
            emotion_img = cv2.resize(cv2.imread('emojis/'+predict_emotions+'.png'), (100,100))
            done = True
        counter+=1
        im = cv2.imread('happy.jpg')
        if(done == True):
            arr[-100:, -100:] = emotion_img
        cv2.imshow('my webcam', arr)
        if cv2.waitKey(1) == 27: 
            break  # esc to quit
    cv2.destroyAllWindows()
    

def main(emotion_map):
    show_webcam(emotion_map, mirror=True)

if __name__ == '__main__':
    with open('ck/emotion.json') as file:
        emotion_map = json.load(file)
    main(emotion_map)