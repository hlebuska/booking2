# Generated by Django 5.1.5 on 2025-03-10 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bs', '0005_barberservice_barber_services'),
    ]

    operations = [
        migrations.AddField(
            model_name='barberservice',
            name='duration',
            field=models.PositiveIntegerField(default=30),
        ),
    ]
