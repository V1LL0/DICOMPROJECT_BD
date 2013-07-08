# Web Dicom
> > > > > ##   Roberta Romano

> > > > > > > ##       &&

> > > > > ##  Valerio Cestarelli

- - -
# Initial Idea

## Implements Block Decomposition of an image

- - -
# How to do?

## We analyzed different algorithms, we found some solutions:
* QuadTree Decomposition (in Java)
* QuadTree Decomposition (in JavaScript)
* Decomposition in Rectangles (in Python)
* Mosaic


- - -
# The Algorithm

This solution takes as input a 2bit image.

We need to flow a sub-matrix on the image.

Dimensions of sub-matrix is decided by user.

The algorithm measures the quantity of black pixels in contraposition to white pixels.

All pixels of the submatrix become of the same color of prevalent color.

- - -
# Here an explicative image:
![Block flow](http://picasion.com/pic71/fac47580c7966c32204d12c0d8b6db5d.gif)

![Block flow2](http://picasion.com/pic71/a3cf0e1b481c0c5dee351dd5d382c212.gif)

- - -
# Preparation Of Image

## We need to prepare the image with two operations:
* Grayscale
* Thresholding

Thresholding take the image grayscalled and return an image in two bit, that shows only details desired by the user,

according with min and max values selected.

![](https://s24.postimg.org/letrqpz1h/Pavlovsk_Railing_of_bridge_Yellow_palace_Winter.jpg)
![](https://s24.postimg.org/fcm508alh/Schermata_del_2013_07_01_18_05_14.png)
![](https://s24.postimg.org/5zl3cqpwl/Pavlovsk_Railing_of_bridge_Yellow_palace_Winter.jpg)

- - - 
# Code Optimization

##After described operations, we thought on optimize the code, to make it run faster:

* We've, initially, used translated CUBOIDs, now we use DOMAINs, painted directly on right points.
* We've, initially, used a single domain for each detected block, now we've unified continued blocks on same row.

- - -
# 3D 

## Image 3D with plasm.js:

* We can upload more than one image
* Later we can place them all one above the other, at a distance selected by the user, to get a 3D effect.

- - -
# The End
