from .models import Blog
from django import forms
from django.forms import ModelForm, TextInput, Textarea, EmailField
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User


class UserLoginForm(AuthenticationForm):
    username = forms.CharField(label='Имя пользователя', widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput(attrs={'class': 'form-control'}))


class UserRegistrationForm(UserCreationForm):
    username = forms.CharField(label='Имя пользователя', help_text='Имя пользователя может состоять максимум из 150 символов. Только буквы, цифры и символы @/./+/-/_.', widget=forms.TextInput(attrs={'class': 'form-control'}))
    password1 = forms.CharField(label='Пароль',help_text='Пароль должен состоять минимум из 8 символов, содержать как буквы, так и цифры, не быть заведомо простым и не содержать схожую с вашей персональной информацию', widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    password2 = forms.CharField(label='Подтверждение пароля', widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(label='E-mail', widget=forms.EmailInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class BlogForm(ModelForm):
    class Meta:
        model = Blog
        fields = ["title", "post"]
        widgets = {
            "title": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Тема поста'
            }),
            "post": Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Текст поста'
            }),
        }