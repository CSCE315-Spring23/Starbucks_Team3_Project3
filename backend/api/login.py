import os
import pathlib
import requests
from flask import Flask, session, abort, redirect, request
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from app import app
app.secret_key = "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"
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev
GOOGLE_CLIENT_ID = "784838590397-09qh9626eog7edfqacf6obnkjhdiplam.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://localhost/callback"
)

def login_is_required(function):
    """
    Verifies the login attempt. Provides error if not a google_id
    :param x: function
    :type x: any
    :return: Will return the error message or  function
    :rtype: any
    """
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper


@app.route("/login")
def login():
    """
    Takes you to the OAuth login screen
    :param x: None
    :type x: None
    :return: Redirects user to the login page
    :rtype: function
    """
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback")
def callback():
    """
    Takes you to the callback page after failed login
    :param x: authorization request
    :type x: string
    :return: Redirects user to protected_area
    :rtype: function
    """
    flow.fetch_token(authorization_response=request.url)

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
    return redirect("/protected_area")


@app.route("/logout")
def logout():
    """
    Logs the user out
    :param x: Noe
    :type x: None
    :return: Redirects user to the home page
    :rtype: function
    """
    session.clear()
    return redirect("/")


@app.route("/")
def index():
    """
    This function creates the login button
    :param x: None
    :type x: None
    :return: Returns html code for login button
    :rtype: String
    """
    return "Login <a href='/login'><button>Login</button></a>"


@app.route("/protected_area")
@login_is_required
def protected_area():
    """
    User enters session
    :param x: None
    :type x: None
    :return: Returns a welcome message and logout button
    :rtype: string
    """
    return f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"


# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=80, debug=True)



