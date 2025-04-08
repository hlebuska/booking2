from django.db import models

class TimeSlot(models.Model):
    start_time = models.TimeField(unique=True) 

    def __str__(self):
        return self.start_time.strftime("%H:%M")


class Barber(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    services = models.ManyToManyField('BarberService', related_name='barbers')
    time_slots = models.ManyToManyField(TimeSlot, through='BarberTime', related_name='barbers')

    def __str__(self):
        return self.name


class BarberTime(models.Model):
    barber = models.ForeignKey(Barber, on_delete=models.CASCADE)
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.barber.name}: {self.time_slot.start_time.strftime('%H:%M')} ({'Available' if self.is_available else 'Busy'})"

class BarberBooking(models.Model):
    barber = models.ForeignKey(Barber, on_delete=models.CASCADE)
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=30)
    comment = models.TextField()
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking for {self.name} at {self.time_slot.start_time.strftime('%H:%M')} with {self.barber.name}"

class BarberService(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.PositiveIntegerField(default=30)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='service_images/', null=True, blank=True)

    def __str__(self):
        return self.name
