from scipy import ndimage
import math
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import io
from skimage import feature, data
from time import time


# Make matplotlib figures appear inline in the
# notebook rather than in a new window
# %matplotlib inline
plt.rcParams['figure.figsize'] = (10.0, 8.0) # set default size of plots
plt.rcParams['image.interpolation'] = 'nearest'
plt.rcParams['image.cmap'] = 'gray'

# function to show images
def display(img, title=None):
    plt.figure(figsize = (5,5))
    plt.imshow(img, cmap='gray', vmin=0, vmax=255)
    plt.title(title)
    plt.axis('off')
    plt.show()

def ncf(image, kernel): # edge_behavior="zero"

    image = np.asarray(image)
    kernel = np.asarray(kernel)

    # if image is rgb convert to grayscale
    if len(image.shape) == 3:
        R, G, B = image[:,:,0], image[:,:,1], image[:,:,2]
        gray_img = 0.299*R + 0.587*G + 0.114*B
        image = gray_img.copy()

    # add zeros around image to fix bounding problems (edge behavior)
    border0 = kernel.shape[0]//2
    border1 = kernel.shape[1]//2
    padded_image0 = image.shape[0] + 2*border0
    padded_image1 = image.shape[1] + 2*border1
    new_image = np.zeros((padded_image0, padded_image1))

    # put image in the middle of new_image with border around it
    new_image[border0:new_image.shape[0]-border0, border1:new_image.shape[1]-border1] = image
    new_image = new_image.astype(int)

    out_image = image.copy()
    out_imgae = out_image.astype(int)

    for image_row in range(new_image.shape[0]-kernel.shape[0]):
        for image_column in range(new_image.shape[1]-kernel.shape[1]):

            # slice image
            image_slice = new_image[image_row:image_row+kernel.shape[0], image_column:image_column+kernel.shape[1]]

            # multiply slice by kernel
            # vectorized using numpy, much faster than for loops!
            sliceXkernel = image_slice * kernel

            # take the sum
            output_value = np.sum(sliceXkernel)

            # set the new value
            out_image[image_row, image_column] = output_value

    return(out_image)

def create_gaussian(kernel_shape, sigma):

    gaussian_kernel = np.empty(kernel_shape)

    for x in range(kernel_shape[0]):
        for y in range(kernel_shape[1]):

            xOffset = math.floor(kernel_shape[0]/2)
            yOffset = math.floor(kernel_shape[1]/2)

            # offset origin to center if kernel is even by even
            if kernel_shape[0] % 2 == 0: xOffset -= 0.5
            if kernel_shape[1] % 2 == 0: yOffset -= 0.5

            # distance from x and y to the "origin" in the middle of the kernel
            xOrigin = x - xOffset
            yOrigin = y - yOffset

            # function from https://en.wikipedia.org/wiki/Gaussian_filter
            gaussian_kernel[x][y] = (1/(2*np.pi*sigma**2))*np.e**(-(xOrigin**2+yOrigin**2)/(2*sigma**2))

    return gaussian_kernel

KERNEL_SHAPE = (21, 21)
SIGMA = 2
GAUSSIAN_KERNEL = create_gaussian(KERNEL_SHAPE, SIGMA)

DHOR = np.array(
[
    [-1,0,1],
    [-2,0,2],
    [-1,0,1]
])

DVERT = np.array(
[
    [-1,-2,-1],
    [0,0,0],
    [1,2,1]
])


def take_derivative(image, derivative_kernels):

    # take derivates
    derivative_images = []
    for d in derivative_kernels:
        derivative_images.append(ncf(image, d))

    return ({"edges":merge([img for img in derivative_images]), "slopes":np.arctan2(derivative_images[0], derivative_images[1])})


def merge(images):

    merged_image = np.sqrt(sum(np.square(img) for img in images))
    merged_image = merged_image / np.amax(merged_image) * 255
    merged_image = merged_image.astype(int)

    return merged_image


