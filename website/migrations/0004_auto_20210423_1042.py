# Generated by Django 2.0 on 2021-04-23 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_auto_20210404_1614'),
    ]

    operations = [
        migrations.AddField(
            model_name='records',
            name='user_record_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='users',
            name='record_all',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='users',
            name='record_now',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='records',
            name='op_time',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='records',
            name='operation',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='records',
            name='operation_scroll',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='records',
            name='result',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]