from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['GET'])
def hello_world(request):
    response = Response({'message': 'Hello, World!'})
    response['Access-Control-Allow-Origin'] = '*'
    return response

@csrf_exempt
@api_view(['GET'])
def status(request):
    response = Response({'status': 'API is running'})
    response['Access-Control-Allow-Origin'] = '*'
    return response