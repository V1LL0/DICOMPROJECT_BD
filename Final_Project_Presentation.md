# Web Dicom
> > > ##   Roberta Romano

> > > > > ##       &&

> > ##  Valerio Cestarelli

- - -
# Initial Idea

## Implements Block Decomposition of an image

- - -
# How to do?

## We analyzed different algorithms, we found some solutions:
* QuadTree Decomposition
* Other Algorithm (we'll modify this raw, next)
* Mosaic


- - -
# The Algorithm

This solution take as input a 2bit image.

We need to flow a sub-matrix on the image.

Dimensions of sub-matrix is decided by user.

The algorithm measures the quantity of black pixels in contraposition to white pixels.

All pixels of the submatrix become of the same color of prevalent color.


