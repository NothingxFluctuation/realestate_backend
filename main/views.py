from django.shortcuts import render,HttpResponse , redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages  
from .models import Firm,Individual,TempFile_indi,TempFile_firm
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from django.contrib.sessions.models import Session
import random



# Create your views here.
def index(request):
        return render(request,'index.html')


def user(request):
    if request.user.is_authenticated:
        return render(request,'user.html')
    else:
        return redirect('/')
def Phone_verify_firm(request):
    if 'Account_Detail_firm' in request.session:
        if request.method == 'POST':
            Account_Detail_firm = request.session.get('Account_Detail_firm')
            code = Account_Detail_firm['code']
            first = request.POST['first']
            second = request.POST['second']
            third = request.POST['third']
            fourth = request.POST['fourth']
            print(Account_Detail_firm)
            digit = first+second+third+fourth
            print(code)
            print(digit)
            print(type(code))
            print(type(digit))
            
            if code == int(digit):
                First_name = Account_Detail_firm['First_name']
                Last_name = Account_Detail_firm['Last_name']
                Number = Account_Detail_firm['Number']
                Email = Account_Detail_firm['Email']
                password = Account_Detail_firm['password']
                Profile = TempFile_firm.objects.filter(username=Number)
                for e in Profile:
                    photo = e.profile
                    Cr_number = e.Cr_number
                print(photo)
                myuser = User.objects.create_user(Email,Email,password) 
                myuser.first_name = First_name
                myuser.last_name = Last_name
                myuser.save()
                All_user = Firm(user=myuser,profile=photo,Cr_number=Cr_number)
                All_user.save()
                Profile.delete()
                del request.session['Account_Detail_firm']
                messages.success(request,'Your Account has been created Now you can Log in')
                return redirect('/')
            else:
                del request.session['Account_Detail_firm']
                messages.error(request,'Invalid Confirmation Code , Try Again')
                return redirect('/signup_firm')


        else:
            pass

    else:
        return redirect('/')
    return render(request,'Phone_verify_firm.html')
def signup_firm(request): 
    if request.method == 'POST':
        First_name = request.POST['First']
        Last_name = request.POST['Last']
        Company_name = request.POST['Company']
        Cr_number = request.FILES['Cr']
        try:
            Profile_picture = request.FILES['profile']
        except:
            Profile_picture = 'user.svg'
        Email = request.POST['Email']
        password = request.POST['password']
        number = request.POST['number']
        # Check for Errorneous inputs560301054
        # Create the user 
        duplicate_users = User.objects.filter(email=Email)
        if duplicate_users.exists():
            messages.error(request,'Enter a Unique Email')
            return redirect('/signup_firm')
        else:
            code = random.SystemRandom().randint(1000,9999)
            context = {'First_name':First_name , 'Last_name':Last_name ,'Company_name':Company_name,'Number':number, 'Email': Email,'password':password , 'code':code}
            print(code)
            try:
                account_sid = 'ACc17fc41ed97d13f22d0bce21e40df6aa'
                auth_token = '49ea260aedb939864faa89650256c959'
                client = Client(account_sid, auth_token)

                message = client.messages.create(
                from_='+18335360682',
                to='+966{}'.format(number),
                body="Your Verification Code is {}".format(code),
                )
                print(message.sid)
            except TwilioRestException as e:
                print(e)
                print('hello World')

            
            TempFile = TempFile_firm(username=number ,profile=Profile_picture,Cr_number=Cr_number)
            TempFile.save()
            request.session['Account_Detail_firm'] = context
            return redirect('/Phone_verify_firm')
 
    return render(request,'signup_firm.html')
def Phone_verify(request):
    if 'Account_Detail' in request.session:
        if request.method == 'POST':
            Account_Detail = request.session.get('Account_Detail')
            code = Account_Detail['code']
            first = request.POST['first']
            second = request.POST['second']
            third = request.POST['third']
            fourth = request.POST['fourth']

            digit = first+second+third+fourth
            print(code)
            print(digit)
            print(type(code))
            print(type(digit))
            if code == int(digit):
                print('that matched boy')
                First_name = Account_Detail['First_name']
                Last_name = Account_Detail['Last_name']
                Number = Account_Detail['Number']
                Email = Account_Detail['Email']
                password = Account_Detail['password']
                Profile = TempFile_indi.objects.filter(username=Number)
                for e in Profile:
                    photo = e.profile
                print(photo)
                myuser = User.objects.create_user(Number,Email,password) 
                myuser.first_name = First_name
                myuser.last_name = Last_name
                myuser.save()
                All_user = Individual(user=myuser,profile=photo)
                All_user.save()
                Profile.delete()
                del request.session['Account_Detail']
                messages.success(request,'Your Account has been created Now you can Log in')
                return redirect('/')
            else:
                del request.session['Account_Detail']
                messages.error(request,'Invalid Confirmation Code , Try Again')
                return redirect('/signup_indi')
        else:
            pass

    else:
        return redirect('/')
    return render(request,'Phone_verify.html')
    
def signup_indi(request):
    if request.method == 'POST':
        First_name = request.POST['First']
        Last_name = request.POST['Last']
        try:
            Profile_picture = request.FILES['profile']
        except:
            Profile_picture = 'user.svg'

        Email = request.POST['Email']
        password = request.POST['password']
        number = request.POST['number']

        duplicate_users = User.objects.filter(username=number)
        if duplicate_users.exists():
            messages.error(request,'رقم الجوال تم تسجيله سابقاً')
            return redirect('/signup_indi')
        else:
            code = random.SystemRandom().randint(1000,9999)
            context = {'First_name':First_name , 'Last_name':Last_name ,'Number':number, 'Email': Email,'password':password , 'code':code}
            print(code)
            try:
                account_sid = 'ACc17fc41ed97d13f22d0bce21e40df6aa'
                auth_token = '49ea260aedb939864faa89650256c959'
                client = Client(account_sid, auth_token)

                message = client.messages.create(
                from_='+18335360682',
                to='+966{}'.format(number),
                body="Your Verification Code is {}".format(code),)
                
            except TwilioRestException as e:
                print(e)
                print('hello World')

                print(message.sid)
          
            
            TempFile = TempFile_indi(username=number ,profile=Profile_picture)
            TempFile.save()
            request.session['Account_Detail'] = context
            
            return redirect('/Phone_verify')
 
    return render(request,'signup_indi.html')
def login_user(request):
    if request.method == 'POST':
        Email = request.POST['Email_login']
        password = request.POST['password_login']
        user = authenticate(username=Email,password=password)
        if user is not None:
            login(request,user)
            messages.success(request,'Successfully login')
            return redirect('/')
        else:
            messages.error(request,'Invalid Credentials')
            return redirect('/login')
    return render(request,'login.html')

def login_user_indi(request):
    if request.method == 'POST':
        Number = request.POST['Phone']
        password = request.POST['password_login']
        user = authenticate(username=Number,password=password)
        if user is not None:
            login(request,user)
            messages.success(request,'Successfully login')
            return redirect('/')
        else:
            messages.error(request,'Invalid Credentials')
            return redirect('/login_indi')
    return render(request,'login_indi.html')
    
def logout_user(request):
    logout(request)
    messages.success(request,"Successfully logout")
    return redirect('/')
    
    
    

