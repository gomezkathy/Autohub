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

    encoders = {
        "technician": TechnicianEncoder
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
                {'message': 'technician has been delete'}
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
