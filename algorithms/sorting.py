import numpy as np


# function to merge two arrays by comparing the first values
def merge(arr1, arr2):

    out = []
    a1 = np.array(arr1)
    a2 = np.array(arr2)
    i = j = 0
    last_two = True # if the last two elements have not been sorted at the end of the while loop

    while i < len(a1)-1 or j < len(a2)-1:

        if i == len(a1): # if there are no elements left in a1
            out.extend(a2[j:])
            last_two = False
            break
        elif j == len(a2): # if there are no elements left in a2
            out.extend(a1[i:])
            last_two = False
            break

        value = min(a1[i], a2[j]) # find the smaller value
        out.append(value)

        if a1[i] == value: # move to the next value in that array
            i += 1
        else:
            j += 1

    if last_two: # if the last two elements need to be sorted
        out.append(min(a1[-1], a2[-1]))
        out.append(max(a1[-1], a2[-1]))

    return out


def mergesort(arr):

    # return base case
    if len(arr) == 1:
        return arr

    # split array in half
    half1 = arr[:len(arr)//2]
    half2 = arr[len(arr)//2:]

    # mergesort both halves
    a1 = mergesort(half1)
    a2 = mergesort(half2)

    # return the merged halves
    return merge(a1, a2)


def main():

    l = input("List to sort? (Numbers space-seperated)").split()
    l = [float(i) for i in l]
    l_sorted = mergesort(l)
    print("Sorted list:", l_sorted)


main()
