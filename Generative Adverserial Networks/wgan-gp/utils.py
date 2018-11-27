import tensorflow as tf

def conv_block(input, nb_kernels,drop = 0.2, kernel_size=(5,5), 
               strides=(1,1),padding='same',use_bias=False):
    conv_layer = tf.keras.layers.conv2d(nb_kernels, kernel=kernel_size, strides=strides, padding=padding)(input)
    conv_layer = tf.keras.layers.dropout(dropout=drop)(x)
    return tf.nn.leaky_relu(conv_layer)

def conv_transpose_block(input, nb_kernels,drop = 0.2, kernels=(5,5), 
               strides=(1,1),padding='same',use_bias=False):
    convT_layer = tf.keras.layers.conv2dTranspose(nb_kernels, kernel_size=kernels, strides=strides, padding=padding)(input)
    convT_layer = tf.keras.layers.BatchNormalisation()(x)
    return tf.nn.leaky_relu(conv_layer)

def fc_layer(input, units):
    return tf.keras.layers.dense(units, use_bias = False)(x)

    