from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import random
import time
import json
import boto3
import uuid
from datetime import datetime

hello_messages = [
    'Hello, World!',
    'Greetings from Django!',
    'Welcome to our API!',
    'Hi there, developer!',
    'Django says hello!'
]

status_messages = [
    'API is running smoothly',
    'All systems operational',
    'Server is healthy',
    'Everything looks good',
    'API status: excellent'
]

db_statuses = [
    'Database connection: Active',
    'Query performance: Optimal',
    'Connection pool: 85% available',
    'Database latency: 12ms',
    'Backup status: Completed'
]

third_party_statuses = [
    'Payment gateway: Connected',
    'Email service: Operational',
    'SMS provider: Active',
    'Analytics API: Responding',
    'CDN service: Healthy'
]

auth_statuses = [
    'JWT tokens: Valid',
    'Session store: Active',
    'OAuth provider: Connected',
    'Rate limiting: Enforced',
    'Security scan: Passed'
]

monitoring_data = [
    'CPU usage: 23%',
    'Memory usage: 67%',
    'Disk space: 45% used',
    'Network I/O: Normal',
    'Active connections: 142'
]

@csrf_exempt
@api_view(['GET'])
def hello_world(request):
    message = random.choice(hello_messages)
    response = Response({'message': message})
    response['Access-Control-Allow-Origin'] = '*'
    return response

@csrf_exempt
@api_view(['GET'])
def status(request):
    status = random.choice(status_messages)
    response = Response({'status': status})
    response['Access-Control-Allow-Origin'] = '*'
    return response

@csrf_exempt
@api_view(['GET'])
def database_health(request):
    # Simulate occasional DB issues
    if random.random() < 0.1:  # 10% chance of warning
        status = 'Database connection: Slow response'
        health = 'warning'
    else:
        status = random.choice(db_statuses)
        health = 'healthy'
    
    response = Response({
        'status': status,
        'health': health,
        'connections': random.randint(15, 50),
        'query_time': random.randint(5, 25)
    })
    response['Access-Control-Allow-Origin'] = '*'
    return response

@csrf_exempt
@api_view(['GET'])
def third_party_services(request):
    # Simulate occasional service issues
    if random.random() < 0.15:  # 15% chance of issues
        status = 'External service: Timeout'
        health = 'error'
    else:
        status = random.choice(third_party_statuses)
        health = 'healthy'
    
    response = Response({
        'status': status,
        'health': health,
        'response_time': random.randint(100, 500),
        'last_check': int(time.time())
    })
    response['Access-Control-Allow-Origin'] = '*'
    return response

@csrf_exempt
@api_view(['GET'])
def auth_service(request):
    status = random.choice(auth_statuses)
    response = Response({
        'status': status,
        'health': 'healthy',
        'active_sessions': random.randint(50, 200),
        'failed_attempts': random.randint(0, 5)
    })
    response['Access-Control-Allow-Origin'] = '*'
    return response

@csrf_exempt
@api_view(['GET'])
def system_monitoring(request):
    status = random.choice(monitoring_data)
    response = Response({
        'status': status,
        'health': 'healthy',
        'cpu_usage': random.randint(15, 85),
        'memory_usage': random.randint(40, 90),
        'disk_usage': random.randint(20, 80)
    })
    response['Access-Control-Allow-Origin'] = '*'
    return response

@csrf_exempt
@api_view(['POST'])
def store_data(request):
    try:
        data = json.loads(request.body)
        
        # Generate unique ID
        data_id = str(uuid.uuid4())
        
        # Store in S3
        s3 = boto3.client('s3')
        s3.put_object(
            Bucket='api-monitoring-data-itp-workshop',
            Key=f'data/{data_id}.json',
            Body=json.dumps(data),
            ContentType='application/json'
        )
        
        # Store metadata in DynamoDB
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('api-data-metadata')
        table.put_item(
            Item={
                'id': data_id,
                'timestamp': datetime.utcnow().isoformat(),
                'size': len(json.dumps(data)),
                's3_key': f'data/{data_id}.json'
            }
        )
        
        response = Response({
            'success': True,
            'id': data_id,
            'message': 'Data stored successfully'
        })
        response['Access-Control-Allow-Origin'] = '*'
        return response
        
    except Exception as e:
        response = Response({
            'success': False,
            'error': str(e)
        }, status=500)
        response['Access-Control-Allow-Origin'] = '*'
        return response