def NMS(image, slopes):

    # slopes = slopes * 180. / np.pi # convert angles to degrees
    # slopes[slopes < 0] += 180 # fix negative values
    # angle = slopes
    # img = image
    # out_image = np.zeros((image.shape[0], image.shape[1]), dtype=np.int32)
    # Z = out_image

    img = image
    D = slopes

    M, N = img.shape
    Z = np.zeros((M,N), dtype=np.int32)
    angle = D * 180. / np.pi
    angle[angle < 0] += 180

    for i in range(1, image.shape[0]-1):
        for j in range(1, image.shape[1]-1):

            # angle = slopes[r][c]
            #
            # # angle 0
            # if (157.5 <= angle <= 180) or (0 <= angle < 22.5):
            #     P = image[r][c-1]
            #     N = image[r][c+1]
            #
            # # angle 45
            # elif (22.5 <= angle < 67.5):
            #     P = image[r+1][c-1]
            #     N = image[r-1][c+1]
            #
            # # angle 90
            # elif (67.5 <= angle < 112.5):
            #     P = image[r+1][c]
            #     N = image[r-1][c]
            #
            # # angle 135
            # elif (112.5 <= angle < 157.5):
            #     P = image[r-1][c+1]
            #     N = image[r+1][c-1]
            #
            # # set values in output image
            # if image[r][c] >= P and image[r][c] >= N:
            #     out_image[r][c] = image[r][c]
            # else:
            #     out_image[r][c] = 0


            # if (0 <= angle[i,j] < 22.5) or (157.5 <= angle[i,j] <= 180):
            q = img[i, j+1]
            r = img[i, j-1]
            #angle 45
            # elif (22.5 <= angle[i,j] < 67.5):
            #     q = img[i+1, j-1]
            #     r = img[i-1, j+1]
            # #angle 90
            # elif (67.5 <= angle[i,j] < 112.5):
            #     q = img[i+1, j]
            #     r = img[i-1, j]
            # #angle 135
            # elif (112.5 <= angle[i,j] < 157.5):
            #     q = img[i-1, j-1]
            #     r = img[i+1, j+1]

            if (img[i,j] >= q) and (img[i,j] >= r):
                Z[i,j] = img[i,j]
            else:
                Z[i,j] = 0

    return Z


def non_max_suppression(img, D):
    M, N = img.shape
    Z = np.zeros((M,N), dtype=np.int32)
    angle = D * 180. / np.pi
    angle[angle < 0] += 180

    # print(np.amax(D))
    # print(np.amax(angle))


    for i in range(1,M-1):
        for j in range(1,N-1):
            # try:
            q = 255
            r = 255

            #angle 0
            if (0 <= angle[i,j] < 22.5) or (157.5 <= angle[i,j] <= 180):
                q = img[i, j+1]
                r = img[i, j-1]
            #angle 45
            elif (22.5 <= angle[i,j] < 67.5):
                q = img[i+1, j-1]
                r = img[i-1, j+1]
            #angle 90
            elif (67.5 <= angle[i,j] < 112.5):
                q = img[i+1, j]
                r = img[i-1, j]
            #angle 135
            elif (112.5 <= angle[i,j] < 157.5):
                q = img[i-1, j-1]
                r = img[i+1, j+1]

            if (img[i,j] >= q) and (img[i,j] >= r):
                Z[i,j] = img[i,j]
            else:
                Z[i,j] = 0

            # except IndexError as e:
            #     pass

    return Z


################################################################################


# test_lines = cv2.imread("./test_lines-1.jpg")
# test_lines = ncf(test_lines, [[1]])
#
# # theta = np.zeros((test_lines.shape[0], test_lines.shape[1]))
#
# d = take_derivative(ncf(test_lines, GAUSSIAN_KERNEL), [DHOR, DVERT])
# print("After my NMS:")
# TESTcoins = NMS(test_lines, d["slopes"])
# display(TESTcoins)
# print(np.amax(TESTcoins))
#
# # print("After copy-paste NMS:")
# # display(non_max_suppression(test_lines, d["slopes"]))
#
#
# print("After copy-paste NMS and slope calculations:")
# # Kx = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]])
# # Ky = np.array([[1, 2, 1], [0, 0, 0], [-1, -2, -1]])
#
# #     Ix = ndimage.filters.convolve(img, Kx)
# #     Iy = ndimage.filters.convolve(img, Ky)\
# Ix = ncf(test_lines, DHOR)
# Iy = ncf(test_lines, DVERT)
#
# #     G = np.hypot(Ix, Iy)
# G = merge([Ix, Iy])
# #     G = G / G.max() * 255
# #     theta = np.arctan2(Iy, Ix)
#
#
# # d2 = sobel_filters(test_lines)
# # display(non_max_suppression(test_lines, d2[1]))
# display(non_max_suppression(test_lines, theta))


################################################################################


dhor = np.array(
[
    [-1,0,1],
    [-2,0,2],
    [-1,0,1]
])

dvert = np.array(
[
    [-1,-2,-1],
    [0,0,0],
    [1,2,1]
])

KERNEL_SHAPE = (21, 21)
SIGMA = 2
SOBEL_MULTIPLIER = 1

GAUSSIAN_KERNEL = create_gaussian(KERNEL_SHAPE, SIGMA)
DHOR = dhor*SOBEL_MULTIPLIER
DVERT = dvert*SOBEL_MULTIPLIER


OGlady = cv2.imread('./images/lady.png')
TESTlady = OGlady

print("After derivatives:")
d = take_derivative(ncf(OGlady, GAUSSIAN_KERNEL), [DHOR, DVERT])
display(d["edges"])
d["edges"] *= 3
display(d["edges"])
# print(np.amax(d["edges"]))
print("After NMS:")
TESTlady = NMS(d["edges"], d["slopes"])
display(TESTlady)
# print(np.amax(TESTlady))
