import tensorflow as tf
import numpy as np

"""
Semi-Supervised Classification with Graph Convolutional Networks
Kipf, Thomas N. and Welling, Max
International Conference on Learning Representations (ICLR)
2017
"""

def glorot(shape, name=None):
    """Glorot & Bengio (AISTATS 2010) init."""
    init_range = np.sqrt(6.0/(shape[0]+shape[1]))
    initial = tf.random_uniform(shape, minval=-init_range, maxval=init_range, dtype=tf.float32)
    return tf.Variable(initial, name=name)


def zeros(shape, name=None):
    """All zeros."""
    initial = tf.zeros(shape, dtype=tf.float32)
    return tf.Variable(initial, name=name)