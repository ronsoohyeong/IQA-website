# Generated by Django 2.0 on 2021-04-26 04:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0007_question_user_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tiaomu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img1', models.IntegerField(blank=True, null=True)),
                ('img2', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]