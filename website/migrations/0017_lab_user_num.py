# Generated by Django 2.0 on 2021-06-18 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0016_auto_20210618_1503'),
    ]

    operations = [
        migrations.AddField(
            model_name='lab',
            name='user_num',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]