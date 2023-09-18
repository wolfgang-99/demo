import datetime as dt
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from server import authenticate_user, create_user_account, submit_email_details

app = Flask(__name__)
# app.secret_key = os.getenv("secret_key")  # Set a secret key for sessions
app.secret_key = "demo"  # Set a secret key for sessions
MONGODB_URL = "mongodb+srv://wolfgang:wolfgang@cluster0.06gzzsk.mongodb.net/?retryWrites=true&w=majority"


@app.route('/Home')
def Home():
    return render_template("index.html")


@app.route('/create_user_account', methods=['POST'])
def create_user_account_route():
    username = request.form.get('username')
    email = request.form.get('email')
    number = request.form.get('number')
    password = request.form.get('password')
    user_created = create_user_account(username=username, email=email, number=number, password=password)
    if user_created:
        submitted_email = submit_email_details(register_email=email, register_name=username)
        if submitted_email == 'email sent':
            flash(f'kindly check your mail box for email', category='info')
            flash(f"you have created {username} as a user", category='info')
        return redirect(url_for('Home'))
    else:
        print(user_created)


@app.route('/submit_login_details', methods=['POST'])
def submit_login_details():
    useremail = request.form.get('user_email')
    password = request.form.get('password')

    # call the authenticate function and use it
    auth_result = authenticate_user(useremail, password)

    if "Login Successful" in auth_result:

        # Store data in the session
        session['username'] = useremail

        return redirect(url_for('dashboard'))
    elif "Login Failed: Incorrect Password" in auth_result:
        return redirect(url_for("login_failed_incorrect_password"))
    else:
        return redirect(url_for('login_failed_user_not_found'))


@app.route('/Login_Failed_Incorrect_Password')
def login_failed_incorrect_password():
    session.pop("username", None)
    flash('Login Failed: Incorrect_Password', 'danger')
    return redirect(url_for("Home"))


@app.route('/login_failed_user_not_found')
def login_failed_user_not_found():
    session.pop("username", None)
    flash('Login Failed: User not found', 'danger')
    return render_template("index.html")


@app.route("/logout")
def logout():
    session.pop("username", None)
    flash('you have logged out', 'info')
    return redirect(url_for("Home"))


@app.route('/dashboard')
def dashboard():
    if "username" in session:  # check if username is in session
        username = session["username"]
        return render_template("account.html")
    else:
        flash('you need to login first', 'info')
        return redirect(url_for('Home'))


@app.route('/cart')
def cart():
    return render_template("cart.html")




@app.route('/cart')

@app.route('/')
def root():
    return redirect(url_for('Home'))


# Add a catch-all route for handling URL not found errors
@app.errorhandler(404)
def page_not_found(e):
    return "Page not found. Please check the URL.", 404


if __name__ == "__main__":
    app.run(debug=True)
