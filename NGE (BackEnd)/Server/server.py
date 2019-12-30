from flask import Flask, render_template, request
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
import yaml
import challonge
from challonge import tournaments, matches, participants

import json
from flask_sqlalchemy import SQLAlchemy
 
app = Flask(__name__)
CORS(app)

#configure db
db = yaml.load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

@app.route('/')
def login():
    return render_template("Login.htm")

@app.route('/index.htm')
def homepage():
    return render_template("index.htm")

@app.route('/getImage', methods=["POST"])
def retrieveImage():
    username = request.json
    print(username)
    select_stmt = "SELECT imageFile FROM users WHERE username = %(username)s"
    cur = mysql.connection.cursor()
    cur.execute(select_stmt, { 'username': username })
    userDetails = cur.fetchone()
    print(userDetails)
    return userDetails




@app.route('/createUser', methods=['POST'])
def register():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        userDetails = request.json
        print(userDetails)
        username = userDetails['username']
        userImage = 'https://firebasestorage.googleapis.com/v0/b/poctest-c1a05.appspot.com/o/personsil.png?alt=media&token=f39dad23-bc65-4126-8561-4e251af91df9'
        email = userDetails['email']
        userID = userDetails['userID']
        z = 0
        y = 'nil'
        cur.execute("insert into users(username, email, userID, imageFile, goldT, silverT, bronzeT, eliteT, cWins, cLoses, eliteStatus, winnings, profileViews, xp, twitch, twitter, discord, psn, xbl, epic, steam, youtube, instagram) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (username, email, userID, userImage, z, z, z, z, z, z, y, z, z, z, y, y, y, y, y, y, y, y, y))
        mysql.connection.commit()
        cur.close()
        return 'success'
    return "hi"

@app.route('/createTeam', methods=['POST'])
def createTeam():
    if request.method == 'POST':
        teamDetails = request.json
        tid = teamDetails['tid']
        print(tid)
        teamName = teamDetails['MyteamName']
        print(teamName)
        x = participants.create(tid, teamName)
        print(x['id'])
        xx = json.dumps(x['id'])
        return xx

@app.route('/fetchBracket', methods=['POST'])
def fetchBracket():
    if request.method == 'POST':
        teamDetails = request.json
        tid = teamDetails['tid']
        x = tournaments.show(tid)
        print(x)
        xx = json.dumps(x['id'])
        return xx


@app.route('/fetchUsername', methods=['POST'])
def fetchUsername():
    uid = request.json
    print(uid)
    uid = uid['uid']
    select_stmt = "SELECT username FROM users WHERE userID = %(uid)s"
    cur = mysql.connection.cursor()
    cur.execute(select_stmt, { 'uid': uid })
    userDetails = cur.fetchone()
    userDetails = json.dumps(userDetails)
    print(userDetails)
    return userDetails

@app.route('/fetchPic', methods=['POST'])
def fetchPic():
    uid = request.json
    uid = uid['uid']
  
    select_stmt = "SELECT imageFile FROM users WHERE userID = %(uid)s"
    cur = mysql.connection.cursor()
    cur.execute(select_stmt, { 'uid': uid })
    userDetails = cur.fetchone()
    userDetails = json.dumps(userDetails)
    print(userDetails)
    return userDetails



@app.route('/checkEmail', methods=['GET', 'POST'])
def checkEmail():
    email = request.json
    select_stmt = "SELECT email FROM users WHERE email = %(email)s"
    cur = mysql.connection.cursor()
    cur.execute(select_stmt, { 'email': email })
    userDetails = cur.fetchone()
    print(userDetails)
    if userDetails is None:
        return 'false'
    else:
        return 'true'

@app.route('/checkUsername', methods=['GET', 'POST'])
def checkUsername():
    username = request.json
    select_stmt = "SELECT email FROM users WHERE username = %(username)s"
    cur = mysql.connection.cursor()
    cur.execute(select_stmt, { 'username': username })
    userDetails = cur.fetchone()
    print(userDetails)
    if userDetails is None:
        return 'false'
    else:
        return 'true'





if __name__ == "__main__": 
    app.run(debug=True)