from datetime import timedelta
from flask import Flask, render_template, request, redirect, url_for, session, flash
from server import authenticate_user, create_user_account, submit_email_details

app = Flask(__name__)
app.permanent_session_lifetime = timedelta(days=1)
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

        flash(f"you have created {username} as a user. kindly check your mail box for emai", category='info')
        redirect(url_for('Home'))
    else:
        print(user_created)


@app.route('/submit_login_details', methods=['POST'])
def submit_login_details():
    if request.method == 'POST':
        user_email = request.form.get('user_email')
        password = request.form.get('password')

        # call the authenticate function and use it
        auth_result = authenticate_user(user_email, password)

        if "Login Successful" in auth_result:

            # make the session permanent
            session.permanent = True

            # Store data in the session
            session['user_email'] = user_email

            return redirect(url_for('dashboard'))
        elif "Login Failed: Incorrect Password" in auth_result:
            return redirect(url_for("home_login_failed_incorrect_password"))
        else:
            return redirect(url_for('home_login_failed_user_not_found'))
    else:
        return redirect(url_for('Home'))


@app.route('/Login_Failed_Incorrect_Password')
def home_login_failed_incorrect_password():
    session.pop("user_email", None)
    flash('Login Failed: Incorrect Password', 'danger')
    return redirect(url_for("Home"))


@app.route('/login_failed_user_not_found')
def home_login_failed_user_not_found():
    session.pop("user_email", None)
    flash('Login Failed: User not found', 'danger')
    return render_template("index.html")


@app.route("/logout")
def logout():
    session.pop("user_email", None)
    flash('you have logged out', 'info')
    return redirect(url_for("Home"))


@app.route('/dashboard')
def dashboard():
    if "user_email" in session:  # check if username is in session
        user_email = session["user_email"]
        return render_template("account.html")
    else:
        flash('you need to login first', 'info')
        return redirect(url_for('Home'))


@app.route('/cart_Login_Failed_Incorrect_Password')
def cart_login_failed_incorrect_password():
    session.pop("user_email", None)
    flash('Login Failed: Incorrect Password', 'danger')
    return redirect(url_for("cart"))


@app.route('/cart_login_failed_user_not_found')
def cart_login_failed_user_not_found():
    session.pop("user_email", None)
    flash('Login Failed: User not found', 'danger')
    return redirect(url_for("cart"))


@app.route('/cart', methods=['POST', 'GET'])
def cart():
    if request.method == 'POST':
        user_email = request.form.get('user_email')
        password = request.form.get('password')

        # call the authenticate function and use it
        auth_result = authenticate_user(user_email, password)

        if "Login Successful" in auth_result:

            # make the session permanent
            session.permanent = True

            # Store data in the session
            session['user_email'] = user_email

            return redirect(url_for('dashboard'))
        elif "Login Failed: Incorrect Password" in auth_result:
            return redirect(url_for("cart_login_failed_incorrect_password"))
        else:
            return redirect(url_for('cart_login_failed_user_not_found'))
    else:
        return render_template("cart.html")


@app.route('/bookings')
def bookings():
    return render_template('bookings.html')


@app.route('/settings')
def settings():
    return render_template('settings.html')


@app.route('/transaction')
def transactions():
    return render_template('transactions.html')


@app.route('/')
def root():
    return redirect(url_for('Home'))


# Add a catch-all route for handling URL not found errors
@app.errorhandler(404)
def page_not_found(e):
    return "Page not found. Please check the URL.", 404


if __name__ == "__main__":
    app.run(debug=True)
