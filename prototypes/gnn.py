import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers


(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
print(tf.convert_to_tensor(x_train))