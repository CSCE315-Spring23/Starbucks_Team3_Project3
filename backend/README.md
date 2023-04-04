## Information about the Database:
- PostGreSQL server is running at:
```bash
csce-315-db.engr.tamu.edu
```
- The full command to try and connect with Bash is:
```bash
psql -h csce-315-db.engr.tamu.edu -U <username> -d csce315331_team_3
```
- Please contact Devon the Man for username and password :)

## Set up Python
- Download Python from www.python.org
- Download Python Virtual Environment
```bash
python3 -m pip install --user virtualenv
```
- If above command fails, you can try:
```
pip install virtualenv
```

## Check and install Pip
- Check if you have pip installed:
```
pip --version
```
or
```
pip3 --version
```
You can use whichever one you have
- If not installed, try:
```
sudo apt update
sudo apt install python3-pip
```

## Set up SQLite3
- In terminal (under `Starbucks_Team3_Project3/backend`), type:
```
python3 models/queue_db_setup.py
```

## Set up Flask
```bash
python3 -m venv venv
source env/bin/activate
pip3 install -r requirements.txt
flask run
```


The frontend will run on `localhost:3000`, while the backend will run on `localhost:5000`.