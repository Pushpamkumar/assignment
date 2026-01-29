from django.db import models
from django.utils import timezone


class Campaign(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Paused', 'Paused'),
        ('Completed', 'Completed'),
    ]

    PLATFORM_CHOICES = [
        ('Google Ads', 'Google Ads'),
        ('Meta', 'Meta'),
        ('LinkedIn', 'LinkedIn'),
        ('Twitter', 'Twitter'),
        ('TikTok', 'TikTok'),
    ]

    name = models.CharField(max_length=200)
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    budget = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
