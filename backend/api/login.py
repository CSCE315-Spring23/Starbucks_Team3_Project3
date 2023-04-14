import os
import pathlib
import requests
from flask import session, abort, redirect, request
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from app import app
import json

with open('./private_tools/credentials.json', 'r') as file:
    credentials = json.load(file)["web"]

app.secret_key = credentials["client_secret"]
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev
GOOGLE_CLIENT_ID = credentials["client_id"]
client_secrets_file = os.path.join(pathlib.Path("./private_tools/"), "credentials.json")
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://localhost:5000/callback"
)

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    print("Found callback")

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    session["email"] = id_info.get("email")

    print(session["email"])

    session["role"] = "manager" if session["email"] == "david_liu@tamu.edu" else "NA"
    # session["role"] = "server" if session["email"] == "liudavidwang@gmail.com" else "NA"



    returnURL = "http://localhost:3000/"

    if session["role"] == "manager":
        returnURL = returnURL + "manager"
    elif session["role"] == "server":
        returnURL = returnURL + "server"
    else:
        session.clear()
        return "Sorry, access denied", 401


    # check if manager or not
    # if manager, then 
    return redirect(returnURL)


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/check-credentials")
@login_is_required
def protected_area():
    return 



