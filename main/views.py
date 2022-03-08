from django.shortcuts import render, redirect, get_object_or_404
from .models import Blog, Category, Product
import os
from .forms import BlogForm, UserRegistrationForm, UserLoginForm
from django.core.paginator import Paginator
from django.contrib import messages
from django.contrib.auth import login, logout
from django.core.mail import send_mail
from cart.forms import CartAddProductForm


def index(request):
    return render(request, 'main/index.html')


def about(request):
    return render(request, 'main/about.html')




def registration(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            email = form.cleaned_data['email']
            # send_mail('Регистрация', 'Поздравляю, вы успешно зарегистрировались на сайте FloriShop', 'gyntera@gmail.com', [email])
            login(request,user)
            messages.success(request, 'Регистрация прошла успешно')
            return redirect('main:index')
        else:
            messages.error(request, 'При регистрации возникла ошибка, пожалуйста попробуйте снова')
    else:
        form = UserRegistrationForm()
    return render(request, 'main/registration.html', {'form': form})


def log_in(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('main:index')
    else:
        form = UserLoginForm()
    return render(request, 'main/login.html', {'form': form})


def log_out(request):
    logout(request)
    return redirect('main:index')

def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    return render(request,
                  'main/products/list.html',
                  {'category': category,
                   'categories': categories,
                   'products': products})


def product_detail(request, id, slug):
    product = get_object_or_404(Product,
                                id=id,
                                slug=slug,
                                available=True)
    return render(request,
                  'main/products/detail.html',
                  {'product': product})


def product_detail(request, id, slug):
    product = get_object_or_404(Product,
                                id=id,
                                slug=slug,
                                available=True)
    cart_product_form = CartAddProductForm()
    return render(request, 'main/products/detail.html', {'product': product,
                                                        'cart_product_form': cart_product_form})

