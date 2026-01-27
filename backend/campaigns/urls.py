from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CampaignViewSet, dashboard_stats, marketing_quote

# router = DefaultRouter()
# router.register('campaigns', CampaignViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
#     path('dashboard/', dashboard_stats),
#     path('quote/', marketing_quote),
# ]
router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet, basename='campaign')

urlpatterns = [
    path('', include(router.urls)),           # /api/campaigns/
    path('dashboard/', dashboard_stats),      # /api/dashboard/
    path('quote/', marketing_quote),          # /api/quote/
]