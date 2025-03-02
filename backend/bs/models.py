from django.db import models

class TimeSlot(models.Model):
    start_time = models.TimeField(unique=True) 

    def __str__(self):
        return self.start_time.strftime("%H:%M")


class Barber(models.Model):
    name = models.CharField(max_length=100)
    services = models.ManyToManyField('BarberService', related_name='barbers')
    def __str__(self):
        return self.name



class BarberTime(models.Model):
    barber = models.ForeignKey(Barber, on_delete=models.CASCADE, related_name="schedules")
    time_slots = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.barber.name}: {self.time_slots.start_time}"

class BarberBooking(models.Model):
    barber = models.ForeignKey(Barber, on_delete=models.CASCADE)
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=30)
    comment = models.TextField()
    booked_at = models.DateTimeField(auto_now_add=True)

class BarberService(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
