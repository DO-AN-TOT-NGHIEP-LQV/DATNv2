# Đô án tốt nghiệp 
# Lê QUốc Việt - 102190389
# 19TCLC_Nhat_2 


---- BE ----
- Cài đặt môi trường java và grandle
  sudo apt-get install openjdk-11-jdk
  sudo apt install gradle

- Build và run code
    ./gradlew build (build)
    java -jar /BE_ERIC/build/libs/be_eric-0.0.1-SNAPSHOT.jar (run)

---- AI ----
- Cài môi trường python và thư viện được yêu cầu trong file req.txt 
    python3 -m venv env
    python3 -m pip install -r req.txt
- Tải về model
    python3 getModelH5.py
- run code
    gunicorn --bind 0.0.0.0:8000 wsgi:app
    hoặc flask run

  
---- FE --------

