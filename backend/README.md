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
- Here's how you check if Python is installed
```bash
python --version
```
- Download Python Virtual Environment
```bash
python3 -m pip install virtualenv
```

## Set up Pip
```bash
sudo apt install python3-pip
pip --version
```
If the version shows up you're good!

## Set up Environment and install everything from requirements.txt
```bash
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

## Start Flask
```
flask run
```

The frontend will run on `localhost:3000`, while the backend will run on `localhost:5000`.