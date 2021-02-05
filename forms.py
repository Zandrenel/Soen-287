from wtforms import Form, BooleanField, StringField, PasswordField, validators


class RegisterForm(Form):
    username = StringField('Username', [validators.Length(min=6, max=18)])
    email = StringField('Email Address', [validators.Length(min=6, max=35)])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')])
    ConfirmPassword = PasswordField('Repeat Password')


class LogInForm(Form):
    username = StringField('Username',[validators.DataRequired()])
    password = StringField('Password',[validators.DataRequired()])


class PageDataForms(Form):
    a = StringField()



