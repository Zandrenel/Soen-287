from flask import Flask, render_template, session, request, redirect, flash
import json, sqlite3
import bcrypt
import pandas as pd
import sqlalchemy as sa
from pandas.io import sql
from forms import RegisterForm, LogInForm, PageDataForms


# ========ADMIN LOG IN FOR TESTING=============
#User: Zandrenel
#Pass: Pt,Ohs!179

#========Current Generic Log In========
#User: Apples
#Pass: Apple!10

#storing the data from the LORE section of the site has been giving trouble or easily messed up,
#after submission to fix that I plan to replace it with sqlite3, the storage and retrieval from the
#tables is much simpler in comparison

#This app/site was only created for personal practice and an educational course
#There is no intent to deploy this at any time in the future

app = Flask(__name__)
app.secret_key='sdfwsfwn132423nkj2n42jkndosih2o9gdfgs'

message=""

LoreTabs=[]
        

# Main route to HomePage
@app.route('/')
def index():
    with open('data/sideBarLinks.json','r') as sideBar:
        links=json.loads(sideBar.read())
    with open('data/mainSite.json','r') as mainText:
        text=json.loads(mainText.read())
    
    return render_template('Template_base.html',links=links,text=text,message=message)

#Route to the LorePage
@app.route("/Lore",methods=['GET','POST'])
def Lore():
    #with open('data/Lore.json','r') as LoreData:
    #    Lore=json.loads(LoreData.read())
    form = PageDataForms()
    Lore = LoreDataBase()
    return render_template('Lore.html',Lore=Lore,form=form)


# 1.try casting te things as you SELECT them from table
# 2.try just fetch all, it will always return as a tuple
def LoreDataBase():
    DataBase = sqlite3.connect("data/PageData.sqlite")
    TD = pd.DataFrame(columns=["Tab","Header","Text","Visible"])
    TD.to_sql("Lore",DataBase,if_exists="append")
    print("TD: "+TD)
    T = pd.DataFrame(columns=["Tab","Visible"])
    T.to_sql("LoreTabs",DataBase,if_exists="append")
    print("T: "+T)
    Tabs=pd.read_sql_query("SELECT * FROM LoreTabs",DataBase)
    Data=pd.read_sql_query("SELECT * FROM Lore",DataBase)
    print("Tabs: ")
    print(Tabs)
    print("Data: ")
    print(Data)
    print("---------------Individually---------------")
    print(Tabs.empty)
    print(Data.empty)
    if ((Data.empty) and (Tabs.empty)):
        InitializationText=['Texting Text TAB','This is a Test:Header','This text should be the body',True]
        DataInitialize=[InitializationText[0],InitializationText[3]]
        print(InitializationText)
        print(DataInitialize)
        Tabs.loc[0,'Tab']=InitializationText[0]
        Tabs.loc[0,'Header']=InitializationText[1]
        Tabs.loc[0,'Text']=InitializationText[2]
        Tabs.loc[0,'Visible']=InitializationText[3]
        Data.loc[0,'Tab']=InitializationText[0]
        Data.loc[0,'Visible']=InitializationText[3]
    print(Tabs)
    print(Data)
    TabData={}
    x=0
    for tab in LoreTabs:
        LoreTabs.pop(x)
        x=x+1
    x=0
    for tab in Data['Tab']:
        print(tab)
        
        if (Data.loc[x,"Tab"]==Tabs.loc[x,"Tab"]):
            LoreTabs.append(Data.loc[x,"Tab"])
            TabData[tab]=({str(Data.loc[x,"Header"]):str(Data.loc[x,"Text"])})
        x=x+1
        print(TabData)
    DataBase.close()
    return TabData
    
@app.route("/LoreDataBaseTabs",methods=['GET'])
def DataBaseTabs():
    return LoreTabs
    
    
@app.route("/Lore/<string:mode>/<string:name>",methods=['POST','GET'])
def LoreMod(mode,name):
    DataBase = sqlite3.connect("data/PageData.sqlite")
    print("Starting Lore Function "+mode)
    if mode=='editTab':
        print("-------Processing Edit Tab-----------")
        temp ='editTab'+name #editTab+'+Tab'
        #form='editTab'+name+"Form"
        print(temp)
        #newTab=request.form[temp]
        #print(newTab)
        Tabs=pd.read_sql_query("SELECT * FROM LoreTabs",DataBase)
        print(Tabs)
        Tabs["Tab"].replace(name, value=newTab, inplace=True)
        Data=pd.read_sql_query("SELECT * FROM Lore",DataBase)
        Data["Tab"].replace(name, value=newTab, inplace=True)
        print(Tabs)
        print(Data)
        Tabs.to_sql("LoreTabs",DataBase,if_exists="replace")
        Data.to_sql("Lore",DataBase,if_exists="replace")
        print("Committed!")
        DataBase.close()
        DataBase = sqlite3.connect("data/PageData.sqlite")
        Tabs=pd.read_sql_query("SELECT * FROM LoreTabs",DataBase)
        print(Tabs)
        print(Data)
        DataBase.close()
    return redirect('/Lore')
        




