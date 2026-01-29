from django.contrib import admin
from .models import Campaign


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['name', 'platform', 'budget', 'status', 'start_date', 'end_date', 'created_at']
    list_filter = ['status', 'platform', 'created_at']
    search_fields = ['name', 'platform']
