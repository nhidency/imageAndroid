from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
# Create your views here.
def home(request):
       context={}
       return render(request, 'pages/home.html', context)

def login(request):
       context={}
       return render(request, 'pages/login.html', context)

def signup(request):
       context={}
       return render(request, 'pages/signup.html', context)

def cart(request):
       context={}
       return render(request, 'pages/cart.html', context)

def bill(request):
       context={}
       return render(request, 'pages/bill.html', context)

def product(request):
       context={}
       return render(request, 'pages/product.html', context)

def itemproduct(request):
       context={}
       return render(request, 'pages/itemproduct.html', context)

def checkout(request):
       context={}
       return render(request, 'pages/checkout.html', context)

def chatbot(request):
       context={}
       return render(request, 'pages/chatbot.html', context)