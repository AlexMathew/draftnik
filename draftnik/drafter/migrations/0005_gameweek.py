# Generated by Django 3.1 on 2020-09-12 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drafter', '0004_auto_20200807_1805'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gameweek',
            fields=[
                ('gw_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=16, null=True)),
                ('deadline', models.DateTimeField(help_text='UTC')),
                ('active', models.BooleanField(default=False)),
            ],
        ),
    ]