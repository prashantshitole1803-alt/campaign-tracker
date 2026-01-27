from django.shortcuts import render

# Create your views here.from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Campaign
from .serializers import CampaignSerializer
from django.db.models import Count, Sum
import requests
from rest_framework import viewsets


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

@api_view(['GET'])
def dashboard_stats(request):
    return Response({
        "status_counts": Campaign.objects.values('status').annotate(count=Count('id')),
        "platform_budget": Campaign.objects.values('platform').annotate(total=Sum('budget')),
        "total_campaigns": Campaign.objects.count(),
        "total_budget": Campaign.objects.aggregate(Sum('budget'))['budget__sum'] or 0
    })

@api_view(['GET'])
def marketing_quote(request):
    res = requests.get("https://api.quotable.io/random")
    return Response(res.json())

def marketing_quote(request):
    try:
        # Temporarily disable SSL verification if needed
        response = requests.get("https://api.quotable.io/random", verify=True)  # or False
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.SSLError:
        # SSL failed → return a fallback quote
        data = {"content": "Keep pushing forward!", "author": "Server fallback"}
    except requests.exceptions.RequestException:
        # Network error fallback
        data = {"content": "Stay motivated every day!", "author": "Server fallback"}
    return JsonResponse(data)
