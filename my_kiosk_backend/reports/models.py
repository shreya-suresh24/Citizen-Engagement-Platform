from django.db import models

class Request(models.Model):
    reference_number = models.CharField(max_length=20, unique=True)
    status = models.CharField(max_length=50, default='Pending')  # Default status

    def __str__(self):
        return self.reference_number

