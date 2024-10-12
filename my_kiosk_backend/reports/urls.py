from django.urls import path
from .views import submit_request

urlpatterns = [
    path('api/submit-request/', submit_request, name='submit_request'),
]
