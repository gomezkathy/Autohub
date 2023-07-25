from django.urls import path
from .views import api_technician_list, api_technician_detail, api_appointment_list, api_appointment_detail, api_cancel_appt, api_finish_appt
urlpatterns = [
    path("technicians/", api_technician_list, name="technician_list"),
    path("technicians/<int:pk>/", api_technician_detail, name= "technician_detail"),
    path("appointments/", api_appointment_list, name="appointment_list"),
    path("appointments/<int:pk>/", api_appointment_detail, name="appointment_detail"),
    path("appointments/<int:pk>/cancel", api_cancel_appt, name="cancel_appt"),
    path("appointments/<int:pk>/finish", api_finish_appt, name="finish_appt"),

]
