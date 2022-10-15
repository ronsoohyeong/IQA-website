# Subjective quality assessment platform 
- A web-based cloudsourcing platform using django-web
- Translated from Chinese to English by ron.lee
  - original :  https://github.com/Max-cvv/IQA-website 

- Characteristics
  - It shows two images and the user should choose one with better quality.
  - It allows zoom and panning of two images in a synchronised way.
  - It does not ask the user to score.
  - It is designed to compare the image quality of smartphone models, and the real time ranking of smartphone models can be found in the management backend.
  However, in the English translation, I changed the 'smartphone model' into '(IR) algorithm' to make it general.

## Installation
- Django version should be below 3, or there would be errors.
- The python version the author tested was 3.6.9.
1. pip install -r requirements.txt
   
2. For the synchronized image comparasion, we use deepzoom [Python Deep Zoom Tools](https://github.com/openzoom/deepzoom.py). To install :  
    `cd deepzoom; python setup.py install; cd ..`
## Usage
- `python manage.py runserver` if you want to access locally
- `python manage.py runserver  0.0.0.0:8000` if you want to access from another machine

## Management Backend
- Add `/manage/` to the URL. (id & passwd: `admin`).

- The provided functionalities are:
  + Dataset：view pictures. Add device. Upload pictures. When uploading pictures, name the pictures serially and we recommend jpg format 1.jpg, 2.jpg...), then zip them.
  + Experient info (User list, Record list, Question info, Real-time Ranking）：View subjective quality numbers
  + Experiment management

## Pages

1. Main page

   ![image-20220404161043837](https://cdn.jsdelivr.net/gh/Max-cvv/imagehosting/img/image-20220404161043837.png)

2. Experiment page

   ![image-20220404162053194](https://cdn.jsdelivr.net/gh/Max-cvv/imagehosting/img/image-20220404162053194.png)

3. Management page

   ![image-20220404161701745](https://cdn.jsdelivr.net/gh/Max-cvv/imagehosting/img/image-20220404161701745.png)

