# index the repository sub directory files into a .txt file and save it in the current directory

import os
import sys
import re
import subprocess

# get the current directory
current_dir = os.getcwd()
# ask the user for the repository sub directory
sub_dir = input("Enter the repository sub directory: ")
# get the sub directory path
sub_dir_path = os.path.join(sub_dir)
# get the sub directory files
sub_dir_files = os.listdir(sub_dir_path)
# create a .txt file to save the sub directory files in the sub directory
txt_file = open('list.txt', 'w')
# write the sub directory files name into the .txt file
for file in sub_dir_files:
    txt_file.write(file + '\n')
# close the .txt file
txt_file.close()
#move the .txt file to the sub directory
subprocess.run(['mv', 'list.txt', sub_dir_path])
# print the .txt file path
print('list.txt file is created in the directory')

