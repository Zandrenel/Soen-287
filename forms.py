from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import InputRequired, EqualTo, Regexp

class RegisterForm(FlaskForm):
	username=StringField('Username',validators=[
		InputRequired(message='You can not leave this field empty.'),
		Regexp('^([A-Za-z0-9]{6,18})$', message='You can only use letters and numbers.')])
	password=PasswordField('Password',validators=[
		InputRequired(message='You can not leave this field empty.'),
		Regexp('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])', message='You at least one uppercase, lowercase, a number, and special character.')])
	ConfirmPassword=PasswordField('Confirm Password',validators=[
		InputRequired(message='You can not leave this field empty.'),
		EqualTo('password', message='Passwords do NOT match.')])
	email=StringField('Email',validators=[
		InputRequired(message='You can not leave this field empty.'),
		Regexp('([A-Z0-9a-z]+)[@]([A-Z0-9a-z]+)[\.]([A-Z0-9a-z])+', message='You can not leave this field empty.')])

class LogInForm(FlaskForm):
	username=StringField('Username', validators=[InputRequired(message='You can not leave this field empty.')])
	password=PasswordField('Password', validators=[InputRequired(message='You can not leave this field empty.')])

class PageDataForms():
    TabEdit=StringField(validators=[InputRequired()])
    HeaderEdit=StringField(validators=[InputRequired()])
    DescriptionEdit=TextAreaField(validators=[InputRequired()])