# will route to the tools tab
@app.route("/Tools")
def tools():
    with open('data/mainSite.json','r') as mainText:
        text=json.loads(mainText.read())
    return render_template('Tools.html',text=text)

# Will route to the logIn tab
@app.route("/LogIn", methods=['GET'])
def logIn():
    form=LogInForm()
    return render_template('LogIn.html',form=form)

# Will process the log in, if the user exists, and if after decryting the password the passwords match, the current session will be
# set to this user, if they are an admin the session admin will be set to true.
@app.route("/processLogIn", methods=['POST'])
def processLogIn():
    form = LogInForm()
    if form.validate_on_submit():
        print('Started')
        _user=request.form['username']
        _pass=request.form['password']
        if (findUser(_user) and bcrypt.checkpw(_pass.encode('utf-8'),(returnUser(_user))[1].encode('utf-8'))):
            print('users match')
            session['Admin']=returnUser(_user)[3]
            session['username']=_user
            print('Log in Sucess')
            return redirect('/')
        else:
            print('logInFailed')
            return redirect("/LogIn")
            raise("Could not Log In.")

# Will return a boolean of if the user exists
def findUser(_user):
    print('finding User')
    LogData = sqlite3.connect("data/Users.sqlite")
    cursor = LogData.cursor();
    LogData.row_factory = sqlite3.Row
    cursor.execute('SELECT * FROM users WHERE userName=?', (_user,))
    user_ = cursor.fetchone()
    print(user_)
    LogData.close()
    print('tetsing equality of users')
    if user_:
        print('user true')
        return True
    else:
        print('user false')
        return False

# will return the actual user's data if it exists
def returnUser(_user):
    print('finding User')
    LogData = sqlite3.connect("data/Users.sqlite")
    cursor = LogData.cursor();
    LogData.row_factory = sqlite3.Row
    cursor.execute('SELECT * FROM users WHERE userName=?', (_user,))
    user_ = cursor.fetchone()
    print(user_)
    #print(user_[0])
    #print(user_[1])
    LogData.close()
    print('tetsing equality of users')
    if user_:
        print('user true')
        return user_
    else:
        print('user false')
        return None

# will pop the user Session and admin status
@app.route('/LogOut')
def logOut():
     session.pop('username', None)
     session.pop('Admin',None)
     return redirect('/')




# register template
@app.route("/Register",methods=['GET'])
def Register():
    form = RegisterForm()
    return render_template('Register.html',form=form)

# will process the registration, if they exist  won't register, otherwise if validated will add to the dataBase
@app.route("/processRegistration", methods=['POST'])
def processRegistration():
    form = RegisterForm()
    if form.validate_on_submit():
        _user=request.form['username']
        #_user = findUser(_user)
        LogData = sqlite3.connect("data/Users.sqlite")
        cursor = LogData.cursor();
        cursor.execute("CREATE TABLE IF NOT EXISTS users(userName, password, email, admin, level)")
        LogData.close()

        if not findUser(_user):
            _pass=request.form['password'].encode()
            salt = bcrypt.gensalt()
            _pass = bcrypt.hashpw(_pass, salt)
            _email=request.form['email']
            LogData = sqlite3.connect("data/Users.sqlite")
            cursor = LogData.cursor();
            #cursor.execute("CREATE TABLE users(userName, password, email, admin, level)")
            if _user == "Zandrenel":
                cursor.execute("INSERT INTO users VALUES(?,?,?,?,?)",(_user,_pass.decode(),_email, True, 10))
            else:
                cursor.execute("INSERT INTO users VALUES(?,?,?,?,?)",(_user,_pass.decode(),_email, False, 1))
            LogData.commit()
            LogData.close()
            flash('Registered successfully.')
            print('User should have been successfullly added.')
            return redirect('/')
        else:
            print('User exists, can\'t register')
            flash("User name Already Exists.")
            return render_template("Register.html")
    else:
        message="One of the fields was invalid"
        return render_template("Register.html", form=form, message=message)
@app.route("/Contact")
def Contact():
    with open('data/mainSite.json','r') as Main:
        data = json.loads(Main.read())
    return render_template('Contact.html',data=data)

@app.route("/Profile")
def profile():
    if session['username']:
        user=returnUser(session['username'])
        return render_template("Profile.html",user=user)
    else:
        return redirect("/")


if __name__=='__main__':
    app.run(debug=True)
