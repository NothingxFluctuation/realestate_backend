# Generated by Django 3.0.8 on 2020-07-25 20:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20200725_1653'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='individual',
            name='number',
        ),
    ]
