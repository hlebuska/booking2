# Generated by Django 5.1.5 on 2025-01-20 11:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BarberSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_available', models.BooleanField(default=True)),
                ('barber', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedules', to='bs.barber')),
                ('time_slots', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bs.timeslot')),
            ],
        ),
    ]
