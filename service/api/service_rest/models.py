from django.db import models

# Create your models here.


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.first_name

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=100)
    vin = models.CharField(max_length=17, unique=True)
    customer_name = models.CharField(max_length=200)

    technician = models.ForeignKey(
        Technician,
        related_name = "appointment",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.customer_name
