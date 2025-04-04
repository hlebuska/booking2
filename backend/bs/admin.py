from django.contrib import admin
from .models import Barber, BarberBooking, BarberTime, BarberService, TimeSlot


@admin.register(BarberService)
class BarberServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration', 'price')
    search_fields = ('name',)
    list_filter = ('duration',)


@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('start_time',)
    ordering = ('start_time',)


class BarberTimeInline(admin.TabularInline):
    model = BarberTime
    extra = 1


@admin.register(Barber)
class BarberAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    filter_horizontal = ('services',)
    inlines = [BarberTimeInline]

    # def description_display(self, obj):
    #     return (obj.description[:50] + "...") if obj.description else "-"
    # description_display.short_description = "Description"


@admin.register(BarberTime)
class BarberTimeAdmin(admin.ModelAdmin):
    list_display = ('barber', 'time_slots', 'is_available')
    list_filter = ('barber', 'is_available')
    search_fields = ('barber__name',)


@admin.register(BarberBooking)
class BarberBookingAdmin(admin.ModelAdmin):
    list_display = ('barber', 'time_slot', 'name', 'phone_number', 'booked_at')
    list_filter = ('barber', 'time_slot', 'booked_at')
    search_fields = ('name', 'phone_number', 'comment')
    readonly_fields = ('booked_at',)
