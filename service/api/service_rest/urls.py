from django.urls import path
from .views import api_technician_list, api_technician_detail
urlpatterns = [
    path("technicians/", api_technician_list, name="technician_list"),
    path("technicians/<int:pk>/", api_technician_detail, name= "technician_detail"),
]
