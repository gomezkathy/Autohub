from django.shortcuts import render
from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

# Create your views here.


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]




class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer_name",
        "technician",
        "id",
    ]
    def get_extra_data(self, o):
        return {
            "technician": o.technician.id
        }


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "color",
        "year",
        "vin",
        "sold",
        "id",
    ]

# Gets list of technicians/ technician info + creates
@require_http_methods(["GET", "POST"])
def api_technician_list(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder = TechnicianEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "could not create technician"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "PUT", "DELETE"])
def api_technician_detail(request,pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )

        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "technician does not exist"}
            )

            response.status_code=404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {'message': 'technician has been deleted'}
            )

    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=pk)
            properties = [
                "first_name",
                "last_name",
                "employee_id",
            ]

            for prop in properties:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder= TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {'message': 'technician does not exist'}
            )
            response.status_code = 404
            return response




@require_http_methods(["GET", "POST"])
def api_appointment_list(request, technician_id=None):
    if request.method == "GET":
        if technician_id is not None:
            appointment= Appointment.objects.filter(technician=technician_id)
        else:
            appointment = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointment},
            encoder=AppointmentEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)

        try:
            technician_href = content["technician"]
            technician=Technician.objects.get(id=technician_href)
            content["technician"]=technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "technician id is invalid"},
                status=400,
            )

        appointment=Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

#Getting details/ deleting appointment
@require_http_methods(["GET","DELETE"])
def api_appointment_detail(request,pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {'message': 'appointment does not exist'}
            )
            response.status_code=404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {'message': 'appointment has been deleted'}
            )

#Cancels appointment
@require_http_methods(["PUT"])
def api_cancel_appt(request,pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.status = "cancelled"
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {'message': 'invalid appointment id'}
            )
            response.status_code = 404
            return response


#finishes appointment
@require_http_methods(["PUT"])
def api_finish_appt(request,pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.status = "finished"
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {'message': 'invalid appointment id'}
            )
            response.status_code = 404
            return response
