from django import forms

# class for form tools
class RegisterForm(forms.Form):
    full_name = forms.CharField(label='Full name', max_length=100)