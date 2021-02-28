import tensorflow as tf
from  GNN.Util import *


flags = tf.app.flags
FLAGS = flags.FLAGS
# Layer IDs
_LAYER_UIDS = {}


#Helper function, assigns unique layer IDs
def get_layer_uid(layer_name=''):
   
    if layer_name not in _LAYER_UIDS:
        _LAYER_UIDS[layer_name] = 1
        return 1
    else:
        _LAYER_UIDS[layer_name] += 1
        return _LAYER_UIDS[layer_name]


#Dropout for sparse tensors
def sparse_dropout(x, keep_prob, noise_shape):
    random_tensor = keep_prob
    random_tensor += tf.random_uniform(noise_shape)
    dropout_mask = tf.cast(tf.floor(random_tensor), dtype=tf.bool)
    pre_out = tf.sparse_retain(x, dropout_mask)
    return pre_out * (1./keep_prob)


#Wrapper for tf.matmul (sparse vs dense)
def dot(x, y, sparse=False):
    
    if sparse:
        res = tf.sparse_tensor_dense_matmul(x, y)
    else:
        res = tf.matmul(x, y)
    return res



class Layer(object):

    def __init__(self, **kwargs):

        name = kwargs.get('name')
        if not name:
            layer = self.__class__.__name__.lower()
            name = layer + '_' + str(get_layer_uid(layer))

        self.name = name
        self.vars = {}
        logging = kwargs.get('logging', False)
        self.logging = logging
        self.sparse_inputs = False


    def _call(self, inputs):

        return inputs


    def __call__(self, inputs):

        with tf.name_scope(self.name):
            if self.logging and not self.sparse_inputs:
                tf.summary.histogram(self.name + '/inputs', inputs)
            outputs = self._call(inputs)
            if self.logging:
                tf.summary.histogram(self.name + '/outputs', outputs)
            return outputs


    def _log_vars(self):
    	
        for var in self.vars:
            tf.summary.histogram(self.name + '/vars/' + var, self.vars[var])
