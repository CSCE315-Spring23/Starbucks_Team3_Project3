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
python3 -m pip install virtualenv
```

## Set up Environment and install everything from requirements.txt
```bash
python3 -m venv venv
source env/bin/activate
pip3 install -r requirements.txt
```

## Start Flask
```
flask run
```

The frontend will run on `localhost:3000`, while the backend will run on `localhost:5000`.