import numpy as np
import math
import argparse

ltn = {
    "A":1,
    "B":2,
    "C":3,
    "D":4,
    "E":5,
    "F":6,
    "G":7,
    "H":8,
    "I":9,
    "J":9,
    "K":10,
    "L":11,
    "M":12,
    "N":13,
    "O":14,
    "P":15,
    "Q":16,
    "R":17,
    "S":18,
    "T":19,
    "U":20,
    "V":21,
    "W":22,
    "X":23,
    "Y":24,
    "Z":25
}
ntl =  {v:k for k,v in ltn.items()}

def update_pos(row, col):
    if col < 4:
        col += 1
    elif col == 4:
        row += 1
        col = 0
    return row, col

def create_table(keyword):

    table = np.zeros((5,5))
    row = 0
    col = 0

    for l in keyword:
        n = ltn[l]
        if n not in table:
            table[row][col] = n
            row, col = update_pos(row, col)

    for n in range(1, 26):
        if n not in table:
            table[row][col] = n
            row, col = update_pos(row, col)

    return table


"""
    ENCRYPT FUNCTION
"""


def encrypt(keyword, raw_string):
    keyword = keyword.upper().replace(" ", "").replace("J", "I") # remove j's
    raw_string = raw_string.upper().replace(" ", "").replace("J", "I") # remove j's

    # create new table
    table = create_table(keyword)

    # RULE ONE >> if a pair is the same letter, add an "X" after the first one
    for i in range(math.ceil(len(raw_string)/2)):
        ind = i*2
        try:
            pair = [ltn[raw_string[ind]], ltn[raw_string[ind+1]]]
        except IndexError as e: # don't need to test a single character
            pass
        if pair[0] == pair[1]:
            raw_string = raw_string[:ind+1] + "X" + raw_string[ind+1:]

    # if the string has an odd number of characters
    if len(raw_string) % 2 == 1: raw_string += "X"

    encrypted_string = ""
    for i in range(math.ceil(len(raw_string)/2)):

        ind = i*2
        pair = [ltn[raw_string[ind]], ltn[raw_string[ind+1]]]

        pos1 = np.where(table == pair[0])
        pos2 = np.where(table == pair[1])
        pos1 = [int(n) for n in pos1] # turn the pos array thingy into ints
        pos2 = [int(n) for n in pos2] # turn the pos array thingy into ints

        # RULE 2 >> letters are in the same row and they are substitued with the letters to the right (wraps)
        if pos1[0] == pos2[0]:

            if pos1[1] == 4: # if at the end of the row wrap
                encrypted_string += ntl[int(table[pos1[0]][0])]
            elif pos1[1] < 4:
                encrypted_string += ntl[int(table[pos1[0]][pos1[1]+1])]

            if pos2[1] == 4: # if second letter is at the end of the row wrap
                encrypted_string += ntl[int(table[pos2[0]][0])]
            elif pos2[1] < 4:
                encrypted_string += ntl[int(table[pos2[0]][pos2[1]+1])]

        # RULE 3 >> letters are in the same col and they are substituted with the letters to the bottom (wraps)
        elif pos1[1] == pos2[1]:

            if pos1[0] == 4: # if at the end of the col
                encrypted_string += ntl[int(table[0][pos1[1]])]
            elif pos1[0] < 4:
                encrypted_string += ntl[int(table[pos1[0]+1][pos1[1]])]

            if pos2[0] == 4: # if at the end of the col wrap
                encrypted_string += ntl[int(table[0][pos2[1]])]
            elif pos2[0] < 4:
                encrypted_string += ntl[int(table[pos2[0]+1][pos2[1]])]

        # RULE 4 >> make the rectangle and replace
        else:

            encrypted_string += ntl[int(table[pos1[0]][pos2[1]])]
            encrypted_string += ntl[int(table[pos2[0]][pos1[1]])]

    return encrypted_string.replace("J", "I")


"""
    DECRYPT FUNCTION
"""


def decrypt(keyword, encrypted_string):

    keyword = keyword.upper().replace(" ", "").replace("J", "I") # remove j's
    encrypted_string = encrypted_string.upper()

    # create new table
    table = create_table(keyword)

    original_string = ""
    for i in range(math.ceil(len(encrypted_string)/2)):

        ind = i*2
        pair = [ltn[encrypted_string[ind]], ltn[encrypted_string[ind+1]]]

        pos1 = np.where(table == pair[0])
        pos2 = np.where(table == pair[1])
        pos1 = [int(n) for n in pos1] # turn the pos array thingy into ints
        pos2 = [int(n) for n in pos2] # turn the pos array thingy into ints

        # RULE 2 >> letters are in the same row and they need to be fixed by replacing them with the letter to the left (wraps)
        if pos1[0] == pos2[0]:

            if pos1[1] == 0: # if at the end of the row
                original_string += ntl[int(table[pos1[0]][4])]
            elif pos1[1] > 0:
                original_string += ntl[int(table[pos1[0]][pos1[1]-1])]

            if pos2[1] == 0: # if at the end of the row
                original_string += ntl[int(table[pos2[0]][4])]
            elif pos2[1] > 0:
                original_string += ntl[int(table[pos2[0]][pos2[1]-1])]

        # RULE 3 >> letters are in the same col and they need to be fixed by replacing them with the letter to the top (wraps)
        elif pos1[1] == pos2[1]:

            if pos1[0] == 0: # if at the top of the col
                original_string += ntl[int(table[4][pos1[1]])]
            elif pos1[0] > 0:
                original_string += ntl[int(table[pos1[0]-1][pos1[1]])]

            if pos2[0] == 0: # if at the top of the col
                original_string += ntl[int(table[4][pos2[1]])]
            elif pos2[0] > 0:
                original_string += ntl[int(table[pos2[0]-1][pos2[1]])]

        # RULE 4 >> make the rectangle and replace
        else:

            original_string += ntl[int(table[pos1[0]][pos2[1]])]
            original_string += ntl[int(table[pos2[0]][pos1[1]])]

    # RULE ONE >> cut out x's seperating two identical letters and at the end
    if original_string[-1] == "X": original_string = original_string[:-1]
    for i in range(math.ceil(len(original_string)/2)):
        ind = i*2
        try:
            pair = [ltn[original_string[ind]], ltn[original_string[ind+1]]]
        except IndexError as e: # don't need to test a single character
            pass
        if pair[1] == ltn["X"] and pair[0] == ltn[original_string[ind+2]]:
            original_string = original_string[:ind+1] + original_string[ind+2:]

    return original_string.replace("J", "I") # because i's are more common than j's


"""
    MAIN
"""


def main():
    help_str = """
        Encrypts and decrypts using the Playfair cipher.
    """
    ap = argparse.ArgumentParser(description=help_str)
    ap.add_argument("-E", "--encrypt",
                    help="""To encrypt the input string""",
                    action='store_true')
    ap.add_argument("-D", "--decrypt",
                    help="""To decrypt the input string""",
                    action='store_true')

    args = ap.parse_args()

    if args.encrypt:
        print("Encrypted message: " + encrypt(input("Keyword: "), input("Message: ")))
    elif args.decrypt:
        print("Decrypted message: " + decrypt(input("Keyword: "), input("Encrypted message: ")))
    else:
        print("Please add ' -E' to the end of your command if you want to encrypt a string, or ' -D' if you want to decrypt an encrypted string.")


main()
