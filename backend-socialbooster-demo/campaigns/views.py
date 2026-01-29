from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count
from .models import Campaign
from .serializers import CampaignSerializer
import requests
from django.conf import settings


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    
    def list(self, request, *args, **kwargs):
        """Override list to return array instead of paginated response"""
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get dashboard statistics"""
        campaigns = Campaign.objects.all()
        
        # Campaigns by status
        status_counts = campaigns.values('status').annotate(count=Count('id'))
        status_data = {item['status']: item['count'] for item in status_counts}
        
        # Budget by platform
        platform_budgets = campaigns.values('platform').annotate(total_budget=Sum('budget'))
        platform_data = {item['platform']: float(item['total_budget']) for item in platform_budgets}
        
        # Total budget
        total_budget = float(campaigns.aggregate(Sum('budget'))['budget__sum'] or 0)
        
        return Response({
            'status_counts': status_data,
            'platform_budgets': platform_data,
            'total_budget': total_budget,
            'total_campaigns': campaigns.count()
        })

    @action(detail=True, methods=['get'])
    def convert_budget(self, request, pk=None):
        """Convert campaign budget to multiple currencies using exchange rate API"""
        campaign = self.get_object()
        
        try:
            # Using exchangerate-api.com (free, no API key required)
            # API returns rates with USD as base currency
            response = requests.get(settings.EXCHANGE_RATE_API_URL, timeout=5)
            response.raise_for_status()
            data = response.json()
            
            # Get exchange rates (rates are from USD to other currencies)
            rates = data.get('rates', {})
            
            # Get popular currencies (rates are already USD -> currency)
            eur_rate = rates.get('EUR', 0.90)  # Fallback if API fails
            gbp_rate = rates.get('GBP', 0.78)
            inr_rate = rates.get('INR', 83.00)
            
            budget_usd = float(campaign.budget)
            
            return Response({
                'campaign_id': campaign.id,
                'campaign_name': campaign.name,
                'original_budget': float(campaign.budget),
                'currency': 'USD',
                'conversions': {
                    'USD': round(budget_usd, 2),
                    'EUR': round(budget_usd * eur_rate, 2),
                    'GBP': round(budget_usd * gbp_rate, 2),
                    'INR': round(budget_usd * inr_rate, 2),
                },
                'exchange_rates': {
                    'EUR': round(eur_rate, 4),
                    'GBP': round(gbp_rate, 4),
                    'INR': round(inr_rate, 4),
                }
            })
        except Exception as e:
            return Response({
                'error': f'Failed to fetch exchange rates: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
