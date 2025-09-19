from django.urls import path
from . import views

urlpatterns = [
    path('api/hello/', views.hello_world, name='hello'),
    path('api/status/', views.status, name='status'),
    path('api/database/', views.database_health, name='database'),
    path('api/third-party/', views.third_party_services, name='third_party'),
    path('api/auth/', views.auth_service, name='auth'),
    path('api/monitoring/', views.system_monitoring, name='monitoring'),
]