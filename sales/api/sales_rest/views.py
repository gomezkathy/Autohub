from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Customer, Salesperson, Sale


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "import_href",
        "vin",
        "sold",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "salesperson",
        "customer",
        "automobile",
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:  # "POST"
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_show_customer(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:  # "POST"
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_show_salesperson(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Salesperson.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:  # "POST"
        content = json.loads(request.body)
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "Customer does not exist"}
            )
            response.status_code = 400
            return response
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            response = JsonResponse(
                {"message": "Salesperson does not exist"}
            )
            response.status_code = 400
            return response
        try:
            # checks the Automobile VO's by VIN
            # posts "automobile" as expected by model with value of vin
            vin = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = vin
        except AutomobileVO.DoesNotExist:
            response = JsonResponse(
                {"message": "Automobile does not exist"}
            )
            response.status_code = 400
            return response
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_show_sale(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Sale.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
